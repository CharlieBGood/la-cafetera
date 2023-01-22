/* eslint-disable no-param-reassign */
import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_EL_TINTO_BASE_API,
});

instance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('EL_TINTO_API_TOKEN') || null;
    if (token && config.headers !== undefined) {
      if (!config.headers['Content-type']) {
        config.headers['Content-type'] = 'application/json';
      }
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  err => Promise.reject(err)
);

instance.interceptors.response.use(
  response => response,
  error => {
    if (!error.response) {
      console.log('Please check your internet connection.');
    }

    if (error.response.status === 401) {
      console.log('error 401?');
      localStorage.removeItem('EL_TINTO_API_TOKEN');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default instance;
