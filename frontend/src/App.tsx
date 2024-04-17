import './main.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { RegistrationForm } from './components/RegistrationFrom/index';
import LoginForm from './components/LogInForm/LogInForm';
import MainManu from './components/MainMenu/MainMenu';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<RegistrationForm />} />
          <Route path="/log-in" element={<LoginForm />} />
          <Route path="/main-menu" element={<MainManu />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
