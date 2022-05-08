import { dbService } from 'firebase/fbase';
import { Droppable } from 'react-beautiful-dnd';
import { DragDropContext } from 'react-beautiful-dnd';
// import { TYPES } from 'store/card/types';

export default function DroppableArea({ children, cards }) {
  const onDragEnd = ({ destination, source }) => {
    if (!destination) return;

    const cardListCopy = [...cards];
    const sourceCard = cardListCopy[source.index];
    const destinationCard = cardListCopy[destination?.index];
    console.log('출발', sourceCard.cardOrder, sourceCard.cardNickname);
    console.log('도착', destinationCard.cardOrder, destinationCard.cardNickname);
    cardListCopy.splice(source.index, 1);
    cardListCopy.splice(destination?.index, 0, cards[source.index]);
    console.log(cardListCopy);
    dbService.collection('cardList').doc(sourceCard.id).update({
      cardOrder: destinationCard.cardOrder,
    });
    dbService.collection('cardList').doc(destinationCard.id).update({
      cardOrder: sourceCard.cardOrder,
    });
    // dispatch({ type: TYPES.SET_CARDS, cards: cardListCopy });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">{children}</Droppable>
    </DragDropContext>
  );
}
