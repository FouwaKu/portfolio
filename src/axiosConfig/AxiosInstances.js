import axios from "axios";

export const axiosInstance1 = axios.create({
    baseURL: 'https://portfolio-cdd5e-default-rtdb.firebaseio.com/',
});

export const axiosInstance2 = axios.create({
    baseURL: 'https://identitytoolkit.googleapis.com/v1',
});
export const setAxiosParams = (token) => {
    axiosInstance1.interceptors.request.use(config =>{
        config.params = config.params || {};
        config.params.auth = token;
        return config;
    });
}  





