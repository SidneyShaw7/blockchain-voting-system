import '../main.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { RegistrationForm } from '../components/RegistrationFrom';
import { LoginForm } from '../components/LoginForm';
import { MainLayout, AuthLayout } from '../components/layouts';
import { HomePage } from '../components/HomePage';
import { CreateEventForm } from '../components/CreateEventForm';
import { VotingEventInterface } from '../components/VotingEventEnterface';
import UserEvents from '../components/UserEvents/UserEvents';

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
            path="/event/create"
            element={
              <MainLayout>
                <CreateEventForm />
              </MainLayout>
            }
          />
          <Route
            path="/events/:eventId"
            element={
              <MainLayout>
                <VotingEventInterface />
              </MainLayout>
            }
          />
          <Route
            path="/events/"
            element={
              <MainLayout>
                <UserEvents />
              </MainLayout>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
