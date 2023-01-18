import {defineStore} from 'pinia';

export const useAddressStore = defineStore('useAddressStore', {
    state() {
        return {
            city: null,
            title: null,
            address: null,
            location: null,
        };
    }
});