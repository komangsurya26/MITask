"use client"

import { copyCard } from "@/actions/copy-card";
import { deleteCard } from "@/actions/delete-card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton"
import { useAction } from "@/hooks/use-action";
import { useCardModal } from "@/hooks/use-card-modal";
import { CardWithList } from "@/types";
import { Copy, Trash } from "lucide-react";
import { useParams } from "next/navigation";
import { toast } from "sonner";


interface ActionProps {
    data: CardWithList
}

export const Action = ({ data }: ActionProps) => {
  const params = useParams();
  const cardModal = useCardModal();
  
  const { execute: executeCopyCard, isLoading: isLoadingCopy } = useAction(
    copyCard,
    {
      onSuccess: (data) => {
        toast.success("Deskripsi di salin");
        cardModal.onClose();
      },
      onError: (error) => {
        toast.error(error);
      },
    }
  );
  const { execute: executeDeleteCard, isLoading: isLoadingDelete } = useAction(deleteCard,
    {
      onSuccess: (data) => {
        toast.success("Deskripsi di hapus");
        cardModal.onClose();
      },
      onError: (error) => {
        toast.error(error);
      },
    })

  const onCopy = () => {
    const boardId = params.boardId as string

    executeCopyCard({
      id: data.id,
      boardId,
    });
  }

  const onDelete = () => {
    const boardId = params.boardId as string

    executeDeleteCard({
      id: data.id,
      boardId,
    });
  }


  return (
    <div className="space-y-2 mt-2">
      <div className="pt-6 pl-7 md:pl-0 space-y-2">
        <Button
          onClick={onCopy}
          disabled={isLoadingCopy}
          variant={"gray"}
          className="w-full justify-start"
          size={"inline"}
        >
          <Copy className="mr-2 h-4 w-4" />
          Salin
        </Button>
        <Button
          onClick={onDelete}
          disabled={isLoadingDelete}
          variant={"destructive"}
          className="w-full justify-start"
          size={"inline"}
        >
          <Trash className="mr-2 h-4 w-4" />
          Hapus
        </Button>
      </div>
    </div>
  );
};

Action.Skeleton = function ActionSkeleton() {
    return (
        <div className="space-y-2 mt-2">
            <Skeleton className="w-20 h-4 bg-neutral-200" />
            <Skeleton className="w-full h-8 bg-neutral-200" />
            <Skeleton className="w-full h-8 bg-neutral-200" />
        </div>
    )
}