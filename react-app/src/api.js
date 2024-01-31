import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost/api',
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

export default api;
