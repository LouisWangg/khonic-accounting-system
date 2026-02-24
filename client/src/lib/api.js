import axios from 'axios';

const api = axios.create({
    baseURL: '',
});

// Request interceptor: attach auth token if available
api.interceptors.request.use((config) => {
    const user = localStorage.getItem('khonic_user');
    if (user) {
        const parsed = JSON.parse(user);
        if (parsed.token) {
            config.headers.Authorization = `Bearer ${parsed.token}`;
        }
    }
    return config;
});

// Response interceptor: handle 401 (unauthorized)
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('khonic_user');
            window.location.href = '/';
        }
        return Promise.reject(error);
    }
);

export default api;
