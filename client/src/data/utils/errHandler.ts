import { notify } from './notify.ts';

export const errHandler = (err: unknown, description?: string) => {
  if (err instanceof Error) {
    notify({
      type: 'error',
      message: err.message,
      description: description!,
    });
  }
};
