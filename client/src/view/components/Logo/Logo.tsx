import { LeftRightArrow } from '../Icons/LeftRightArrow.tsx';

export const Logo = () => {
  return (
    <div className={'flex items-center gap-2'}>
      <strong className={'lg:text-2xl text-zinc-900'}>Image</strong>
      <LeftRightArrow />
      <strong className={'lg:text-2xl text-zinc-900'}>Keeper</strong>
    </div>
  );
};
