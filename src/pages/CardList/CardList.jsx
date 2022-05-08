import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { TYPES } from 'store/card/types';
import { CardDispatchContext } from 'store/card/CardContext';
import PageTitle from 'components/PageTitle/PageTitle';
import AnotherCard from 'components/AnotherCard/AnotherCard';
import Card from 'components/Card/Card';
import FlexColumnBox from 'components/FlexColumnBox/FlexColumnBox';
import Container from 'common/Container/Container';
import DroppableArea from 'common/DragDrop/DroppableArea';
import DraggableCard from 'common/DragDrop/DraggableCard';
import CardConfirmModal from 'containers/CardConfirmModal/CardConfirmModal';
import ClickableBox from 'common/ClickableBox/ClickableBox';
import CardManageModal from 'containers/CardManageModal/CardManageModal';
import { dbService } from 'firebase/fbase';

export default function CardList({ navigate }) {
  const [fetchedCards, setFetchedCards] = useState([]);

  useEffect(() => {
    dbService
      .collection('cardList')
      .orderBy('cardOrder', 'desc')
      .onSnapshot((snapshot) => {
        const cardArray = snapshot.docs.map((doc) => ({
          ...doc.data(),
        }));
        setFetchedCards(cardArray);
      });
  }, []);

  const dispatch = useContext(CardDispatchContext);
  const [modalCardData, setModalCardData] = useState();
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isManageModalOpen, setIsManageModalOpen] = useState(false);

  const onClickCard = (cardData) => {
    setModalCardData(cardData);
    setIsManageModalOpen(true);
  };

  const onClickAnotherCard = () => {
    navigate('/add-card');
  };

  const onSubmitForm = (cardData) => async (event, nickname) => {
    event.preventDefault();

    const id = cardData.id;
    dispatch({ type: TYPES.UPDATE_NICKNAME, nickname, id });

    setIsConfirmModalOpen(false);
    navigate('/card-list');
  };

  const onDeleteCard = (id) => {
    if (id && confirm('등록된 카드를 삭제하시겠습니까?')) {
      dispatch({ type: TYPES.DELETE_CARD, id });
      setIsManageModalOpen(false);
    }
  };

  const onClickEditNickname = () => {
    setIsConfirmModalOpen(true);
    setIsManageModalOpen(false);
  };

  return (
    <Container>
      <PageTitle hasPrevButton={false}>보유 카드</PageTitle>
      <FlexColumnBox>
        <DroppableArea cards={fetchedCards} dispatch={dispatch}>
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {fetchedCards.map((cardData, index) => (
                <DraggableCard key={cardData.id} card={cardData} index={index}>
                  <ClickableBox onClick={() => onClickCard(cardData)}>
                    <Card
                      cardNumber={cardData.cardNumber}
                      cardExpiration={cardData.cardExpiration}
                      cardOwner={cardData.cardOwner}
                      cardName={cardData.cardName}
                      cardColor={cardData.cardColor}
                      isSmall={true}
                    />
                  </ClickableBox>
                  <Styled.CardNickname>{cardData.cardNickname}</Styled.CardNickname>
                </DraggableCard>
              ))}
              {provided.placeholder}
            </div>
          )}
        </DroppableArea>
        <ClickableBox onClick={onClickAnotherCard}>
          <AnotherCard />
        </ClickableBox>
      </FlexColumnBox>
      {isConfirmModalOpen && (
        <CardConfirmModal
          cardData={modalCardData}
          onCloseModal={() => setIsConfirmModalOpen(false)}
          onSubmitForm={onSubmitForm}
        />
      )}
      {isManageModalOpen && (
        <CardManageModal
          onCloseModal={() => setIsManageModalOpen(false)}
          onDeleteCard={() => onDeleteCard(modalCardData.id ?? null)}
          cardData={modalCardData}
          onClickEditNickname={onClickEditNickname}
        />
      )}
    </Container>
  );
}

const Styled = {
  CardNickname: styled.span`
    font-size: 19px;
  `,
};
