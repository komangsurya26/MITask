import { auth, currentUser } from "@clerk/nextjs";
import { ACTION, ENTITY_TYPE } from "@prisma/client";
import { db } from "./db";

interface Props {
    entityId: string
    action: ACTION
    entityType: ENTITY_TYPE
    entityTitle: string
}

export const createAudit = async (props: Props) => {
  try {
    const { orgId } = auth();
    const user = await currentUser();

    if (!orgId || !user) {
      throw new Error("user or org not found");
    }

    const { entityId, action, entityType, entityTitle } = props;

    await db.auditLog.create({
      data: {
        orgId,
        entityId,
        entityType,
        entityTitle,
        action,
        userId: user.id,
        userImage: user?.imageUrl,
        userName: user?.username || "",
      },
    });
  } catch (error) {
    console.log("[AUDIT_LOG_ERROR]",error);
  }
};