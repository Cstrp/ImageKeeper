import { Button } from 'antd';
import { observer } from 'mobx-react';
import { ChangeEvent, useRef } from 'react';
import { imageStore, quantityStore } from '../../../data/store';
import { handleUpload } from '../../../data/utils';
import { Upload } from '../Icons/Upload';

export const UploadBtn = observer(() => {
  const fileInput = useRef<HTMLInputElement | null>(null);

  const handleChange = async (evt: ChangeEvent<HTMLInputElement>) => {
    const { files } = evt.target;

    await handleUpload(files, imageStore, quantityStore);
  };

  const handleClick = () => {
    fileInput.current?.click();
  };

  return (
    <div>
      <Button
        icon={<Upload />}
        className="flex items-center bg-[#3d293f1b] border-none p-6 "
        style={{
          color: '#000000',
        }}
        onClick={handleClick}
      >
        Upload image
      </Button>
      <input
        ref={fileInput}
        multiple
        onChange={handleChange}
        type="file"
        accept="image/*"
        hidden
      />
    </div>
  );
});
