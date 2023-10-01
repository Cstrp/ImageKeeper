import { Logo } from '../Logo/Logo';
import { UploadBtn } from '../UploadBtn/UploadBtn.tsx';

interface HeaderProps {
  quantity: number;
}

export const Header = ({ quantity }: HeaderProps) => {
  return (
    <header className={''}>
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
