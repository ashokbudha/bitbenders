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
        <h1 className="text-3xl font-extrabold text-brand-black mb-2">Welcome back, {user?.displayName?.split(' ')[0] || 'Student'}! 👋</h1>
        <p className="text-brand-gray">Here's your progress on the <span className="font-semibold text-brand-green">{role?.title}</span> path.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Learning Card */}
        <div className="bg-brand-white p-6 rounded-2xl border border-brand-gray/20 shadow-sm flex flex-col hover:border-indigo-300 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-indigo-100 text-brand-green rounded-xl">
                <BookOpen className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-brand-black">Learning</h2>
            </div>
            <span className="text-sm font-bold text-brand-green">{courseProgress}%</span>
          </div>
          
          <div className="w-full bg-brand-gray/10 rounded-full h-2.5 mb-6">
            <div className="bg-brand-green h-2.5 rounded-full transition-all duration-1000" style={{ width: `${courseProgress}%` }}></div>
          </div>
          
          <p className="text-brand-gray text-sm mb-6 flex-1">
            {completedCourses.length} of {requiredCourses.length} modules completed.
          </p>

          <Link to="/dashboard/learning" className="flex items-center justify-center gap-2 w-full py-3 bg-brand-green/10 hover:bg-indigo-100 text-brand-green/90 font-bold rounded-xl transition-colors">
            Continue Learning
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Projects Card */}
        <div className="bg-brand-white p-6 rounded-2xl border border-brand-gray/20 shadow-sm flex flex-col hover:border-indigo-300 transition-colors">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-indigo-100 text-brand-green rounded-xl">
              <Briefcase className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-brand-black">Capstone Project</h2>
          </div>
          
          <p className="text-brand-gray text-sm mb-6 flex-1">
            {hasCompletedProject ? (
              <span className="text-green-600 font-medium">Project completed successfully! It's now visible on your CV.</span>
            ) : courseProgress === 100 ? (
              <span className="text-brand-green font-medium">You have unlocked your capstone project. Ready to build?</span>
            ) : (
              <span>Complete all learning modules to unlock <span className="font-semibold text-brand-black">{project?.title}</span>.</span>
            )}
          </p>

          <Link to="/dashboard/projects" className={`flex items-center justify-center gap-2 w-full py-3 font-bold rounded-xl transition-colors ${
            courseProgress === 100 && !hasCompletedProject
              ? 'bg-brand-green hover:bg-brand-green/90 text-brand-white shadow-md' 
              : 'bg-brand-green/10 hover:bg-indigo-100 text-brand-green/90'
          }`}>
            View Project Workspace
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
      
      {/* Quick Achievements/Profile Prompt */}
      <div className="bg-gradient-to-r from-indigo-900 to-brand-black p-8 rounded-3xl text-brand-white shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 text-brand-white/5">
          <Award className="w-48 h-48" />
        </div>
        <div className="relative z-10 md:w-2/3">
          <h3 className="text-2xl font-bold mb-2">Build Your Professional CV</h3>
          <p className="text-indigo-100 mb-6">
            Every course module you complete and every project you build is automatically added to your profile, making you job-ready for companies.
          </p>
          <Link to="/dashboard/profile" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand-white text-indigo-900 hover:bg-brand-green/10 font-bold rounded-xl transition-colors">
            View My CV
          </Link>
        </div>
      </div>
    </div>
  );
}
