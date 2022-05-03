import React, { useContext } from 'react';
import * as S from '../styles.js';
import ErrorMessage from './ErrorMessage';
import validator from '../validations/validator';
import { CARD_COMPANIES } from '../constants';
import { TYPES, CardStateContext, CardDispatchContext } from '../context/CardContext';

export default function CardCvc() {
  const { cardCvc, cardCompanyIndex } = useContext(CardStateContext);
  const dispatch = useContext(CardDispatchContext);

  const onChangeInput = (e) => {
    dispatch({
      type: TYPES.UPDATE_FIELD,
      fieldName: 'cardCvc',
      payload: {
        value: e.target.value,
      },
    });
  };

  const onClickTip = () => {
    dispatch({ type: TYPES.SET_TIP_MODAL_FLAG, flag: true });
  };

  const cardColor = cardCompanyIndex === -1 ? '#737373' : CARD_COMPANIES[cardCompanyIndex].COLOR;

  return (
    <S.Container>
      <S.InputTitle>보안코드(CVC/CVV)</S.InputTitle>
      <S.InputBox>
        <S.InputContainer width="23%">
          <S.InputBasic
            type="password"
            maxLength="3"
            value={cardCvc.value}
            color={cardColor}
            onChange={onChangeInput}
          />
        </S.InputContainer>
        <S.TipButton onClick={onClickTip}>?</S.TipButton>
      </S.InputBox>
      <ErrorMessage
        value={cardCvc.value}
        validate={validator.checkCardCvc}
        type={TYPES.UPDATE_FIELD}
        fieldName={'cardCvc'}
      >
        {cardCvc.errorMessage}
      </ErrorMessage>
    </S.Container>
  );
}
