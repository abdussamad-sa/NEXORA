import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './routes/Login';
import Signup from './routes/Signup';
import ForgotPassword from './routes/ForgotPassword';
import ResetPassword from './routes/ResetPassword';
import DashboardLayout from './routes/Dashboard/DashboardLayout';
import Overview from './routes/Dashboard/Overview';
import Projects from './routes/Dashboard/Projects';
import Tasks from './routes/Dashboard/Tasks';
import Skills from './routes/Dashboard/Skills';
import Analytics from './routes/Dashboard/Analytics';
import Profile from './routes/Dashboard/Profile';
import Settings from './routes/Dashboard/Settings';

const App = () => {
  return (
    <AuthProvider>
      <DataProvider>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Protected routes */}
          <Route element={<ProtectedRoute />}> {/* wrapper */}
            <Route path="/" element={<DashboardLayout />}> {/* layout with sidebar */}
              <Route index element={<Overview />} />
              <Route path="projects" element={<Projects />} />
              <Route path="tasks" element={<Tasks />} />
              <Route path="skills" element={<Skills />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="profile" element={<Profile />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </DataProvider>
    </AuthProvider>
  );
};

export default App;
