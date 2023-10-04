import { getAllImages, imageStore, quantityStore } from './data';
import { Gallery, Header, Hollow } from './view';
import { observer } from 'mobx-react';
import { useEffect } from 'react';

export const App = observer(() => {
  const { quantity } = quantityStore;

  useEffect(() => {
    getAllImages().then((loadedImages) => {
      if (loadedImages) {
        imageStore.setImages(loadedImages);
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
