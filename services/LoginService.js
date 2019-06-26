import {AuthInterceptor} from '../interceptors/AuthInterceptor';

export const LoginService = (email, password) => {
    return AuthInterceptor.post('/api/auth',
        {
            email: email,
            password: password
        })
        .catch(error => Promise.reject(error));
};
