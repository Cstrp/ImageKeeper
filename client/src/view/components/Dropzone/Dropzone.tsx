import React from 'react';
import { Upload } from '../Icons/Upload';

interface DropzoneProps {}

export const DropZone: React.FC<DropzoneProps> = () => {
  return (
    <>
      <div
        className={`fixed inset-0 flex items-center justify-center backdrop-blur`}
      >
        <div>
          <div className="flex flex-col items-center justify-center gap-5">
            <Upload color="#A9E5BB" />
            <p className="text-3xl font-bold leading-8 text-zinc-700">
              Upload file
            </p>
            <p className="w-[400px] text-center text-gray-400 text-sm leading-5">
              Drop your file here to start uploading
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
