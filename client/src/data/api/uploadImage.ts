import axios from 'axios';
import { Image } from '../types/image.ts';
import { errHandler } from '../utils/errHandler.ts';
import { notify } from '../utils/notify.ts';
import { API_URL } from './api.ts';

export const uploadImage = async (file: File | null) => {
  try {
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    const { data, status } = await axios.post<Image>(
      `${API_URL}/upload`,
      formData,
    );

    console.log('FROM UPLOAD', data);

    if (status === 200) {
      notify({
        type: 'success',
        message: 'Done!',
        description: 'Image uploaded successfully.',
      });

      return data;
    }
  } catch (error) {
    errHandler(error, 'Error uploading image.');
  }
};
