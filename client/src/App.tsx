import { useEffect, useState } from 'react';
import { Image } from './data/types';
import { getAllImages } from './data/api/getAllImages.ts';

export const App = () => {
  const [imageList, setImageList] = useState<Image[]>([]);

  useEffect(() => {
    getAllImages().then((images) => setImageList(images!));
  }, []);

  console.log(imageList);

  return <div className={''}></div>;
};
