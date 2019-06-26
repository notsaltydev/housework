import axios from 'axios'
import {AsyncStorage} from "react-native";

export const AuthInterceptor = axios.create({
    baseURL: 'https://housework-management.herokuapp.com',
    headers: {
        'Content-Type': 'application/json'
    }
});

AuthInterceptor.interceptors.response.use(async (response) => {
    await AsyncStorage.setItem('userToken', response.data.token);

    return response;
}, (error) => {
    Promise.reject(error);
});
