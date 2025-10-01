import './App.scss';
import Navbar from './components/navbar/Navbar';
import { FormProvider } from './context/formContext/FormContext';
import ApplicationForm from './pages/application-form/Index';

function App() {
  return (
    <div className="app">
      <Navbar />
      <FormProvider>
        <main className="main-content">
          <ApplicationForm />
        </main>
      </FormProvider>
    </div>
  );
}

export default App;
