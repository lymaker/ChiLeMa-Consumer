import axios from 'axios';
import {showNotify} from 'vant';
import {useAuthStore} from '@/store/auth.js';

axios.defaults.timeout = 3000;
axios.defaults.baseURL = import.meta.env.DEV ? '/api' : import.meta.env.VITE_API_URL;

axios.interceptors.request.use(
    config => {
        let authStore = useAuthStore();
        config.headers['clm-token'] = authStore.token;
        // 请求配置
        return config;
    },
    response => {
        // 请求错误
        showNotify('请求失败');
        throw response;
    }
);

axios.interceptors.response.use(
    request => {
        // 响应数据
        return request;
    },
    response => {
        const {response: {status, data}} = response;
        // 响应错误
        if (data.message) {
            showNotify({
                message: data.message,
                type: status === 500 ? 'danger' : 'warning'
            });
        } else {
            showNotify('请求失败');
        }
        throw response;
    }
);

export default axios;