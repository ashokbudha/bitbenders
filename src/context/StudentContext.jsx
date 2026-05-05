import { createContext, useContext, useState } from 'react';
import { useAuth } from './AuthContext';

const StudentContext = createContext();

export const useStudent = () => useContext(StudentContext);

export const StudentProvider = ({ children }) => {
  const { user } = useAuth(); // Now pulling from the secure JWT auth context
  
  const [careerPath, setCareerPath] = useState(localStorage.getItem('student_career_path') || null);
  
  const [completedCourses, setCompletedCourses] = useState(() => {
    const saved = localStorage.getItem('student_completed_courses');
    return saved ? JSON.parse(saved) : [];
  });

  const [completedProjects, setCompletedProjects] = useState(() => {
    const saved = localStorage.getItem('student_completed_projects');
    return saved ? JSON.parse(saved) : [];
  });

  // Update Firestore/Database-equivalent data
  // In a real implementation, these would make API calls using the `api` axios instance
  const completeCourse = (courseId) => {
    if (!completedCourses.includes(courseId)) {
      const updated = [...completedCourses, courseId];
      setCompletedCourses(updated);
      localStorage.setItem('student_completed_courses', JSON.stringify(updated));
    }
  };

  const completeProject = (projectId, link, reflection) => {
    const updated = [...completedProjects, { id: projectId, link, reflection, date: new Date().toISOString() }];
    setCompletedProjects(updated);
    localStorage.setItem('student_completed_projects', JSON.stringify(updated));
  };

  const updateCareerPath = (pathId) => {
    setCareerPath(pathId);
    localStorage.setItem('student_career_path', pathId);
  };

  return (
    <StudentContext.Provider value={{
      user, // Passed down for components expecting it from StudentContext
      careerPath, 
      updateCareerPath, 
      completedCourses, 
      completeCourse, 
      completedProjects, 
      completeProject
    }}>
      {children}
    </StudentContext.Provider>
  );
};

