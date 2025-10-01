import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import ApplicationForm from '../pages/application-form/Index';

const AppRouter = () => (
  <Router>
    <Routes>
      <Route path="/application-form" element={<ApplicationForm />} />

      <Route path="*" element={<Navigate to="/application-form" replace />} />
    </Routes>
  </Router>
);

export default AppRouter;
