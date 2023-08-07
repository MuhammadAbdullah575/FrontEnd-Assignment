import { ActionTypes } from "../contants/action-type";
const intialState = {
  products: [],
};

export default function productsReducer  (state = intialState, { type, payload })  {
  switch (type) {
    case ActionTypes.SET_PRODUCTS:
      return { ...state, products: payload };
    default:
      return state;
  }
}



