import { configureStore } from '@reduxjs/toolkit'
import reducers from './reducers/index';
import rootReducer from './reducers'
import {persistStore,persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key:'root',
    storage,

}
// wrap the root reducer in a persistReducer

const persistedReducer = persistReducer(persistConfig,rootReducer);

const store = configureStore({ reducer: persistedReducer },{});
export const persistor = persistStore(store);


export default store;

