import axios from 'axios';
import { Image } from '../types';
import { notify } from '../utils/notify.ts';
import { API_URL } from './api.ts';

export const getAllImages = async () => {
  try {
    const { data, status } = await axios.get<Image[]>(`${API_URL}`);

    if (status === 200) {
      return data;
    }

    return [];
  } catch (error) {
    console.error('Error fetching images', error);
    notify({
      type: 'info',
      message: 'Something went wrong',
      description: 'You do not have any images. Please upload one.',
    });
  }
};
