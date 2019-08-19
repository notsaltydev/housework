import {HttpClientInterceptor} from '../interceptors/HttpClientInterceptor';

const joinToGroup = (body => {
    return HttpClientInterceptor.post(`/api/group/join`, body)
        .catch(error => Promise.reject(error));
});

const createGroup = (body => {
    return HttpClientInterceptor.post(`/api/group`, body)
        .catch(error => Promise.reject(error));
});

export const GroupService = {
    joinToGroup,
    createGroup
};
