import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import RoleSelectionPage from './pages/RoleSelectionPage';
import LearningRoadmapPage from './pages/LearningRoadmapPage';
import ProjectWorkspacePage from './pages/ProjectWorkspacePage';
import ReadinessPage from './pages/ReadinessPage';
import JobBoardPage from './pages/JobBoardPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<RoleSelectionPage />} />
          <Route path="roadmap" element={<LearningRoadmapPage />} />
          <Route path="project" element={<ProjectWorkspacePage />} />
          <Route path="readiness" element={<ReadinessPage />} />
          <Route path="jobs" element={<JobBoardPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
