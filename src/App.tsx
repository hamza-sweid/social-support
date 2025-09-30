import './App.scss';
import Navbar from './components/navbar/Navbar';
import ApplicationForm from './pages/application-form/Index';

function App() {
  return (
    <div className="app">
      <Navbar />
      <main className="main-content">
        <ApplicationForm />
      </main>
    </div>
  );
}

export default App;
