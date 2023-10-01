import { errHandler } from '../utils/errHandler.ts';
import { api } from './api.ts';

export const updateImage = async (id: string, label: string) => {
  try {
    const { data, status } = await api.put(`/update/${id}`, label);

    if (status === 200) {
      return data;
    }
  } catch (error) {
    errHandler(error, 'Error while updating image.');
  }
};
