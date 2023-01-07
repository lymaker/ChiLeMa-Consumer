import {defineStore} from 'pinia';
import {checkApi, loginApi, logoutApi, registerApi, userInfoApi} from '@/api/auth.js';
import {clear, getStorage, setStorage, setStoragePlace} from '@/util/storage.js';

const authStorageName = 'auth';
const authStorage = getStorage(authStorageName);

export const useAuthStore = defineStore('useAuthStore', {
    state() {
        return authStorage || {
            token: null,
            user: {
                id: null,
                nickname: null,
                username: null,
                phone: null,
                email: null,
                avatarImageUrl: null,
                money: null,
                registerTime: null
            }
        };
    },
    actions: {
        async login({username, password, isRemember}) {
            try {
                setStoragePlace(!isRemember);
                const {headers} = await loginApi({username, password});
                this.token = headers['clm-token'];
                setStorage(authStorageName, this.$state);
            } catch (e) {
                console.warn('用户登录失败');
                throw e;
            }
        },
        async logout() {
            try {
                await logoutApi();
                this.$reset();
                clear();
            } catch (e) {
                console.error(e);
            }
        },
        async register(param) {
            await registerApi(param);
        },
        async check() {
            try {
                await checkApi();
                return true;
            } catch (e) {
                return false;
            }
        },
        async userInfo() {
            const {data} = await userInfoApi();
            this.user = data;
            setStorage(authStorageName, this.$state);
        }
    }
});

