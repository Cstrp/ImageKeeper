import { isValidFormat } from '.';
import { ImageStore, QuantityStore } from '../store';

export const handleUpload = async (
  files: FileList | null,
  imageStore: ImageStore,
  quantityStore: QuantityStore,
) => {
  if (!files) {
    return;
  }

  if (Array.isArray(files) || files.length) {
    for (const file of files) {
      if (isValidFormat(file)) {
        await imageStore.addImage(file);
        quantityStore.addQuantity();
      }
    }
  } else {
    if (isValidFormat(files[0])) {
      await imageStore.addImage(files[0]);
      quantityStore.addQuantity();
    }
  }
};
