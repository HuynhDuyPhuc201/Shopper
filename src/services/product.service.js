import api from '../config/api';

export const productService = {
    getProduct(query = '') {
        return api.get(`/product${query}`);
    },
    getProductDetail(id) {
        return api.get(`/product/${id}`);
    },

    // Wishlist
    getwishlist(query = '') {
        return api.get(`/product/wishlist${query}`);
    },
    addWishlist(id) {
        return api.post(`/product/wishlist/${id}`);
    },
    removeWishlist(id) {
        return api.delete(`/product/wishlist/${id}`);
    },

    // category
    getAllCategory() {
        return api.get(`/product/categories`);
    },
    getCategoryDetail(id) {
        return api.get(`/product/categories/${id}`);
    },
};
