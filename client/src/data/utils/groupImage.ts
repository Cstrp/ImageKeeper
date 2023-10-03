import { Image } from '../types';
import moment from 'moment';

export const groupImage = (images: Image[]) => {
  const groupedImages: Record<string, Image[]> = {};

  images.forEach((image) => {
    const key = moment(image.created_at!).format("MMMM ' D");

    if (!groupedImages[key]) {
      groupedImages[key] = [];
    }

    groupedImages[key].push(image);
  });

  return groupedImages;
};
