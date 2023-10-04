import saveAs from 'file-saver';
import { observer } from 'mobx-react';
import * as React from 'react';
import { useState } from 'react';
import { imageStore, quantityStore } from '../../../data/store';
import { Image } from '../../../data/types';
import { momentFormat } from '../../../data/utils';
import { ImageEditor } from '../ImageEditor/ImageEditor.tsx';
import { ItemActions } from './ItemActions.tsx';

interface GalleryItemProps {
  image: Image;
}

export const GalleryItem: React.FC<GalleryItemProps> = observer(({ image }) => {
  const [open, setOpen] = useState<boolean>(false);

  const handleDownload = () => {
    if (image.url) {
      saveAs(image.url, image.url.split('/').pop());
    }
  };

  const handleEdit = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    imageStore.removeImage(image.id!);
    quantityStore.removeQuantity();
  };

  return (
    <div className={'relative max-w-md max-xl:mx-auto max-h-96'}>
      <div className={'absolute bg-[#FCF6B1] p-1.5 rounded-md right-3 -top-4'}>
        <span
          className={
            'text-zinc-700 text-xs font-normal break-words block max-w-[200px]'
          }
        >
          {image.label ? image.label : momentFormat(image.created_at!)}
        </span>
      </div>
      <img
        src={image.url}
        alt={image.label}
        className={'w-full lg:max-w-[335px] rounded-lg z-10'}
      />

      <div>
        <ItemActions
          handleDelete={handleDelete}
          handleDownload={handleDownload}
          handleEdit={handleEdit}
        />
        <ImageEditor image={image} isOpen={open} handleCancel={handleCancel} />
      </div>
    </div>
  );
});
