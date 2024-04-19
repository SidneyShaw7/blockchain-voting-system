import './main.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { RegistrationForm } from './components/RegistrationFrom/index';
import LoginForm from './components/LogInForm/LogInForm';
import MainLayout from './components/MainLayout/MainLayout';
import HomePage from './components/MainMenu/HomePage';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          {/* <Route path="/" element={<RegistrationForm />} />
          <Route path="/log-in" element={<LoginForm />} /> */}
          <Route
            path="/"
            element={
              <MainLayout>
                <HomePage />
              </MainLayout>
            }
          />
          <Route
            path="/register"
            element={
              <MainLayout>
                <RegistrationForm />
              </MainLayout>
            }
          />
          <Route
            path="/log-in"
            element={
              <MainLayout>
                <LoginForm />
              </MainLayout>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
