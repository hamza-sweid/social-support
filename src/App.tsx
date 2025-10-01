// App.tsx
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import ApplicationForm from './pages/application-form/Index';
import Navbar from './components/navbar/Navbar';
import { FormProvider } from './context/formContext/FormContext';
import { useTranslation } from 'react-i18next';
import ConfigProvider from 'antd/es/config-provider';
import './App.scss';

const App: React.FC = () => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  return (
    <ConfigProvider direction={isRTL ? 'rtl' : 'ltr'}>
      <Router>
        <Routes>
          <Route
            path="/application-form"
            element={
              <FormProvider>
                <Navbar />
                <ApplicationForm />
              </FormProvider>
            }
          />

          <Route
            path="*"
            element={<Navigate to="/application-form" replace />}
          />
        </Routes>
      </Router>
    </ConfigProvider>
  );
};

export default App;
