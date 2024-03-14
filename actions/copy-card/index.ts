"use server";

import { auth } from "@clerk/nextjs";
import { InputType, ReturnType } from "./type";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { CopyCard } from "./schema";
import { createAudit } from "@/lib/create-audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { orgId, userId } = auth();
  if (!orgId || !userId) {
    return {
      error: "Unauthorized",
    };
  }
  const { id, boardId } = data;
  let card;
  try {
    const cardCopy = await db.card.findUnique({
      where: {
        id,
        list: {
          board: {
            orgId,
          },
        },
      }
    })

    if (!cardCopy) {
      return {
        error: "Card not found",
      };
    }
    const lastCard = await db.card.findFirst({
      where: {
        listId: cardCopy.listId
      },
      orderBy: {
        order: "desc"
      },
      select: {
        order: true
      }
    })

    const newOrder = lastCard ? lastCard.order + 1 : 1
    card = await db.card.create({
      data: {
        title: `${cardCopy.title} - Copy`,
        description: cardCopy.description, 
        order: newOrder,
        listId: cardCopy.listId,
      }
    })

    await createAudit({
      entityTitle: card.title,
      entityId: card.id,
      entityType: ENTITY_TYPE.CARD, 
      action: ACTION.CREATE,
    })
  } catch (error) {
    return {
      error: "Failed to copy",
    };
  }

  revalidatePath(`/organization/${boardId}`);
  return { data: card };
};

export const copyCard = createSafeAction(CopyCard, handler);
