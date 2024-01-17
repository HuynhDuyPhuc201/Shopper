import api from '../config/api';

export const authService = {
    login(form) {
        return api.post('/authentication/v2/login', form);
    },
    register(form) {
        return api.post('/users/register', form);
    },
    refreshToken(form) {
        return api.post('/authentication/v2/refresh-token', form);
    },
};
