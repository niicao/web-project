import axios from 'axios';

const rotas = axios.create({
    baseURL: 'http://localhost:5001'
});

export default rotas;