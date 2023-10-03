import { useState } from 'react';
import { Logo } from '../Logo/Logo.tsx';
import { UploadBtn } from '../UploadBtn/UploadBtn.tsx';

export const Hollow = () => {
  const [isDropped, setIsDropped] = useState<boolean>(false);

  return (
    <>
      <div
        className={`flex flex-col items-center justify-center gap-10 w-full h-[95vh] `}
      >
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
      {/* <DropZone /> */}
    </>
  );
};
