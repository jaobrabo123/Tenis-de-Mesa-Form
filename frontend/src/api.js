import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:2923'
});

export default api;