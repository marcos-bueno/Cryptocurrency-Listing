import axios from 'axios';

const api = axios.create({
  baseURL: 'https://rest.coinapi.io',
  headers: {
    'X-CoinAPI-Key': 'your key here'
  }
});

export default api;