import { combineReducers } from "redux";
import productsReducer from './productReducers'
import selectedProductReducer from './selectedreducers'
import cartReducer from './cartReducers'

const reducers = combineReducers({
    allProducts: productsReducer,
    product: selectedProductReducer,
    cart: cartReducer
    
});

export default reducers;