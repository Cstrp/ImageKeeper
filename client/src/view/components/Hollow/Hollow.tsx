import { Logo } from '../Logo/Logo.tsx';
import { UploadBtn } from '../UploadBtn/UploadBtn.tsx';

export const Hollow = () => {
  return (
    <>
      <div className={'w-full h-[100vh]'}>
        <div className="flex flex-col items-center justify-center h-full gap-10 mx-auto ">
          <Logo />
          <div className="flex flex-col gap-3">
            <p className="text-4xl font-bold leading-10 text-zinc-700">
              No images uploaded yet
            </p>
            <p className="max-w-[400px] text-center text-gray-400 text-base font-normal leading-5">
              Upload your first image by drag and dropping the file on the
              screen or click the button below
            </p>
          </div>
          <UploadBtn />
        </div>
      </div>
    </>
  );
};
