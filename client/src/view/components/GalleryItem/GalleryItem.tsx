import { Image } from '../../../data/types';

interface GalleryItemProps {
  image: Image;
}

export const GalleryItem = ({ image }: GalleryItemProps) => {
  return <div>{image.id}</div>;
};
