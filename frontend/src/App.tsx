import './main.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { RegistrationForm } from './components/RegistrationFrom';
import { LoginForm } from './components/LoginForm';
import { MainLayout } from './components/MainLayout';
import { HomePage } from './components/HomePage';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          {/* <Route path="/" element={<RegistrationForm />} />
          <Route path="/log-in" element={<LoginForm />} /> */}
          <Route
            path="/home"
            element={
              <MainLayout>
                <HomePage />
              </MainLayout>
            }
          />
          <Route
            path="/"
            element={
              <MainLayout>
                <RegistrationForm />
              </MainLayout>
            }
          />
          <Route
            path="/login"
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
