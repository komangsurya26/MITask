"use server";

import { auth } from "@clerk/nextjs";
import { InputType, ReturnType } from "./type";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { UpdateCardOrder } from "./schema";
import { PrismaPromise } from "@prisma/client";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { orgId, userId } = auth();
  if (!orgId || !userId) {
    return {
      error: "Unauthorized",
    };
  }
  const { items, boardId } = data;

  let updateCard;

  try {
   const transaction = items.map((card) =>
     db.card.update({
       where: {
         id: card.id,
         list: {
           board: {
             orgId,
           },
         }
       },
       data: {
         order: card.order,
         listId: card.listId,
       },
     })
   );

   updateCard = await db.$transaction(transaction);

  } catch (error) {
    return {
      error: "Failed to create list",
    };
  }

  revalidatePath(`/board/${boardId}`);
  return { data: updateCard };
};

export const updateCardOrder = createSafeAction(UpdateCardOrder, handler);
