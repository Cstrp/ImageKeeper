import axios from 'axios';
import { Image } from '../types';
import { errHandler } from '../utils/errHandler.ts';
import { API_URL } from './api.ts';

export const getAllImages = async () => {
  try {
    const { data, status } = await axios.get<Image[]>(`${API_URL}`);

    if (status === 200) {
      return data;
    }

    return [];
  } catch (error) {
    errHandler(error, 'Error while getting images.');
  }
};
