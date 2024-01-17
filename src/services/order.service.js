import api from '../config/api';

export const orderService = {
    getAllOrder(query = '') {
        return api.get(`/order/v2${query}`);
    },

    getOrderDetail(id) {
        return api.get(`/order/v2/${id}`);
    },
    getCount() {
        return api.get('/order/v2/count');
    },
};
