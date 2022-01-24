import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { AddFormContainer } from "../../containers";
import { CardContainer } from "../../containers";
import clearSvg from "../../assets/clear.svg";
import "./Column.scss";
import {
  IAddCard,
  IAddColumn,
} from "../../redux/reduxSlice";
interface IColumn {
  columnIndex?: number;
  title?: string;
  cards?: string[];
  onAddColumn(obj: IAddColumn): void;
  onAddCard(obj: IAddCard): void;
  onRemove?(id: number | undefined): void;
}
const Column = ({
  columnIndex,
  title,
  cards,
  onAddColumn,
  onAddCard,
  onRemove,
  // onReorder,
}: IColumn) => {
  const removeColumn = () => {
    if (global.confirm("DO YOU REALLY WANT TO REMOVE THIS COLUMN?")) {
      onRemove && onRemove(columnIndex);
    }
  };
  return cards ? (
    <Droppable type="CARDS" droppableId={`column-${columnIndex}`}>
      {(provided) => (
        <div
          className="column"
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          <div className="column__inner">
            {title && (
              <div className="column__title">
                <b>{title}</b>
                <div onClick={removeColumn} className="remove-btn">
                  <img src={clearSvg} alt="Clear svg icon" />
                </div>
              </div>
            )}
            <div className="column__items">
              {cards.map((card: string, index: number) => (
                <CardContainer
                  key={index}
                  columnIndex={columnIndex}
                  cardIndex={index}
                >
                  {card}
                </CardContainer>
              ))}
              {provided.placeholder}
            </div>
            <AddFormContainer
              isEmptyColumn={false}
              columnIndex={columnIndex}
              onAddColumn={onAddColumn}
              onAddCard={onAddCard}
            />
          </div>
        </div>
      )}
    </Droppable>
  ) : (
    <div className={"column column--empty"}>
      <div className="column__inner">
        <AddFormContainer
          isEmptyColumn={true}
          columnIndex={columnIndex}
          onAddColumn={onAddColumn}
          onAddCard={onAddCard}
        />
      </div>
    </div>
  );
};

export default Column;
