import { imageStore, momentFormat, quantityStore } from '../../../data';
import { ImageEditor } from '../ImageEditor/ImageEditor.tsx';
import { GalleryItemProps } from './GalleryItemProps.ts';
import { ItemActions } from './ItemActions.tsx';
import * as React from 'react';
import { useRef, useState } from 'react';
import { observer } from 'mobx-react';
import saveAs from 'file-saver';

export const GalleryItem: React.FC<GalleryItemProps> = observer(({ image }) => {
  const [open, setOpen] = useState<boolean>(false);
  const container = useRef<HTMLDivElement | null>(null);
  const clientWidth = container.current?.clientWidth;
  const showPreview = !image.url && imageStore.uploading;

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
    <div
      className={`relative max-w-md max-xl:mx-auto max-h-96`}
      ref={container}
    >
      <div
        className={'absolute bg-[#FCF6B1] p-1.5 rounded-md right-3 -top-4 z-10'}
      >
        {!image.label && image.created_at ? (
          <span
            className={
              'text-zinc-700 text-xs font-normal break-words block max-w-[200px] '
            }
          >
            {momentFormat(image.created_at)}
          </span>
        ) : (
          <span
            className={
              'text-zinc-700 text-xs font-normal break-words block max-w-[200px] '
            }
          >
            {image.label}
          </span>
        )}
      </div>

      {showPreview && (
        <div
          className="max-w-md absolute inset-0 flex items-center justify-center text-white font-semibold bg-gray-100 z-10 h-full"
          style={{
            width: `${(clientWidth! * imageStore.progress) / 100}px`,
          }}
        />
      )}

      {showPreview && (
        <div
          className={
            'absolute inset-0 flex items-center justify-center text-white font-semibold'
          }
        >
          <div className="relative w-full">
            <div className="w-full absolute inset-0 flex flex-col items-center justify-center text-white font-semibold">
              <span
                className={'text-zinc-700 text-lg font-semibold leading-normal'}
              >
                Uploading
              </span>
              <span
                className={'text-gray-400 text-xs font-normal leading-none'}
              >
                {imageStore.getUploadProgress()}
              </span>
            </div>
          </div>
        </div>
      )}

      <img
        src={showPreview ? image.preview : image.url}
        alt={image.label}
        className={'w-full lg:max-w-[335px] rounded-lg z-10'}
      />

      {image && (
        <ItemActions
          handleDelete={handleDelete}
          handleDownload={handleDownload}
          handleEdit={handleEdit}
        />
      )}
      <ImageEditor image={image} isOpen={open} handleCancel={handleCancel} />
    </div>
  );
});
