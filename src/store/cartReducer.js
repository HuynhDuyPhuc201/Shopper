import { getToken } from '../core/token';
import { cartService } from '../services/cart.service';

const initState = {
    cart: null,
};

const SET_CART = 'cart/setCart';

export const getCartAction = (data) => {
    return async (dispatch) => {
        try {
            if (getToken()) {
                const cart = await cartService.getCart();
                dispatch({ type: SET_CART, payload: cart.data });
                data?.success();
            }
        } catch (error) {}
    };
};

export const removeCartAction = (id) => {
    return async (dispatch) => {
        try {
            await cartService.removeItem(id);
            dispatch(getCartAction());
        } catch (error) {
            throw new Error(error);
        }
    };
};
export const addCartAction = (data) => {
    return async (dispatch) => {
        try {
            const res = await cartService.addProduct(data.id);
            if (res.updateCount) {
                dispatch(getCartAction());
                data?.success();
            }
        } catch (err) {
            throw new Error(err);
        } finally {
            data?.finally();
        }
    };
};

export const updateQuantityAction = (data) => {
    return async (dispatch) => {
        try {
            await cartService.updateQuantity(data.id, data.quantity);
            dispatch(getCartAction());
            data?.success();
        } catch (error) {
            throw new Error(error);
        }
    };
};

export const preCheckoutAction = (data) => {
    return async (dispatch) => {
        try {
            dispatch({ type: SET_CART, payload: data });
            // localStorage.setItem('update-cart', JSON.stringify(data));
        } catch (error) {}
    };
};

export default function cartReducer(state = initState, action) {
    switch (action.type) {
        case SET_CART:
            return {
                ...state,
                cart: action.payload,
            };
        default:
            return state;
    }
}
