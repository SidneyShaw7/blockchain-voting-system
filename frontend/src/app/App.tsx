import '../main.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { RegistrationForm } from '../components/RegistrationFrom';
import { LoginForm } from '../components/LoginForm';
import { MainLayout, AuthLayout } from '../components/layouts';
import { HomePage } from '../components/HomePage';
import { CreateEventForm } from '../components/CreateEventForm';
import { VotingEventInterface } from '../components/VotingEventEnterface';
import { UserEvents } from '../components/UserEvents';
import { PrivateRoute } from '../components/PrivateRoute';
import { SettingsPage } from '../components/SettingsPage';

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

          <Route element={<PrivateRoute redirectTo="/login" />}>
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
              path="/events"
              element={
                <MainLayout>
                  <UserEvents />
                </MainLayout>
              }
            />
            <Route
              path="/profile"
              element={
                <MainLayout>
                  <SettingsPage />
                </MainLayout>
              }
            />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
