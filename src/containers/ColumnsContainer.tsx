import React from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { Column } from '../components';
import {
  addCard,
  removeColumn,
  addColumn,
  IAddCard,
  IAddColumn,
  reorderCards,
} from '../redux/reduxSlice';
import { memoizedItemsSelector } from '../redux/selectors';

interface IColumn {
  title: string;
  cards: string[];
}

const ColumnsContainer = () => {
  const dispatch = useDispatch();
  const { items } = useSelector(memoizedItemsSelector);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (
      !destination ||
      (source.droppableId === destination.droppableId && source.index === destination.index)
    ) {
      return;
    }

    dispatch(
      reorderCards({
        source,
        destination,
      }),
    );
  };

  const addColumnHandler = (obj: IAddColumn) => {
    dispatch(addColumn(obj));
  };

  const removeColumnHandler = (id: number) => {
    dispatch(removeColumn(id));
  };

  const addCardHandler = (obj: IAddCard) => {
    dispatch(addCard(obj));
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        {items.map((item: IColumn, index: number) => (
          <Column
            {...item}
            key={index}
            columnIndex={index}
            onAddColumn={addColumnHandler}
            onAddCard={addCardHandler}
            onRemove={removeColumnHandler}
          />
        ))}
      </DragDropContext>

      <Column onAddColumn={addColumnHandler} onAddCard={addCardHandler} />
    </>
  );
};

export default ColumnsContainer;
