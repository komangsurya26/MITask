"use client"

import { createCard } from "@/actions/create-card";
import { FormSubmit } from "@/components/forms/form-button";
import { FormTextArea } from "@/components/forms/form-textarea";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/use-action";
import { Plus } from "lucide-react";
import { useParams } from "next/navigation";
import { ElementRef, KeyboardEventHandler, forwardRef, useRef } from "react";
import { toast } from "sonner";
import { useEventListener, useOnClickOutside } from "usehooks-ts";

interface CardFormProps {
    listId: string,
    isEditing: boolean,
    enableEditing: () => void,
    disableEditing: () => void
}

export const CardForm = forwardRef<HTMLTextAreaElement, CardFormProps>(
  ({ listId, isEditing, enableEditing, disableEditing }, ref) => {
    const params = useParams()
    const formRef = useRef<ElementRef<"form">>(null);

    const { execute,fieldErrors } = useAction(createCard ,{
        onSuccess: (data) => {
            toast.success(`Card "${data.title}" ditambahkan`);
            formRef.current?.reset();
        },
        onError: (error) => {
            toast.error(error);
        },
    });

    const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
            disableEditing();
        }
    }
    useOnClickOutside(formRef, disableEditing)
    useEventListener("keydown", onKeyDown);

    const onTextAreaKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (e) =>{
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            formRef.current?.requestSubmit()
        }
    } 

    const onSubmit = (formData: FormData) => {
        const title = formData.get("title") as string;
        const listId = formData.get("listId") as string
        const boardId = params.boardId as string

        execute({ title, listId, boardId });
    }
    if (isEditing) {
        return (
          <form
            action={onSubmit}
            ref={formRef}
            className="m-1 py-0.5 px-1 space-y-4"
          >
            <FormTextArea
              id="title"
              onKeyDown={onTextAreaKeyDown}
              ref={ref}
              placeholder="Tulis judul deskripsi..."
            />
            <input
              type="text"
              name="listId"
              id="listId"
              value={listId}
              hidden
            />
            <div className="flex items-center gap-x-1">
              <FormSubmit>Simpan</FormSubmit>
              <Button onClick={disableEditing} size={"sm"} variant={"ghost"}>
                Batal
              </Button>
            </div>
          </form>
        );
    }
    return (
      <div className="pt-2 px-2">
        <Button onClick={enableEditing} size={"sm"} variant={"ghost"} className="h-auto px-2 py-1.5 w-full justify-start text-muted-foreground text-sm">
            <Plus className="w-4 h-4 mr-2" />
            Tambah Deskripsi
        </Button>
      </div>
    );
  }
);

CardForm.displayName = "CardForm"