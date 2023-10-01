import { notification } from 'antd';

interface Notify {
  type: 'success' | 'info' | 'warning' | 'error';
  message: string;
  description: string;
}

export const notify = ({ type, message, description }: Notify) => {
  notification.config({
    duration: 5,
    closeIcon: false,
    maxCount: 3,
    placement: 'bottomRight',
  });

  notification[type]({ message, description, icon: false });
};
