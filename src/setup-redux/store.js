import {createStore } from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import reducers from './reducers/reducer';
import { applyMiddleware } from 'redux';
// import thunk from 'redux-thunk';


const persistConfig ={
    key:'root',
    storage: storage,
    whitelist: ['login'],

}

const pReducer = persistReducer(persistConfig, reducers);

export const store = createStore(
    pReducer, 
    composeWithDevTools(),
    );
export const persistor = persistStore(store);