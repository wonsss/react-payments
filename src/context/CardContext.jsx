import React, { createContext, useReducer } from 'react';

export const TYPES = {
  SET_NUMBER: 'SET_NUMBER',
  SET_NUMBER_ERROR_MESSAGE: 'SET_NUMBER_ERROR_MESSAGE',
  SET_EXPIRATION: 'SET_EXPIRATION',
  SET_EXPIRATION_ERROR_MESSAGE: 'SET_EXPIRATION_ERROR_MESSAGE',
  SET_OWNER: 'SET_OWNER',
  SET_OWNER_ERROR_MESSAGE: 'SET_OWNER_ERROR_MESSAGE',
  SET_CVC: 'SET_CVC',
  SET_CVC_ERROR_MESSAGE: 'SET_CVC_ERROR_MESSAGE',
  SET_PASSWORD: 'SET_PASSWORD',
  SET_PASSWORD_ERROR_MESSAGE: 'SET_PASSWORD_ERROR_MESSAGE',
  SET_COMPANY_ERROR_MESSAGE: 'SET_COMPANY_ERROR_MESSAGE',
  SET_LIST_MODAL_FLAG: 'SET_LIST_MODAL_FLAG',
  SET_TIP_MODAL_FLAG: 'SET_TIP_MODAL_FLAG',
  SET_COMPANY_INDEX: 'SET_COMPANY_INDEX',
  UPDATE_FIELD: 'UPDATE_FIELD',
  UPDATE_FIELD_ARRAY: 'UPDATE_FIELD_ARRAY',
};

export const initialState = {
  cardOwner: {
    value: '',
    errorMessage: '',
  },
  cardCvc: {
    value: '',
    errorMessage: '',
  },
  cardNumber: {
    value: ['', '', '', ''],
    errorMessage: '',
  },
  // cardNumber: ['', '', '', ''],
  // cardNumberErrorMessage: '',
  cardExpiration: ['', ''],
  cardExpirationErrorMessage: '',
  // cardOwner: '',
  // cardOwnerErrorMessage: '',
  // cardCvc: '',
  // cardCvcErrorMessage: '',
  cardPassword: ['', ''],
  cardPasswordErrorMessage: '',
  cardCompanyIndex: -1,
  listModalFlag: false,
  tipModalFlag: false,
};

// export const initialState = {
//   cardNumber: {
//     value: ['', '', '', ''],
//     errorMessage: '',
//   },
//   cardExpiration: {
//     value: ['', '', '', ''],
//     errorMessage: '',
//   },
//   cardOwner: {
//     value: '',
//     errorMessage: '',
//   },
//   cardCvc: {
//     value: '',
//     errorMessage: '',
//   },
//   cardPassword: {
//     value: ['', ''],
//     errorMessage: '',
//   },
//   cardCompanyIndex: -1,
//   listModalFlag: false,
//   tipModalFlag: false,
// };

export const CardStateContext = createContext();
export const CardDispatchContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case TYPES.UPDATE_FIELD: {
      const { fieldName, payload } = action;

      return {
        ...state,
        [fieldName]: {
          ...state[fieldName],
          ...payload,
        },
      };
    }

    case TYPES.UPDATE_FIELD_ARRAY: {
      const cardNumber = [...state.cardNumber.value];
      const { fieldName, payload } = action;
      const { value, index } = payload;
      cardNumber[index] = value;

      return {
        ...state,
        [fieldName]: {
          ...state[fieldName],
          cardNumber,
        },
      };
    }

    case TYPES.SET_NUMBER: {
      const cardNumber = [...state.cardNumber];
      const { value, index } = action;

      cardNumber[index] = value;

      return {
        ...state,
        cardNumber,
      };
    }

    case TYPES.SET_NUMBER_ERROR_MESSAGE: {
      return {
        ...state,
        cardNumberErrorMessage: action.errorMessage,
      };
    }

    case TYPES.SET_EXPIRATION: {
      const cardExpiration = [...state.cardExpiration];
      const { value, index } = action;

      cardExpiration[index] = value;

      return {
        ...state,
        cardExpiration,
      };
    }

    case TYPES.SET_EXPIRATION_ERROR_MESSAGE: {
      return {
        ...state,
        cardExpirationErrorMessage: action.errorMessage,
      };
    }

    case TYPES.SET_OWNER: {
      return { ...state, cardOwner: action.value };
    }

    case TYPES.SET_OWNER_ERROR_MESSAGE: {
      return {
        ...state,
        cardOwnerErrorMessage: action.errorMessage,
      };
    }

    case TYPES.SET_CVC: {
      return { ...state, cardCvc: action.value };
    }

    case TYPES.SET_CVC_ERROR_MESSAGE: {
      return {
        ...state,
        cardCvcErrorMessage: action.errorMessage,
      };
    }

    case TYPES.SET_PASSWORD: {
      const cardPassword = [...state.cardPassword];
      const { value, index } = action;

      cardPassword[index] = value;

      return {
        ...state,
        cardPassword,
      };
    }

    case TYPES.SET_PASSWORD_ERROR_MESSAGE: {
      return {
        ...state,
        cardPasswordErrorMessage: action.errorMessage,
      };
    }

    case TYPES.SET_COMPANY_ERROR_MESSAGE: {
      return {
        ...state,
        cardCompanyErrorMessage: action.errorMessage,
      };
    }

    case TYPES.SET_LIST_MODAL_FLAG: {
      return {
        ...state,
        listModalFlag: action.flag,
      };
    }

    case TYPES.SET_TIP_MODAL_FLAG: {
      return {
        ...state,
        tipModalFlag: action.flag,
      };
    }

    case TYPES.SET_COMPANY_INDEX: {
      return {
        ...state,
        cardCompanyIndex: action.index,
      };
    }

    default:
      throw new Error('Unhandled action type.');
  }
};

const CardProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <CardStateContext.Provider value={state}>
      <CardDispatchContext.Provider value={dispatch}>{children}</CardDispatchContext.Provider>
    </CardStateContext.Provider>
  );
};

export default CardProvider;
