import { errHandler } from '../utils/errHandler.ts';
import { api } from './api.ts';

export const uploadImage = async (file: File | null) => {
  try {
    if (file) {
      const formData = new FormData();
      formData.append('image', file);

      const { data, status } = await api.post('/upload', formData);

      if (status === 200) {
        return data;
      }
    }
  } catch (error) {
    errHandler(error, 'Error while uploading image.');
  }
};
