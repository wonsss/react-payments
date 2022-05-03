import React, { useContext } from 'react';
import * as S from '../styles.js';
import ErrorMessage from './ErrorMessage';
import validator from '../validations/validator';
import { TYPES, CardStateContext, CardDispatchContext } from './context/CardContext';

export default function CardNumber({ color }) {
  const { cardNumber, cardCompanyIndex } = useContext(CardStateContext);

  const dispatch = useContext(CardDispatchContext);

  const onChangeInput = (index) => (e) => {
    // dispatch({ type: TYPES.SET_NUMBER, value: e.target.value, index });
    dispatch({
      type: TYPES.UPDATE_FIELD_ARRAY,
      fieldName: 'cardNumber',
      payload: { value: e.target.value, index },
    });
  };

  const onFocusInput = () => {
    cardCompanyIndex === -1 && dispatch({ type: TYPES.SET_LIST_MODAL_FLAG, flag: true });
  };

  return (
    <S.Container>
      <S.InputTitle>카드 번호</S.InputTitle>
      <S.InputBox>
        <S.ExtendedInputContainer>
          <S.InputBasic
            width="20%"
            type="text"
            maxLength="4"
            color={color}
            value={cardNumber.value[0]}
            onChange={onChangeInput(0)}
            onFocus={onFocusInput}
          />
          <S.Hyphen color={color}>-</S.Hyphen>
          <S.InputBasic
            width="20%"
            type="text"
            maxLength="4"
            color={color}
            value={cardNumber.value[1]}
            onChange={onChangeInput(1)}
            onFocus={onFocusInput}
          />
          <S.Hyphen color={color}>-</S.Hyphen>
          <S.InputBasic
            width="20%"
            type="password"
            maxLength="4"
            color={color}
            value={cardNumber.value[2]}
            onChange={onChangeInput(2)}
            onFocus={onFocusInput}
          />
          <S.Hyphen color={color}>-</S.Hyphen>
          <S.InputBasic
            width="20%"
            type="password"
            maxLength="4"
            color={color}
            value={cardNumber.value[3]}
            onChange={onChangeInput(3)}
            onFocus={onFocusInput}
          />
        </S.ExtendedInputContainer>
      </S.InputBox>
      <ErrorMessage
        value={cardNumber.value}
        validate={validator.checkCardNumber}
        type={TYPES.SET_NUMBER_ERROR_MESSAGE}
      >
        {cardNumber.errorMessage}
      </ErrorMessage>
    </S.Container>
  );
}
