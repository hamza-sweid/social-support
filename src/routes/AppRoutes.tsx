import { Routes, Route, Navigate } from 'react-router-dom';
import ApplicationForm from '../pages/application-form/Index';
import Navbar from '../components/navbar/Navbar';
import { FormProvider } from '../context/formContext/FormContext';

const AppRouter = () => (
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
);

export default AppRouter;
