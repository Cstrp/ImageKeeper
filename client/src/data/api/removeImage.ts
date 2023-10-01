import { notify } from '../utils/notify.ts';
import { api } from './api.ts';
import { errHandler } from '../utils/errHandler.ts';

export const removeImage = async (id: string) => {
  try {
    const { data, status } = await api.delete(`/${id}`);

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
