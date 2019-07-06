import {HttpClientInterceptor} from '../interceptors/HttpClientInterceptor';

const getUserMe = () => {
    return HttpClientInterceptor.get('/api/user/me')
        .catch(error => Promise.reject(error));
};

const getUserGroups = () => {
    return HttpClientInterceptor.get('/api/group')
        .catch(error => Promise.reject(error));
};

const getGroupById = (groupId) => {
    return HttpClientInterceptor.get(`/api/group/${groupId}`)
        .catch(error => Promise.reject(error));
};

const getTasksForGroup = (groupId => {
    return HttpClientInterceptor.get(`/api/group/${groupId}/task`)
        .catch(error => Promise.reject(error));
});

export const HttpClientService = {
    getUserMe,
    getUserGroups,
    getGroupById,
    getTasksForGroup
};
