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

const App: React.FC = () => {
  return (
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

        <Route path="*" element={<Navigate to="/application-form" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
