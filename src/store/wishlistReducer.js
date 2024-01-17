import { productService } from '../services/product.service';
import { GET_WISHLIST } from './type';

export const removeWishlistAction = (data) => {
    return async () => {
        try {
            const res = await productService.removeWishlist(data.id);
            if (res.deleteCount) {
                await productService.getwishlist();
                data?.success();
            }
        } catch (error) {}
    };
};

export const wishlistReducer = (state, action) => {
    switch (action.type) {
        case GET_WISHLIST:
            return {};

        default:
            return state;
    }
};
