import request from '@/util/request.js';

const baseUrl = import.meta.env.VITE_API_LOCAL_URL;

export function imageApi(file,) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('contentType', file.type);
    return request.post(`${baseUrl}/upload/image`, formData, {
        'Content-type' : 'multipart/form-data',
    });
}