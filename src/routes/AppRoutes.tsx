import { Routes, Route, Navigate } from 'react-router-dom';
import ApplicationForm from '../pages/application-form/Index';
import UserData from '../pages/user-data/Index';
import ErrorBoundary from '../components/error-boundary/ErrorBoundary';

const AppRouter = () => (
  <Routes>
    <Route
      path="/application-form"
      element={
        <ErrorBoundary>
          <ApplicationForm />
        </ErrorBoundary>
      }
    />
    <Route path="/user-data" element={<UserData />} />
    <Route path="*" element={<Navigate to="/application-form" replace />} />
  </Routes>
);

export default AppRouter;
