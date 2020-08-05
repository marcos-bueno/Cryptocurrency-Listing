import axios from 'axios';

const api = axios.create({
  baseURL: 'https://rest.coinapi.io',
  headers: {
    'X-CoinAPI-Key': 'A4A783BE-AFDE-4988-9621-62B2729ED2E6'
  }
});

export default api;