const intialState = {
  cart: [],
};

export default function cartReducer(state = intialState, { type, payload }) {
  switch (type) {
    case "ADDITEM":
      return { ...state, cart: payload };
    case "DELETEITEM":
      return { ...state, cart: payload };
    default:
      return state;
  }
}
