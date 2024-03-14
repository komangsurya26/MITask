"use client";

import { copyList } from "@/actions/copy-list";
import { deleteList } from "@/actions/delete-list";
import { FormSubmit } from "@/components/forms/form-button";
import { Button } from "@/components/ui/button";
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { useAction } from "@/hooks/use-action";
import { List } from "@prisma/client";
import { MoreHorizontal, X, Copy, Plus, Trash2 } from "lucide-react";
import { ElementRef, useRef } from "react";
import { toast } from "sonner";

interface ListOptionsProps {
  data: List;
  onAddCard: () => void;
}

export const ListOptions = ({ data, onAddCard }: ListOptionsProps) => {
  const closeRef = useRef<ElementRef<"button">>(null);

  const { execute: executeCopy } = useAction(copyList, {
    onSuccess: () => {
      toast.success(`List ${data.title} disalin`);
      closeRef.current?.click();
    },
    onError: (error) => {
      toast.error(error);
    },
  });
  const { execute: executeDelete } = useAction(deleteList, {
    onSuccess: () => {
      toast.success(`List ${data.title} dihapus`);
      closeRef.current?.click();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onDelete = (formData: FormData) => {
    const id = formData.get("id") as string
    const boardId = formData.get("boardId") as string

    executeDelete({ id, boardId });
  }
  
  const onCopy = (formData: FormData) => {
    const id = formData.get("id") as string
    const boardId = formData.get("boardId") as string

    executeCopy({ id, boardId });
  }


  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="h-auto w-auto p-2" variant={"ghost"}>
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="px-0 pt-3 pb-3" side="bottom" align="start">
        <div className="text-sm font-medium text-center text-neutral-600 pb-4">
          List
        </div>
        <PopoverClose ref={closeRef} asChild>
          <Button
            className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600"
            variant={"ghost"}
          >
            <X className="w-4 h-4" />
          </Button>
        </PopoverClose>
        <Button
          onClick={onAddCard}
          variant={"ghost"}
          className="w-full h-auto px-5 justify-start font-normal rounded-none text-sm p-2"
        >
          <Plus className="w-4 h-4 mr-2" />
          Tambah
        </Button>
        <form action={onCopy}>
          <input hidden name="id" value={data.id} id="id" />
          <input hidden name="boardId" value={data.boardId} id="boardId" />
          <FormSubmit
            variant="ghost"
            className="w-full h-auto px-5 justify-start font-normal rounded-none text-sm p-2"
          >
            <Copy className="w-4 h-4 mr-2" />
            Salin
          </FormSubmit>
        </form>
        <Separator />
        <form action={onDelete}>
          <input hidden name="id" value={data.id} id="id" />
          <input hidden name="boardId" value={data.boardId} id="boardId" />
          <FormSubmit
            variant="destructive"
            className="w-full h-auto px-5 justify-start font-normal rounded-none text-sm p-2"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Hapus
          </FormSubmit>
        </form>
      </PopoverContent>
    </Popover>
  );
};
