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
import { ProfilePage } from '../components/ProfilePage';
import { OrganizationPage } from '../components/OrganizationPage';
import { WelcomePage } from '../components/WelcomePage';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route
            path="/register"
            element={
              <AuthLayout>
                <RegistrationForm />
              </AuthLayout>
            }
          />
          <Route
            path="/"
            element={
              <AuthLayout>
                <WelcomePage />
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
                  <ProfilePage />
                </MainLayout>
              }
            />
            <Route
              path="/organizations"
              element={
                <MainLayout>
                  <OrganizationPage />
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
