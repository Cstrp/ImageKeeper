import { observer } from 'mobx-react';
import { imageStore, quantityStore } from './data/store';
import { Gallery, Header, Hollow } from './view';
import { useEffect } from 'react';
import { getAllImages } from './data/api/getAllImages.ts';

export const App = observer(() => {
  const { quantity } = quantityStore;

  useEffect(() => {
    getAllImages().then((loadedImages) => {
      if (loadedImages) {
        imageStore.setImages(loadedImages!);
        quantityStore.setQuantity(imageStore.getImagesLength());
      }
    });
  }, []);

  return (
    <div className={'relative flex flex-col max-h-[100vh]'}>
      {quantity ? <Header quantity={quantity} /> : null}
      <div className={'container mx-auto'}>
        {quantity ? <Gallery images={imageStore.getImages()} /> : <Hollow />}
      </div>
    </div>
  );
});
