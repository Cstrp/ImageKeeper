import React from 'react';

export interface DropzoneProps {
  isDropped: boolean;
  handleEnter(evt: React.DragEvent): void;
  handleLeave(evt: React.DragEvent): void;
  handleDrop(evt: React.DragEvent): void;
  dropRef: React.MutableRefObject<HTMLDivElement | null>;
}
