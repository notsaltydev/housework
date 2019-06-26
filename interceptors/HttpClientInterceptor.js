import axios from 'axios'
import {AsyncStorage} from "react-native";

const ABSOLUTE_URL_REGEX = /^(?:\w+:)\/\//;

export const HttpClientInterceptor = axios.create({
    baseURL: 'https://housework-management.herokuapp.com',
    headers: {
        'Content-Type': 'application/json'
    }
});

HttpClientInterceptor.interceptors.request.use(async (config) => {
        const token = await AsyncStorage.getItem('userToken');

        if (!!token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    }, (error) => Promise.reject(error)
);
