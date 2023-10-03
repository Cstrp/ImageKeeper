import React from 'react';
import { Logo } from '../Logo/Logo';
import { UploadBtn } from '../UploadBtn/UploadBtn.tsx';
import { HeaderProps } from './HeaderProps.ts';

export const Header: React.FC<HeaderProps> = ({ quantity }) => {
  return (
    <header className={'mt-5 flex items-center'}>
      <div className={'container mx-auto flex items-center'}>
        <div className={'flex flex-col gap-7'}>
          <Logo />
          <p>{quantity} images stored in keeper</p>
        </div>
        <div className={'flex-grow'} />
        <UploadBtn />
      </div>
    </header>
  );
};
