import '../main.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { RegistrationForm } from '../components/RegistrationFrom';
import { LoginForm } from '../components/LoginForm';
import { MainLayout } from '../components/MainLayout';
import { AuthLayout } from '../components/AuthLayout';
import { HomePage } from '../components/HomePage';
import { EventCreationForm } from '../components/EventCreationForm';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <AuthLayout>
                <RegistrationForm />
              </AuthLayout>
            }
          />
          <Route
            path="/login"
            element={
              <AuthLayout>
                <LoginForm />
              </AuthLayout>
            }
          />
          <Route
            path="/home"
            element={
              <MainLayout>
                <HomePage />
              </MainLayout>
            }
          />
          <Route
            path="/createevent"
            element={
              <MainLayout>
                <EventCreationForm />
              </MainLayout>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
