export default ({ state, source, destination }: any) => {

  const { index: sourceCardIndex, droppableId: sourceId } = source;
  const {
    index: destinationCardIndex,
    droppableId: destinationId
  } = destination;
  const sourceColumnIndex = parseInt(sourceId.replace("column-", ""));
  const destinationColumnIndex = parseInt(destinationId.replace("column-", ""));
  const copyState = state.map((item: any) => ({ ...item, cards: [...item.cards] }))

  return copyState.map((item: any, currentColumnIndex: number) => {
    if (destinationColumnIndex === currentColumnIndex) {
      const [sourceCard] = copyState[sourceColumnIndex].cards.splice(
        sourceCardIndex,
        1
      );
      const destinationCards = Array.from(copyState[destinationColumnIndex].cards);
      destinationCards.splice(destinationCardIndex, 0, sourceCard);
      item.cards = destinationCards;
    }

    return item;
  });
};