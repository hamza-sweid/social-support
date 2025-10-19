import React from 'react';
import { Spin } from 'antd';
import styles from './ApplicationSpinner.module.scss';

interface ApplicationSpinnerProps {
  loading: boolean;
}

const ApplicationSpinner: React.FC<ApplicationSpinnerProps> = ({ loading }) => {
  if (!loading) return null;

  return (
    <div className={styles.overlay}>
      <Spin size="large" />
    </div>
  );
};

export default ApplicationSpinner;
