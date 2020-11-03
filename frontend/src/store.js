import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { cartReducer } from './reducers/cartReducers';
import {
	orderCreateReducer,
	orderDeliverReducer,
	orderDetailsReducer,
	orderListMyReducer,
	orderListReducer,
	orderPayReducer
} from './reducers/orderReducers';
import {
	productCreateReducer,
	productCreateReviewReducer,
	productDeleteReducer,
	productDetailsReducer,
	productListReducer,
	productTopRatedReducer,
	productUpdateReducer
} from './reducers/productReducers';
import {
	userDeleteReducer,
	userDetailsReducer,
	userListReducer,
	userLoginReducer,
	userRegisterReducer,
	userUpdateProfileReducer,
	userUpdateReducer
} from './reducers/userReducers';

const reducer = combineReducers({
	cart: cartReducer,
	orderCreate: orderCreateReducer,
	orderDeliver: orderDeliverReducer,
	orderDetails: orderDetailsReducer,
	orderListMy: orderListMyReducer,
	orderList: orderListReducer,
	orderPay: orderPayReducer,
	productCreate: productCreateReducer,
	productCreateReview: productCreateReviewReducer,
	productDelete: productDeleteReducer,
	productDetails: productDetailsReducer,
	productList: productListReducer,
	productTopRated: productTopRatedReducer,
	productUpdate: productUpdateReducer,
	userDelete: userDeleteReducer,
	userDetails: userDetailsReducer,
	userList: userListReducer,
	userLogin: userLoginReducer,
	userRegister: userRegisterReducer,
	userUpdateProfile: userUpdateProfileReducer,
	userUpdate: userUpdateReducer
});

const cartItemsFromStorage = localStorage.getItem('cartItems')
	? JSON.parse(localStorage.getItem('cartItems'))
	: [];

const userInfoFromStorage = localStorage.getItem('userInfo')
	? JSON.parse(localStorage.getItem('userInfo'))
	: null;

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
	? JSON.parse(localStorage.getItem('shippingAddress'))
	: {};

const paymentMethodFromStorage = localStorage.getItem('paymentMethod')
	? JSON.parse(localStorage.getItem('paymentMethod'))
	: {};

const initialState = {
	cart: {
		cartItems: cartItemsFromStorage,
		shippingAddress: shippingAddressFromStorage,
		paymentMethod: paymentMethodFromStorage
	},
	userLogin: { userInfo: userInfoFromStorage }
};

const middleware = [thunk];

const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
