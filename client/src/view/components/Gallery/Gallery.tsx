import { Image } from '../../../data/types';
import { GalleryItem } from '../GalleryItem/GalleryItem.tsx';

interface GalleryProps {
  images: Image[];
}

export const Gallery = ({ images }: GalleryProps) => {
  return (
    <>
      {images.map((image) => (
        <div key={image.id}>
          <GalleryItem image={image} />
        </div>
      ))}
    </>
  );
};
