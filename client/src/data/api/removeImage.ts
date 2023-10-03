import axios from 'axios';
import { errHandler } from '../utils/errHandler.ts';
import { notify } from '../utils/notify.ts';
import { API_URL } from './api.ts';

export const removeImage = async (id: string) => {
  try {
    const { data, status } = await axios.delete(`${API_URL}/${id}`);

    if (status === 200) {
      notify({
        type: 'success',
        message: 'Done!',
        description: 'Image deleted successfully',
      });
    }

    return data;
  } catch (error) {
    errHandler(error, 'Error while deleting image.');
  }
};
