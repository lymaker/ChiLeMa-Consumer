import md5 from 'md5';
import request from '@/util/request.js';

const baseUrl = import.meta.env.VITE_API_MAP_URL;
const key = import.meta.env.VITE_TENCENT_MAP_K;
const sign = import.meta.env.VITE_TENCENT_MAP_SK;

/**
 * ip 定位
 */
export function ipLocation() {
    const uri = '/ws/location/v1/ip';
    return request.get(baseUrl + uri, {
        params: {
            key,
            sig: sig(uri)
        }
    });
}

/**
 * 关键词输入提示
 * @param {Object} data
 */
export function suggestion(data) {
    const uri = '/ws/place/v1/suggestion';
    return request.get(baseUrl + uri, {
        params: {
            ...data,
            key,
            sig: sig(uri, data)
        }
    });
}

export function sig(uri, param = {}) {
    setBasicParam(param);
    const keys = Object.keys(param).sort();
    uri += '?';
    for (let index = 0; index < keys.length; index++) {
        const key = keys[index];
        uri += key + '=' + param[key];
        if (index !== keys.length - 1) {
            uri += '&';
        }
    }
    console.log(uri);
    return md5(uri + sign);
}

function setBasicParam(param={}) {
    param.key = key;
}