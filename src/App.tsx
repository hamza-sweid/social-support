import React from 'react';
import { HashRouter as Router } from 'react-router-dom'; // <-- change here
import { useTranslation } from 'react-i18next';
import ConfigProvider from 'antd/es/config-provider';
import AppRouter from './routes/AppRoutes';
import './App.scss';

const App: React.FC = () => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  return (
    <ConfigProvider direction={isRTL ? 'rtl' : 'ltr'}>
      <Router>
        <AppRouter />
      </Router>
    </ConfigProvider>
  );
};

export default App;
