import api from '../config/api';
import { getToken } from '../core/token';

export const userService = {
    // nếu gặp lỗi Unauthorization tức là ch truyền Bearer token
    getInfo() {
        const token = getToken();
        return api.get('/users', {
            headers: {
                Authorization: `Bearer ${token.accessToken}`,
            },
        });
    },
    updateInfo(form) {
        return api.patch('/users', form);
    },
    changePassword(data) {
        return api.post('/users/change-password', data);
    },

    // address
    getAddress(id) {
        return api.get(`/users/address${id ? `/${id}` : ''}`);
    },
    getAddressDetail(id) {
        return api.get(`/users/address/${id}`);
    },
    addAddress(form) {
        return api.post('/users/address', form);
    },
    editAddress(id, form) {
        return api.patch(`/users/address/${id}`, form);
    },
    deleteAddress(id) {
        return api.delete(`/users/address/${id}`);
    },
    deleteAllAddress() {
        return api.delete(`/users/address/delete-all`);
    },

    // payment
    getPayment() {
        return api.get(`/users/payment`);
    },
    getPaymentDetail(id) {
        return api.get(`/users/payment/${id}`);
    },
    addPayment(form) {
        return api.post(`/users/payment`, form);
    },
    editPayment(id) {
        return api.patch(`/users/payment/${id}`);
    },
    deletePayment(id) {
        return api.delete(`/users/payment/${id}`);
    },
    addPayment() {
        return api.delete(`/users/payment/delete-all`);
    },
};
