import * as types from '../Action/actionType';

const initialState = {
  cardList: [],
};

const DataReducers = (state = initialState, action) => {
  switch (action.type) {
    case types.CARD_LIST:
      return {
        ...state,
        cardList: action.payload,
      };
    default:
      return state;
  }
};
export default DataReducers;
