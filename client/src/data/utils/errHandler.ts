import { AxiosError } from 'axios';
import { notify } from './notify.ts';

interface ErrorResponse {
  message: string;
  status: number;
  data: { message: string } | undefined;
}

export const errHandler = (
  err: (AxiosError & ErrorResponse) | unknown,
  description?: string,
) => {
  const defaultDescription = 'Something went wrong...';
  if (err instanceof AxiosError) {
    if (err.response) {
      notify({
        type: 'error',
        message: err.response?.data?.message || err.message,
        description: description || defaultDescription,
      });
    } else if (err.request) {
      notify({
        type: 'error',
        message: err.message,
        description: description || defaultDescription,
      });
    } else {
      notify({
        type: 'error',
        message: err.message,
        description: description || defaultDescription,
      });
    }
  }
};
