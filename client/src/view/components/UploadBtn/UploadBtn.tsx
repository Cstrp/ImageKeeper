import { Button } from 'antd';
import { observer } from 'mobx-react';
import { ChangeEvent, useRef } from 'react';
import { imageStore } from '../../../data/store/imageStore';
import { quantityStore } from '../../../data/store/quantity.Store';
import { isValidFormat } from '../../../data/utils/isValidFormat';
import { Upload } from '../Icons/Upload';

export const UploadBtn = observer(() => {
  const fileInput = useRef<HTMLInputElement | null>(null);

  const handleChange = async (evt: ChangeEvent<HTMLInputElement>) => {
    const files = evt.target.files;

    if (Array.isArray(files) || files!.length) {
      for (const file of files!) {
        if (isValidFormat(file)) await imageStore.addImage(file!);
      }
    } else {
      if (isValidFormat(files![0])) await imageStore.addImage(files![0]);
    }

    const len = Object.keys(imageStore.getImages).length;
    quantityStore.setQuantity(len);
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
