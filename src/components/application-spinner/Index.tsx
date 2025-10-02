import React from 'react';
import { Spin } from 'antd';
import styles from './Index.module.scss';

interface ApplicationLoaderProps {
  loading: boolean;
}

const ApplicationLoader: React.FC<ApplicationLoaderProps> = ({ loading }) => {
  if (!loading) return null;

  return (
    <div className={styles.overlay}>
      <Spin size="large" />
    </div>
  );
};

export default ApplicationLoader;
