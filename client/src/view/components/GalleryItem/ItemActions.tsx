import { Actions } from '../../../data';
import * as React from 'react';
import { Button } from 'antd';
import {
  DeleteOutlined,
  DownloadOutlined,
  EditOutlined,
} from '@ant-design/icons';

export const ItemActions: React.FC<Actions> = ({
  handleDelete,
  handleDownload,
  handleEdit,
}) => {
  const buttons = [
    { text: 'Download', icon: <DownloadOutlined />, onClick: handleDownload },
    { text: 'Edit label', icon: <EditOutlined />, onClick: handleEdit },
    { text: 'Delete', icon: <DeleteOutlined />, onClick: handleDelete },
  ];

  return (
    <div className={' absolute bottom-3 left-2'}>
      <div className={'flex flex-col items-start gap-0.5'}>
        {buttons.map((button, idx) => (
          <Button
            size="small"
            type="text"
            key={idx}
            className={'action text-lg border-none text-[#FCF6B1]'}
            icon={button.icon}
            onClick={button.onClick}
          >
            {button.text}
          </Button>
        ))}
      </div>
    </div>
  );
};
