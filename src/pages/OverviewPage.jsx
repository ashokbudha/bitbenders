import { useStudent } from '../context/StudentContext';
import { ROADMAPS, CAPSTONE_IDEAS, ROLES } from '../data/mockData';
import { Link, Navigate } from 'react-router-dom';
import { BookOpen, Briefcase, Award, ArrowRight } from 'lucide-react';

export default function OverviewPage() {
  const { user, careerPath, completedCourses, completedProjects } = useStudent();

  if (!careerPath) {
    return <Navigate to="/dashboard/setup" replace />;
  }

  const role = ROLES.find(r => r.id === careerPath);
  const requiredCourses = ROADMAPS[careerPath] || [];
  const project = CAPSTONE_IDEAS.find(p => p.careerPath === careerPath);
  
  const courseProgress = requiredCourses.length > 0 
    ? Math.round((completedCourses.length / requiredCourses.length) * 100) 
    : 0;

  const hasCompletedProject = completedProjects.some(p => p.id === project?.id);

  return (
    <div className="animate-in fade-in duration-500">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Welcome back, {user?.displayName?.split(' ')[0] || 'Student'}! 👋</h1>
        <p className="text-slate-600">Here's your progress on the <span className="font-semibold text-indigo-600">{role?.title}</span> path.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Learning Card */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col hover:border-indigo-300 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-indigo-100 text-indigo-600 rounded-xl">
                <BookOpen className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-slate-800">Learning</h2>
            </div>
            <span className="text-sm font-bold text-indigo-600">{courseProgress}%</span>
          </div>
          
          <div className="w-full bg-slate-100 rounded-full h-2.5 mb-6">
            <div className="bg-indigo-600 h-2.5 rounded-full transition-all duration-1000" style={{ width: `${courseProgress}%` }}></div>
          </div>
          
          <p className="text-slate-600 text-sm mb-6 flex-1">
            {completedCourses.length} of {requiredCourses.length} modules completed.
          </p>

          <Link to="/dashboard/learning" className="flex items-center justify-center gap-2 w-full py-3 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold rounded-xl transition-colors">
            Continue Learning
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Projects Card */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col hover:border-indigo-300 transition-colors">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-indigo-100 text-indigo-600 rounded-xl">
              <Briefcase className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-slate-800">Capstone Project</h2>
          </div>
          
          <p className="text-slate-600 text-sm mb-6 flex-1">
            {hasCompletedProject ? (
              <span className="text-green-600 font-medium">Project completed successfully! It's now visible on your CV.</span>
            ) : courseProgress === 100 ? (
              <span className="text-amber-600 font-medium">You have unlocked your capstone project. Ready to build?</span>
            ) : (
              <span>Complete all learning modules to unlock <span className="font-semibold text-slate-800">{project?.title}</span>.</span>
            )}
          </p>

          <Link to="/dashboard/projects" className={`flex items-center justify-center gap-2 w-full py-3 font-bold rounded-xl transition-colors ${
            courseProgress === 100 && !hasCompletedProject
              ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md' 
              : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-700'
          }`}>
            View Project Workspace
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
      
      {/* Quick Achievements/Profile Prompt */}
      <div className="bg-gradient-to-r from-indigo-900 to-slate-900 p-8 rounded-3xl text-white shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 text-white/5">
          <Award className="w-48 h-48" />
        </div>
        <div className="relative z-10 md:w-2/3">
          <h3 className="text-2xl font-bold mb-2">Build Your Professional CV</h3>
          <p className="text-indigo-100 mb-6">
            Every course module you complete and every project you build is automatically added to your profile, making you job-ready for companies.
          </p>
          <Link to="/dashboard/profile" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-indigo-900 hover:bg-indigo-50 font-bold rounded-xl transition-colors">
            View My CV
          </Link>
        </div>
      </div>
    </div>
  );
}
