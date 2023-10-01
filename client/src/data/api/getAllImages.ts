import { Image } from '../types';
import { api } from './api.ts';
import { errHandler } from '../utils/errHandler.ts';

export const getAllImages = async () => {
  try {
    const { data, status } = await api.get<Image[]>('/');

    if (status === 200) {
      return data;
    }

    return [];
  } catch (error) {
    errHandler(error, 'Error while getting images.');
  }
};
