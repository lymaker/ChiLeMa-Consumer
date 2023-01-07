import request from '@/util/request.js';

export function checkUsernameApi(username) {
return request.get('/user/check-username', {
    params: {
        username
    }
});
}

export function updateFieldApi(param) {
    return request.put('/user/update/field', param);
}