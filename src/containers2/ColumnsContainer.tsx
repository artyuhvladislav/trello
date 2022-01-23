import React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { Column } from "../components";
import { addCard, removeColumn, addColumn, IAddCard, IAddColumn, reorderCards } from "../redux/reduxSlice";

interface ISelector {
  column: {
    items: {
      title: string;
      cards: string[];
    }[];
  }
}


interface IColumnsContainer {
  // index?: number;
  // items?: any;
  // addColumn: any,
  // addCard: void,
  // removeColumn: any,
}

const ColumnsContainer = ({
  // index,
  // items,
  // addColumn,
  // addCard,
  // removeColumn,
} : IColumnsContainer) => {

  const dispatch = useDispatch()
  const { items }= useSelector(({ column }: ISelector) => column )
  

  const onDragEnd = (result: any) => {
    const { source, destination } = result;
    if (
      !destination ||
      (source.droppableId === destination.droppableId &&
        source.index === destination.index)
    ) {
      return;
    }
  
    dispatch(reorderCards({
      source,
      destination
    }));
  };

  const addColumnHandler = (obj: IAddColumn) => {
    dispatch(addColumn(obj))
  }

  const removeColumnHandler = (id: number) => {
    dispatch(removeColumn(id))
  }

  const addCardHandler = (obj: IAddCard) => {
    dispatch(addCard(obj))
  }

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        {items.map((item :any , index : number) => (
          <Column
            {...item}
            key={index}
            columnIndex={index}
            onAddColumn={addColumnHandler}
            onAddCard={addCardHandler}
            onRemove={removeColumnHandler}
            onReorder={reorderCards}
          />
        ))}
      </DragDropContext>
      
      <Column onAddColumn={addColumnHandler} onAddCard={addCardHandler} />
    </>
  );
};

export default ColumnsContainer
