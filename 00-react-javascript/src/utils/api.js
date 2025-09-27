import axios from './axios.customize.js';
const createUserAPI = (name, email, password) => {
    const URL_API = '/v1/api/register';
    const data = { name, email, password };
    return axios.post(URL_API, data);
};

// API login
const loginAPI = (email, password) => {
    const URL_API = '/v1/api/login';
    const data = { email, password };
    return axios.post(URL_API, data);
};

// API lấy danh sách user
const getUserAPI = () => {
    const URL_API = '/v1/api/user';
    return axios.get(URL_API);
};

export {
    createUserAPI,
    loginAPI,
    getUserAPI
};