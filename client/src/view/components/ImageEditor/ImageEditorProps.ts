import { Image } from '../../../data';

export interface ImageEditorProps {
  image: Image;
  isOpen: boolean;
  handleCancel: () => void;
}
