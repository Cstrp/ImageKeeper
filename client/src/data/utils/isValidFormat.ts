import { notify } from '.';

export const isValidFormat = (file: File): boolean => {
  const fileTypes = /\.(png|jpg|jpeg|gif|svg|webp|ico|avif)$/i;

  if (fileTypes.test(file.name)) {
    return true;
  } else {
    notify({
      type: 'error',
      message: 'Invalid image format',
      description:
        'Only png, jpg, jpeg, gif, svg, webp, ico, avif formats are allowed',
    });

    return false;
  }
};
