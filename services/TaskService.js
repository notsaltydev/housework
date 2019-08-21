import {HttpClientInterceptor} from '../interceptors/HttpClientInterceptor';

const createTask = (body => {
    return HttpClientInterceptor.post(`/api/task`, body)
        .catch(error => Promise.reject(error));
});

export const TaskService = {
    createTask
};
