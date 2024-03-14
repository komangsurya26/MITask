"use client"

import { updateCard } from "@/actions/update-card";
import { FormSubmit } from "@/components/forms/form-button";
import { FormTextArea } from "@/components/forms/form-textarea";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAction } from "@/hooks/use-action";
import { CardWithList } from "@/types"
import { useQueryClient } from "@tanstack/react-query";
import { AlignLeft, SquarePen } from "lucide-react";
import { useParams } from "next/navigation";
import { ElementRef, useRef, useState } from "react";
import { toast } from "sonner";
import { useEventListener, useOnClickOutside } from "usehooks-ts";


interface DescriptionProps {
    data: CardWithList
}

export const Description = ({ data }: DescriptionProps) => {
    const queryClient = useQueryClient();
    const params = useParams();

    const [isEditing, setIsEditing] = useState(false);

    const formRef = useRef<ElementRef<"form">>(null);
    const textAreRef = useRef<ElementRef<"textarea">>(null);

    const enableEditing = () => {
        setIsEditing(true);
        setTimeout(() => {
            textAreRef.current?.focus();
        })
    }

    const disableEditing = () => {
        setIsEditing(false);
    }

    const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
            disableEditing();
        }
    }

    useEventListener("keydown", onKeyDown)
    useOnClickOutside(formRef, disableEditing)

    const {execute} = useAction(updateCard, {
      onSuccess: (data) => {
        queryClient.invalidateQueries({
          queryKey: ["card", data.id],
        })
        
        queryClient.invalidateQueries({
          queryKey: ["card-logs", data.id],
        });
        toast.success(`Deskripsi diubah`);
        disableEditing();
      },
      onError: (error) => {
        toast.error(error);
      }
    })

    const onSubmit = async (formData: FormData) => {
        const description = formData.get("description") as string
        const boardId = params.boardId as string

        execute({
          description,
          boardId,
          id: data.id
        })
    }

  return (
    <div className="flex items-start gap-x-3 w-full">
      <AlignLeft className="w-5 h-5 mt-0.5 text-neutral-700" />
      <div className="w-full">
        <p className="font-semibold text-neutral-700 mb-2">Deskripsi</p>
        {isEditing ? (
          <form action={onSubmit} ref={formRef} className="space-y-2">
            <FormTextArea
              ref={textAreRef}
              id="description"
              defaultValue={data.description || undefined}
              placeholder="Tulis Deskripsi..."
              className="w-full mt-2"
            />
            <div>
              <FormSubmit>
                Simpan
              </FormSubmit>
              <Button type="button" onClick={disableEditing} className="ml-2" size={"sm"} variant={"ghost"}>
                Batal
              </Button>
            </div>
          </form>
        ) : (
          <div
            onClick={enableEditing}
            role="button"
            className="min-h-[80px] px-2 bg-neutral-200 border rounded-md"
          >
            {data.description ? data.description : 
            <div className="flex items-center justify-center my-[40px] text-neutral-500">
              <SquarePen className="w-6 h-6 mt-1"/> Tulis
            </div>
            }
          </div>
        )}
      </div>
    </div>
  );
};

Description.Skeleton = function DescriptionSkeleton() {
  return(
    <div className="flex items-start gap-x-3 w-full">
        <Skeleton className="w-6 h-6 bg-neutral-200" />
        <div className="w-full">
            <Skeleton className="w-24 h-6 mb-2 bg-neutral-200" />
            <Skeleton className="w-full h-[78px] bg-neutral-200" />
        </div>
    </div>
  )
}