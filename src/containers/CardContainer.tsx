import { Card } from "../components";
import { useDispatch } from "react-redux";
import { IRemoveCard, removeCard } from "../redux/reduxSlice";

interface ICardContainer {
  children: string,
  columnIndex?: number,
  cardIndex?: number
}
const CardContainer = ({ children, columnIndex, cardIndex }: ICardContainer) => {

  const dispatch = useDispatch();

  const onRemoveCard = (obj: IRemoveCard) => {
    dispatch(removeCard(obj));
  };

  return (
    <Card
      cardIndex={cardIndex}
      columnIndex={columnIndex}
      onRemove={onRemoveCard}
      children={children}
    />
  );
};

export default CardContainer;
