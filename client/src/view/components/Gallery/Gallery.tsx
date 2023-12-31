import React from 'react';
import { GalleryProps } from './GalleryProps.ts';
import { GalleryItem } from '../index.ts';

export const Gallery: React.FC<GalleryProps> = ({ images }) => {
  return (
    <div className={'relative flex flex-col gap-10 mt-10'}>
      {Object.entries(images).map(([date, imageGroup]) => (
        <div key={date} className={'flex flex-col gap-7'}>
          <div className={'flex gap-5 items-center'}>
            <p className={'text-zinc-200 text-3xl font-bold leading-9'}>
              {date}
            </p>
            <div className="w-9 h-8 px-2.5 py-1 bg-emerald-200 rounded-lg flex flex-col items-center justify-center ">
              <span className="text-xl font-semibold leading-normal text-right text-white">
                {imageGroup.length}
              </span>
            </div>
          </div>
          <div
            className={
              'flex flex-col lg:flex-row flex-wrap gap-3.5 max-xl:mx-auto'
            }
          >
            {imageGroup.map((image, idx) => (
              <GalleryItem key={image.id ?? idx} image={image} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
