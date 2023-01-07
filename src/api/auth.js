import request from '@/util/request.js';

export function loginApi(data) {
    return request.post('/auth/login', data);
}

export function logoutApi() {
    return request.delete('/auth/logout');
}

export function registerApi(data) {
    return request.post('/auth/register', data);
}

export function checkApi() {
    return request.get('/auth/check');
}

export function userInfoApi() {
    return request.get('/auth/user-info');
}