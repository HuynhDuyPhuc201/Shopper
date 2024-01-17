import api from '../config/api';

export const cartService = {
    getCart() {
        return api.get(`/cart/v2`);
    },
    updateQuantity(id, data) {
        return api.patch(`/cart/v2/${id}`, { quantity: data });
    },
    addProduct(id) {
        return api.patch(`/cart/v2/${id}`, { quantity: 1 });
    },
    removeItem(id) {
        return api.delete(`/cart/v2/${id}`);
    },
    getPromotion(promotion) {
        return api.get(`/cart/v2/promotion/${promotion}`);
    },

    //
    checkout(form) {
        return api.post('/cart/v2/checkout', form);
    },
    preCheckout(form) {
        return api.post('/cart/v2/pre-checkout', form);
    },

    //shipping
    getShippingMethod() {
        return api.get('/cart/v2/shipping-method');
    },
};
