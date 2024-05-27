import { productService } from './../services/product.service';

const initState = {
    categories: null,
    wishlist: null,
};

const SET_CATEGORY = 'product/setCategory';
const SET_WISHLIST = 'product/setWishlist';

export const getCategoryAction = () => {
    return async (dispatch) => {
        try {
            const res = await productService.getAllCategory();
            dispatch({ type: SET_CATEGORY, payload: res.data });
        } catch (error) {}
    };
};

// export const setSorting = (data) => ({ type: SET_LOWEST, payload: data });

export default function productReducer(state = initState, action) {
    switch (action.type) {
        case SET_CATEGORY:
            return {
                ...state,
                categories: action.payload,
            };

        case SET_WISHLIST:
            return {
                ...state,
                wishlist: action.payload,
            };

        default:
            return state;
    }
}
