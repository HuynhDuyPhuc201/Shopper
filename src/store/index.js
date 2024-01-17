import { applyMiddleware, compose, createStore } from 'redux';
import { configureStore, combineReducers, createAsyncThunk } from '@reduxjs/toolkit';

import pageReducer from './pageReducer';
import { authReducer } from './authReducer';
// import thunk from 'redux-thunk';
import { getAddressAction, setUserInfoAciton, userReducer } from './userReducer';
import cartReducer, { getCartAction } from './cartReducer';
import productReducer from './productReducer';
import { DEBUG } from '../config';

// redux toolkit

// 1. Giới thiệu về redux tollkit
// 2. setup redux = reduxToolkit
// 3. Thay đổi user, auth thành redux toolkit
// 4. sử dụng createAsyncThunk để tạo các action gọi api
// - pending: kết quả chưa được xử lý xong, đang chờ
// - fullfilled: tác vụ được thực hiện thành công
// - rejected: tác vụ không đồng bộ thất bại
// 5. so sánh code theo kiểu thuần và khi sử dụng redux toolkit

// const reducer = combineReducers({
//     auth: authReducer,
//     page: pageReducer,
//     user: userReducer,
//     cart: cartReducer,
//     product: productReducer,
// });

// //  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// const composeEnhancers =
//     typeof window === 'object' && window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__']
//         ? window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__']({})
//         : compose;

// const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

const store = configureStore({
    reducer: {
        auth: authReducer,
        page: pageReducer,
        user: userReducer,
        cart: cartReducer,
        product: productReducer,
    },
    devTools: DEBUG,
});

// getInfo lần đầu tên khi store khởi chạy
store.dispatch(setUserInfoAciton());
store.dispatch(getCartAction());

export default store;
