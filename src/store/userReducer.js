import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getToken, getUser, setUser } from '../core/token';
import { userService } from '../services/user.service';
import { ADD_ADDRESS, SET_USER } from './type';

const initState = {
    user: getUser(),
    dataAddress: null,
};
// export const setUserAction = (user) => ({ type: SET_USER, payload: user });

// export const setUserInfoAciton = () => {
//     return async (dispatch) => {
//         try {
//             const token = getToken();
//             if (token) {
//                 const user = await userService.getInfo();
//                 setUser(user.data);
//                 dispatch({ type: SET_USER, payload: user.data });
//             }
//         } catch (error) {
//             throw error.message || error.error;
//         }
//     };
// };

// export const getAddressAction = () => {
//     return async (dispatch) => {
//         try {
//             if (getToken()) {
//                 const res = await userService.getAddress();
//                 dispatch(setAddressAction(res.data));
//             }
//         } catch (error) {}
//     };
// };

// function userReducer(state = initState, action) {
//     switch (action.type) {
//         case SET_USER:
//             return {
//                 ...state,
//                 user: action.payload,
//             };
//         case ADD_ADDRESS:
//             return {
//                 ...state,
//                 dataAddress: action.payload,
//             };
//         default:
//             return state;
//     }
// }

// export default userReducer;

// export const setAddressAction = (data) => ({
//     type: ADD_ADDRESS,
//     payload: data,
// });

// ------------------------------------------------------------

export const {
    reducer: userReducer,
    name,
    actions: userAction,
} = createSlice({
    initialState: initState,
    name: 'user',
    reducers: {
        logout(state, action) {
            state.user = null;
        },
        setUser(state, action) {
            state.user = action.payload;
        },
        addAddress(state, action) {
            state.dataAddress = action.payload;
        },
    },
});

export const logoutAction = createAsyncThunk(`${name}/logoutAction`, (_, thunkApi) => {
    thunkApi.dispatch(authAction.logout());
});

export const setUserInfoAciton = createAsyncThunk(`${name}/setUserInfoAciton`, async (_, thunkApi) => {
    try {
        if (getToken()) {
            const user = await userService.getInfo();
            setUser(user.data);
            thunkApi.dispatch(userAction.setUser(user.data));
        }
    } catch (error) {
        throw error.message || error.error;
    }
});

export const getAddressAction = createAsyncThunk(`${name}/getAddressAction`, async (_, thunkApi) => {
    try {
        const token = getToken();
        if (token) {
            const res = await userService.getAddress();
            thunkApi.dispatch(userAction.addAddress(res.data));
        }
    } catch (error) {
        throw error.message || error.error;
    }
});
