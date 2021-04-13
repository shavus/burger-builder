import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-builder-cbcef-default-rtdb.firebaseio.com/',
});

export default instance;