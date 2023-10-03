import axios from 'axios';
import { errHandler } from '../utils/errHandler.ts';
import { notify } from '../utils/notify.ts';
import { API_URL } from './api.ts';

export const updateImage = async (id: string, label: string) => {
  try {
    const { data, status } = await axios.put(`${API_URL}/update/${id}`, {
      label,
    });

    if (status === 200) {
      notify({
        type: 'success',
        message: 'Done!',
        description: 'Image updated successfully',
      });
      return data;
    }
  } catch (error) {
    errHandler(error, 'Error while updating image.');
  }
};
