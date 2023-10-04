import axios, { AxiosProgressEvent, AxiosRequestConfig } from 'axios';
import { Image } from '../types';
import { errHandler, notify } from '../utils';
import { API_URL } from './api.ts';

export const uploadImage = async (
  file: File | null,
  onUploadProgress?: (evt: AxiosProgressEvent) => void,
) => {
  try {
    if (!file) return;

    const config: AxiosRequestConfig = {
      onUploadProgress,
    };

    const formData = new FormData();
    formData.append('image', file);

    const { data, status } = await axios.post<Image>(
      `${API_URL}/upload`,
      formData,
      config,
    );

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
