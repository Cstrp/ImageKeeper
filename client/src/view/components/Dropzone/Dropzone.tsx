import React from 'react';
import { Upload } from '../Icons/Upload';

interface DropzoneProps {
  isDropped: boolean;
  handleEnter(evt: React.DragEvent): void;
  handleLeave(evt: React.DragEvent): void;
  handleDrop(evt: React.DragEvent): void;
  dropRef: React.MutableRefObject<HTMLDivElement | null>;
}

export const DropZone: React.FC<DropzoneProps> = ({
  isDropped,
  dropRef,
  handleLeave,
  handleEnter,
  handleDrop,
}) => {
  return (
    <>
      <div
        ref={dropRef}
        className={`w-full h-full fixed inset-0 flex items-center justify-center backdrop-blur ${
          isDropped ? '' : 'hidden'
        }`}
        onDrop={handleDrop}
        onDragEnter={handleEnter}
        onDragLeave={handleLeave}
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
