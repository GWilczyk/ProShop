import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { cartReducer } from './reducers/cartReducers';
import {
	productDetailsReducer,
	productListReducer
} from './reducers/productReducers';
import {
	userLoginReducer,
	userRegisterReducer,
	userDetailsReducer
} from './reducers/userReducers';

const reducer = combineReducers({
	cart: cartReducer,
	productDetails: productDetailsReducer,
	productList: productListReducer,
	userDetails: userDetailsReducer,
	userLogin: userLoginReducer,
	userRegister: userRegisterReducer
});

const cartItemsFromStorage = localStorage.getItem('cartItems')
	? JSON.parse(localStorage.getItem('cartItems'))
	: [];

const userInfoFromStorage = localStorage.getItem('userInfo')
	? JSON.parse(localStorage.getItem('userInfo'))
	: null;

const initialState = {
	cart: { cartItems: cartItemsFromStorage },
	userLogin: { userInfo: userInfoFromStorage }
};

const middleware = [thunk];

const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
