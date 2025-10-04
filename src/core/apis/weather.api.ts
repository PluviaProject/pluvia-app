import { CONFIG } from '@/core/config';
import axios from 'axios';

export const weatherApi = axios.create({
  baseURL: CONFIG.apis.weatherApi.baseUrl,
  timeout: CONFIG.apis.weatherApi.timeout,
  headers: {
    'Content-Type': 'application/json'
  }
});
