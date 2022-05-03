import React, { useContext } from 'react';
import * as S from '../styles.js';
import validator from '../validations/validator';
import ErrorMessage from './ErrorMessage';
import { TYPES, CardStateContext, CardDispatchContext } from '../context/CardContext';

export default function CardOwner({ color }) {
  const { cardOwner } = useContext(CardStateContext);
  const dispatch = useContext(CardDispatchContext);

  const onChangeInput = (e) => {
    dispatch({
      type: TYPES.UPDATE_FIELD,
      fieldName: 'cardOwner',
      payload: {
        value: e.target.value,
      },
    });
  };

  return (
    <S.Container>
      <S.TitleWrapper>
        <S.InputTitle marginBottom="0px">카드소유자 이름(선택)</S.InputTitle>
        <S.NameLength isLengthValidated={cardOwner.value.length > 30}>
          <span>{cardOwner.value.length}/30</span>
        </S.NameLength>
      </S.TitleWrapper>
      <S.InputBox>
        <S.InputContainer>
          <S.InputBasicLeft
            placeholder="카드에 표시된 이름과 동일하게 입력하세요."
            type="text"
            maxLength="30"
            color={color}
            value={cardOwner.value}
            onChange={onChangeInput}
          />
        </S.InputContainer>
      </S.InputBox>
      <ErrorMessage
        value={cardOwner.value}
        validate={validator.checkCardOwner}
        type={TYPES.UPDATE_FIELD}
        fieldName="cardOwner"
      >
        {cardOwner.errorMessage}
      </ErrorMessage>
    </S.Container>
  );
}
