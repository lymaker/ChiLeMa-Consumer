import request from '@/util/request.js';

const baseUrl = import.meta.env.VITE_API_LOCAL_URL;

export function loginApi(data) {
    return request.post(`${baseUrl}/auth/login`, data);
}

export function logoutApi() {
    return request.delete(`${baseUrl}/auth/logout`);
}
export function checkApi() {
    return request.get(`${baseUrl}/auth/check`);
}

