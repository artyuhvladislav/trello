import React, { ReactChild } from "react";
import { Draggable } from "react-beautiful-dnd";
import clearSvg from "../../assets/clear.svg";
import "./Card.scss";

interface ICard {
  cardIndex?: number,
  columnIndex?: number,
  children: string | ReactChild,
  onRemove?: any;  //TO DO
}

const Card = ({ cardIndex, columnIndex, children, onRemove }: ICard) =>
  typeof cardIndex !== "undefined" ? (
    <Draggable
      draggableId={`card-${columnIndex}-${cardIndex}`}
      index={cardIndex}
    >
      {(provided, snapshot) => (
        <div
          className="card"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <span>{children}</span>
          <div
            onClick={onRemove && onRemove.bind(this, { columnIndex , cardIndex })}
            className="remove-btn"
          >
            <img src={clearSvg} alt="Clear svg icon" />
          </div>
        </div>
      )}
    </Draggable>
  ) : (
    <div className="card">{children}</div>
  );



export default Card;

