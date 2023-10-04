import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { ImageEditorProps } from './ImageEditorProps.ts';
import { CheckOutlined } from '@ant-design/icons';
import { imageStore } from '../../../data';
import { observer } from 'mobx-react';
import { Button } from 'antd';

export const ImageEditor = observer(
  ({ image, isOpen, handleCancel }: ImageEditorProps) => {
    const [newLabel, setNewLabel] = useState<string>('');
    const windowRef = useRef<HTMLDivElement | null>(null);
    const btnRef = useRef<HTMLButtonElement | null>(null);

    const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
      const value = evt.target.value;
      const regex = /^[a-z Z-a|0-9]{0,100}$/i;

      if (regex.test(value)) {
        setNewLabel(value);
      }
    };

    const handleOk = () => {
      const { id } = image;

      if (id) {
        imageStore.updateLabel(id, newLabel);
        handleCancel();
      }
    };

    const handeKeydown = (evt: KeyboardEvent) => {
      if (evt.key === 'Escape') {
        handleCancel();
      }

      if (evt.key === 'Enter') {
        btnRef.current?.click();
      }
    };

    const handleClick = (evt: MouseEvent) => {
      if (
        windowRef.current &&
        !windowRef.current.contains(evt.target as Node)
      ) {
        handleCancel();
      }
    };

    useEffect(() => {
      if (isOpen) {
        document.addEventListener('mousedown', handleClick);
        document.addEventListener('keydown', handeKeydown);
      }

      return () => {
        document.removeEventListener('mousedown', handleClick);
        document.removeEventListener('keydown', handeKeydown);
      };
    }, [handleCancel, isOpen]);

    return (
      <>
        {isOpen && (
          <div
            className={`${
              isOpen ? 'fadeIn' : ''
            } fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm modal transition-opacity transform duration-300`}
            style={{ animationFillMode: isOpen ? 'forwards' : '' }}
          >
            <div className="p-6 " ref={windowRef}>
              <button
                onClick={handleCancel}
                className="absolute flex items-center gap-2 font-normal transition-opacity top-11 right-10 hover:opacity-75 text-zinc-700 text-md"
              >
                <span className="-mt-1 text-3xl">&times;</span> Close editor
              </button>
              <div className="flex flex-col items-center gap-7">
                <p className="text-3xl font-semibold leading-7 text-center text-zinc-700">
                  Set custom label
                </p>
                <img
                  src={image.url}
                  alt={image.label}
                  className="object-contain w-full rounded-sm max-h-96"
                />
                <div className="flex flex-col items-center gap-3">
                  <div className="flex flex-col items-center gap-3">
                    <input
                      className="text-lg text-center bg-transparent focus:outline-none"
                      placeholder="Enter custom label"
                      onChange={handleChange}
                    />

                    <span className="text-xs font-normal leading-none text-center text-gray-400">
                      100 chars max
                    </span>
                  </div>
                  <Button
                    ref={btnRef}
                    type="text"
                    onClick={handleOk}
                    icon={<CheckOutlined />}
                    className="flex items-center"
                  >
                    Save
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  },
);
