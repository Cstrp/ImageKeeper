import axios from 'axios';

const API_URL = 'http://localhost:3000/';

export const api = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
  baseURL: API_URL,
});
