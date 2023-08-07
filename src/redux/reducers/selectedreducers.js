import { ActionTypes } from "../contants/action-type";
const intialState = {
  product: '',
};

export default function selectedProductReducer  (state = intialState, { type, payload })  {
    switch (type) {
      case ActionTypes.SELECTED_PRODUCT:
        return { ...state, product: payload };
      default:
        return state;
    }
  };