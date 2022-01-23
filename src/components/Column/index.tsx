import React from "react";
import { Droppable } from "react-beautiful-dnd";

import { AddFormContainer } from "../../containers2";
import { CardContainer } from "../../containers2";
import clearSvg from "../../assets/clear.svg";

import "./Column.scss";
interface IColumn {
  columnIndex?: number,
  title?: string,
  cards?: any,
  onAddColumn: any,
  onAddCard: any,
  onRemove?: any,
  onReorder?: any
}
const Column = ({
  columnIndex,
  title,
  cards,
  onAddColumn,
  onAddCard,
  onRemove,
  onReorder
}: IColumn) => {
  const removeColumn = () => {
    if (global.confirm("Вы действительно хотите удалить колонку?")) {
      onRemove(columnIndex);
    }
  };
  return cards ? (
    <Droppable type="CARDS" droppableId={`column-${columnIndex}`}>
      {provided => (
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
              {cards.map((card: any, index: number) => (
                <CardContainer key={index} columnIndex={columnIndex} cardIndex={index}>
                  {card}
                </CardContainer>
              ))}
              {provided.placeholder}
            </div>
            <AddFormContainer
            children={null}
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

export default Column
