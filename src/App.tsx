import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ConfigProvider from 'antd/es/config-provider';
import AppRouter from './routes/AppRoutes';
import './App.scss';
import Navbar from './components/navbar/Navbar';
import { ThemeProvider } from './context/theme-context/ThemeContext';
import Footer from './components/footer/Footer';

const App: React.FC = () => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  return (
    <ConfigProvider direction={isRTL ? 'rtl' : 'ltr'}>
      <ThemeProvider>
        <Navbar />
        <main className="main">
          <Router>
            <AppRouter />
          </Router>
        </main>
        <Footer />
      </ThemeProvider>
    </ConfigProvider>
  );
};

export default App;
