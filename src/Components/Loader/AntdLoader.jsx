import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import './Loader.css'; // Create a separate CSS file for styles

const AntdLoader = ({ size = 24, color='var(--primary-color)', className="" }) => {
  return (
    <div className={`loader ${className}`}>
      <LoadingOutlined style={{ fontSize: size, color }} spin />
    </div>
  );
};

export default AntdLoader;