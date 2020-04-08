import axios from "axios";
import LocalStorageService from "./LocalStorageService";
const localStorageService = LocalStorageService.getService();
// Add a request interceptor
axios.interceptors.request.use((config) => {
        console.log("config", config)
        // Do something before request is sent
        const token = localStorageService.getIdToken();
    //const token = localStorage.getItem('CognitoIdentityServiceProvider.4gqn0njgohf572fp32nptcvsi7.Saina.idToken');
        if (token) {
            // console.log(token)
            config.headers['Authorization'] = 'Bearer ' + token;
        }
        return config;
    }, (error) => {
        // Do something with request error
        return Promise.reject(error);
});


//Add a response interceptor
axios.interceptors.response.use(function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
        }, function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        // const originalRequest = error.config;

        if (error.response.status === 401) {
            console.log("error in response header")
            return window.location.href = '/';
        }
        return Promise.reject(error);
});
