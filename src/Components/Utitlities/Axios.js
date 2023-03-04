import axios from 'axios';

const URL = `http://api.weatherapi.com/v1`;
axios.defaults.baseURL = `${URL}`;

export default axios;
