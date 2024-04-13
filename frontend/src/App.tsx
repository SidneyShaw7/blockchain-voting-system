import './main.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { RegistrationForm } from './components/RegistrationFrom/index';
import LoginForm from './components/LogInForm/LogInForm';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<RegistrationForm />} />
          <Route path="/log-in" element={<LoginForm />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
