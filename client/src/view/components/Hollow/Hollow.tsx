import { Logo } from '../Logo/Logo.tsx';
import { UploadBtn } from '../UploadBtn/UploadBtn.tsx';

export const Hollow = () => {
  return (
    <div>
      <Logo />

      <div>
        <p>No images uploaded yet</p>
        <p>
          Upload your first image by drag and dropping the file on the screen or
          click the button below
        </p>
      </div>

      <UploadBtn />
    </div>
  );
};
