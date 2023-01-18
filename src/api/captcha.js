import request from '@/util/request.js';

const baseUrl = import.meta.env.VITE_API_LOCAL_URL;

export function generate(type) {
    return request.post(`${baseUrl}/captcha/generate`, {
        type
    });
}

export function verify(param) {
    return request.post(`${baseUrl}/captcha/verify`, param);
}