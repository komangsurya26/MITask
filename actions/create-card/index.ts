"use server";

import { auth } from "@clerk/nextjs";
import { InputType, ReturnType } from "./type";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { CreateCard } from "./schema";
import { createAudit } from "@/lib/create-audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { orgId, userId } = auth();
  if (!orgId || !userId) {
    return {
      error: "Unauthorized",
    };
  }
  const { title, boardId, listId } = data;
  let card;
  try {
    const list = await db.list.findUnique({
      where: {
        id: listId,
        board:{
          orgId
        }
      },
    });
    if (!list) {
      return {
        error: "List tidak ditemukan",
      };
    }
    const lastCard = await db.card.findFirst({
      where: {
        listId
      },
      orderBy: {
        order: "desc",
      },
      select: {
        order: true,
      },
    });

    const newOrder = lastCard ? lastCard.order + 1 : 1;
    card = await db.card.create({
      data: {
        title,
        listId,
        order: newOrder,
      },
    });

    await createAudit({
      entityId: card.id,
      entityTitle: card.title,
      action: ACTION.CREATE,
      entityType: ENTITY_TYPE.CARD,
    })
  } catch (error) {
    return {
      error: "Failed to create card",
    };
  }

  revalidatePath(`/board/${boardId}`);
  return { data: card };
};

export const createCard = createSafeAction(CreateCard, handler);
