import { useStudent } from '../context/StudentContext';
import { PROJECTS, ROADMAPS } from '../data/mockData';
import { Lock, Unlock, CheckCircle } from 'lucide-react';
import { useState } from 'react';

export default function ProjectsPage() {
  const { careerPath, completedCourses, completedProjects, completeProject } = useStudent();
  const [link, setLink] = useState('');
  
  if (!careerPath) return <div className="p-8 text-center text-slate-500">Please select a career path first.</div>;
  
  // Find project
  const project = PROJECTS[careerPath];
  const requiredCourses = ROADMAPS[careerPath] || [];
  
  // Critical Gating Logic
  const hasCompletedAllCourses = requiredCourses.every(c => completedCourses.includes(c.id));
  const hasSubmittedProject = completedProjects.some(p => p.id === project.id);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (link.trim()) {
      completeProject(project.id, link, "Completed via Dashboard");
      setLink('');
    }
  };

  return (
    <div className="animate-in fade-in duration-500">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Projects</h1>
        <p className="text-slate-600">Build real-world projects to validate your skills.</p>
      </div>

      <div className={`relative overflow-hidden rounded-3xl border-2 p-8 ${
        hasCompletedAllCourses ? 'bg-white border-indigo-200 shadow-lg' : 'bg-slate-50 border-slate-200'
      }`}>
        
        {/* Lock Overlay */}
        {!hasCompletedAllCourses && (
          <div className="absolute inset-0 bg-slate-900/5 backdrop-blur-sm flex flex-col items-center justify-center z-10">
            <div className="bg-white p-6 rounded-2xl shadow-xl flex flex-col items-center max-w-sm text-center border border-slate-200">
              <div className="bg-rose-100 p-4 rounded-full mb-4">
                <Lock className="w-8 h-8 text-rose-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Project Locked</h3>
              <p className="text-slate-600 text-sm mb-4">
                You must complete all {requiredCourses.length} learning modules before you can access this project.
              </p>
              <div className="w-full bg-slate-100 rounded-lg p-3 text-left">
                <p className="text-xs font-bold uppercase text-slate-500 mb-2">Missing prerequisites:</p>
                <ul className="text-sm space-y-1">
                  {requiredCourses.filter(c => !completedCourses.includes(c.id)).map(c => (
                    <li key={c.id} className="text-rose-600 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                      {c.title}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        <div className={!hasCompletedAllCourses ? 'opacity-40 pointer-events-none blur-sm transition-all' : ''}>
          <div className="flex items-center gap-3 mb-6">
            <div className={`p-3 rounded-xl ${hasSubmittedProject ? 'bg-green-100 text-green-600' : 'bg-indigo-100 text-indigo-600'}`}>
              {hasSubmittedProject ? <CheckCircle className="w-6 h-6" /> : <Unlock className="w-6 h-6" />}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">{project.title}</h2>
              <span className="text-sm font-semibold text-slate-500">Capstone Project</span>
            </div>
          </div>

          <div className="bg-slate-50 p-6 rounded-2xl mb-8 border border-slate-200">
            <h3 className="font-bold text-slate-800 mb-2">Why it matters</h3>
            <p className="text-slate-600 text-sm">{project.why}</p>
          </div>

          {!hasSubmittedProject ? (
            <form onSubmit={handleSubmit} className="bg-indigo-50/50 p-6 rounded-2xl border border-indigo-100">
              <h3 className="font-bold text-indigo-900 mb-4">Submit Your Work</h3>
              <input
                type="url"
                required
                placeholder="https://github.com/... or live link"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-indigo-200 focus:ring-2 focus:ring-indigo-500 outline-none mb-4"
              />
              <button type="submit" className="w-full py-3 bg-indigo-600 text-white font-bold rounded-xl shadow-md hover:bg-indigo-700 transition">
                Submit Project for Review
              </button>
            </form>
          ) : (
            <div className="bg-green-50 border border-green-200 p-6 rounded-2xl text-center">
              <h3 className="font-bold text-green-800 mb-2">Project Completed!</h3>
              <p className="text-green-700 text-sm">Your work has been added to your professional CV.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
