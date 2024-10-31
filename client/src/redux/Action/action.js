import * as types from './actionType';

// ?get-----------------------------------------------------------
const getProductListData = (data) => ({
  type: types.CARD_LIST,
  payload: data,
});

export const loadPostData = (postData) => {
  return function (dispatch) {
    dispatch(getProductListData(postData));
  };
};
