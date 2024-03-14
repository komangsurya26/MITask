"use client"

import { ListWithCards } from "@/types"
import { ListForm } from "./list-form"
import { useEffect, useState } from "react"
import { ListItem } from "./list-item"
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { useAction } from "@/hooks/use-action"
import { updateListOrder } from "@/actions/update-list-order"
import { updateCardOrder } from "@/actions/update-card-order"
import { toast } from "sonner"

interface ListContainerProps {
    boardId: string
    data: ListWithCards[]
}

function reorder<T>(list: T[], startIndex: number, endIndex: number) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
}
export const ListContainer = ({ boardId, data }: ListContainerProps) => {
    const [orderData, setOrderData] = useState(data)

    const { execute: executeUpdateListOrder } = useAction(updateListOrder, {
      onSuccess() {
        toast.success("List Dipindahkan");
      },
      onError(error) {
        toast.error(error);
      },
    });

    const { execute: executeUpdateCardOrder } = useAction(updateCardOrder, {
      onSuccess() {
        toast.success("Deskripsi Dipindahkan");
      },
      onError(error) {
        toast.error(error);
      },
    });


    useEffect(() => {
        setOrderData(data)
    }, [data])

    const onDragEnd = (result: any) => {
        const { source, destination, type } = result
        if (!destination) {
            return
        }

        //if drop in same position
        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return            
        }

        //user memindahkan list 
        if (type === "list") {
            const items = reorder(
              orderData,
              source.index,
              destination.index
            ).map((item, index) => ({
              ...item,
              order: index,
            }));

            setOrderData(items)
            executeUpdateListOrder({ items, boardId })
        }

        //user memindahkan card
        if (type === "card") {
            let newOrderData = [...orderData]
            
            //source and destination list
            const sourceList = newOrderData.find((list) => list.id === source.droppableId)
            const destinationList = newOrderData.find((list) => list.id === destination.droppableId)

            if (!sourceList || !destinationList) {
                return
            }

            //cek if the card exist on the source list
            if (!sourceList.cards) {
                sourceList.cards = [];
            }

            //cek if card exist on the destination list
            if (!destinationList.cards) {
                destinationList.cards = [];
            }

            //memindahakn the card in the same list
            if (source.droppableId === destination.droppableId) {
                const reorderCard = reorder(
                    sourceList.cards,
                    source.index,
                    destination.index
                )
                reorderCard.forEach((card, index) => {
                    card.order = index
                })

                sourceList.cards = reorderCard

                setOrderData(newOrderData)
                executeUpdateCardOrder({ items: reorderCard, boardId })

            //user memindahkan card ke list yang berbeda 
            } else {
                //remove the card from source list
                const [movedCard] = sourceList.cards.splice(source.index, 1);

                //assign the newlist to the moved card
                movedCard.listId = destination.droppableId;

                //add card to the destinationId
                destinationList.cards.splice(destination.index, 0, movedCard);

                sourceList.cards.forEach((card, index) => {
                    card.order = index
                })

                //update the order for each card in the destination list
                destinationList.cards.forEach((card, index) => {
                    card.order = index
                })

                setOrderData(newOrderData)
                executeUpdateCardOrder({
                  items: destinationList.cards,
                  boardId,
                });
            }
        }

    }
    return (
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="list" direction="horizontal" type="list">
          {(provide) => (
            <ol
              {...provide.droppableProps}
              ref={provide.innerRef}
              className="flex gap-x-3 h-full"
            >
              {orderData?.map((list, index) => {
                return <ListItem key={list.id} index={index} data={list} />;
              })}
              {provide.placeholder}
              <ListForm />
              <div className="flex-shrink-0 w-1" />
            </ol>
          )}
        </Droppable>
      </DragDropContext>
    );
}