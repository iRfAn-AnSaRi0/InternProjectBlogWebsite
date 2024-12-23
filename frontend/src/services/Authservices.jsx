import API from '../axios/Axiosinstance'

export const loginUser = (credentials) => API.post('/auth/login', credentials);
export const registerUser = (userInfo) => API.post('/auth/signup', userInfo);
export const logoutUser = () => API.post('/auth/logout');