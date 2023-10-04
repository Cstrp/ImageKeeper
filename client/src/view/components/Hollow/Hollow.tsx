import { Logo } from '../Logo/Logo.tsx';
import { UploadBtn } from '../UploadBtn/UploadBtn.tsx';
import React, { useRef, useState } from 'react';
import { DropZone } from '../Dropzone/Dropzone.tsx';
import { handleUpload } from '../../../data/utils';
import { imageStore, quantityStore } from '../../../data/store';
import { observer } from 'mobx-react';

export const Hollow = observer(() => {
  const [isDragged, setIsDragged] = useState<boolean>(false);
  const dropRef = useRef<HTMLDivElement | null>(null);

  const handleEnter = (evt: React.DragEvent) => {
    evt.preventDefault();

    if (dropRef.current) {
      setIsDragged(true);
    }
  };

  const handleLeave = (evt: React.DragEvent) => {
    evt.preventDefault();

    if (!dropRef.current?.contains(evt.relatedTarget as Node)) {
      setIsDragged(false);
    }
  };

  const handleDrop = async (evt: React.DragEvent) => {
    evt.preventDefault();

    const { files } = evt.dataTransfer;

    await handleUpload(files, imageStore, quantityStore);
  };

  return (
    <div
      className={'w-full h-[100vh]'}
      ref={dropRef}
      onDragEnter={handleEnter}
      onDragLeave={handleLeave}
    >
      <div className="flex flex-col items-center justify-center h-full gap-10 mx-auto">
        <Logo />
        <div className="flex flex-col gap-3">
          <p className="text-4xl font-bold leading-10 text-zinc-700">
            No images uploaded yet
          </p>
          <p className="max-w-[400px] text-center text-gray-400 text-base font-normal leading-5">
            Upload your first image by drag and dropping the file on the screen
            or click the button below
          </p>
        </div>
        <UploadBtn />
      </div>
      <DropZone
        isDropped={isDragged}
        handleDrop={handleDrop}
        dropRef={dropRef}
        handleEnter={handleEnter}
        handleLeave={handleLeave}
      />
    </div>
  );
});
