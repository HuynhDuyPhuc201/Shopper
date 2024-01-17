import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { getUser, removeToken, removeUser, setToken, setUser } from '../core/token';
import { authService } from '../services/auth.service';
import { userService } from '../services/user.service';
import { AUTH_LOGIN, AUTH_LOGOUT } from './type';
import { setUserInfoAciton } from './userReducer';

// const initState = {
//     user: getUser(),
// };

// export const loginAction = (data) => {
//     return async (dispatch) => {
//         try {
//             const token = await authService.login(data.form);
//             setToken(token.data);

//             dispatch(setUserInfoAciton());
//             data.success();
//         } catch (err) {
//             data.error(err);
//         }
//     };
// };

// export const logoutAction = () => ({ type: AUTH_LOGOUT });

// export const registerAction = (data) => {
//     return async () => {
//         try {
//             const res = await authService.register(data.form);
//             data.success(res);
//         } catch (err) {
//             data.error(err);
//         }
//     };
// };

// function authReducer(state = initState, action) {
//     switch (action.type) {
//         case AUTH_LOGOUT:
//             return {
//                 ...state,
//                 user: null,
//             };
//         default:
//             return state;
//     }
// }

// export default authReducer;

// ------------------------------------------------------------

export const {
    reducer: authReducer,
    name,
    actions: authAction,
} = createSlice({
    initialState: {
        loadingLogin: false,
        loadingRegister: false,
    },
    name: 'auth',
    reducers: {},

    // setloading login và register cho button bằng redux toolkit
    // extraReducers: (builder) => {
    //     builder.addCase(loginAction.pending, (state, action) => {
    //         return (state.loadingLogin = true);
    //     });
    //     // builder.addCase(loginAction.fulfilled, (state, action) => {
    //     //     return (state.loadingLogin = false);
    //     // });
    //     // builder.addCase(loginAction.rejected, (state, action) => {
    //     //     return (state.loadingLogin = false);
    //     // });

    //     builder.addMatcher(isAnyOf(loginAction.fulfilled, loginAction.rejected), (state) => {
    //         state.loadingLogin = false;
    //     });
    // },
});

export const loginAction = createAsyncThunk(`${name}/loginAction`, async (data, thunkApi) => {
    try {
        const token = await authService.login(data.form);
        setToken(token.data);
        thunkApi.dispatch(setUserInfoAciton());
        data.success();
    } catch (err) {
        data.error(err);
    }
});

export const registerAction = createAsyncThunk(`${name}/registerAction`, async (data, thunkApi) => {
    try {
        const res = await authService.register(data.form);
        data.success(res);
    } catch (err) {
        data.error(err);
    }
});
