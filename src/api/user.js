import request from '@/util/request.js';

const baseUrl = import.meta.env.VITE_API_LOCAL_URL;

export function checkUsernameApi(username) {
    return request.get(`${baseUrl}/user/check-username`, {
        params: {
            username
        }
    });
}

export function selectApi() {
    return request.get(`${baseUrl}/user/select`);
}

export function createApi(data) {
    return request.post(`${baseUrl}/user/create`, data);
}

export function updateApi(param) {
    return request.put(`${baseUrl}/user/update`, param);
}