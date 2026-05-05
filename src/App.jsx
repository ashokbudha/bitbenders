import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/AdminDashboard';
import HRDashboard from './pages/HRDashboard';

// Student Routes
import { StudentProvider } from './context/StudentContext';
import StudentDashboardLayout from './components/StudentDashboardLayout';
import RoleSelectionPage from './pages/RoleSelectionPage';
import CareerExplorerPage from './pages/CareerExplorerPage';
import OverviewPage from './pages/OverviewPage';
import LearningPage from './pages/LearningPage';
import ProjectsPage from './pages/ProjectsPage';
import ProfilePage from './pages/ProfilePage';
import OpportunitiesPage from './pages/OpportunitiesPage';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />

          {/* Admin Dashboard - Protected */}
          <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
            <Route path="/admin" element={<AdminDashboard />} />
          </Route>

          {/* HR Dashboard - Protected */}
          <Route element={<ProtectedRoute allowedRoles={['hr']} />}>
            <Route path="/hr" element={<HRDashboard />} />
          </Route>

          {/* Student Dashboard - Protected */}
          <Route element={<ProtectedRoute allowedRoles={['student']} />}>
            <Route path="/dashboard" element={
              <StudentProvider>
                <StudentDashboardLayout />
              </StudentProvider>
            }>
              <Route index element={<OverviewPage />} />
              <Route path="setup" element={<RoleSelectionPage />} />
              <Route path="explore" element={<CareerExplorerPage />} />
              <Route path="learning" element={<LearningPage />} />
              <Route path="projects" element={<ProjectsPage />} />
              <Route path="opportunities" element={<OpportunitiesPage />} />
              <Route path="profile" element={<ProfilePage />} />
            </Route>
          </Route>
          
          {/* Default Redirects */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
