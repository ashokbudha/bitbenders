import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PROJECTS, ROLES } from '../data/mockData';
import { Briefcase, CheckCircle2, ArrowRight } from 'lucide-react';

export default function ProjectWorkspacePage() {
  const navigate = useNavigate();
  const [roleId, setRoleId] = useState(null);
  const [link, setLink] = useState('');
  const [reflection, setReflection] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const savedRole = localStorage.getItem('student_role');
    if (!savedRole) {
      navigate('/');
      return;
    }
    setRoleId(savedRole);
    
    const submitted = localStorage.getItem(`project_submitted_${savedRole}`);
    if (submitted) {
      setIsSubmitted(true);
      setLink(localStorage.getItem(`project_link_${savedRole}`) || '');
      setReflection(localStorage.getItem(`project_reflection_${savedRole}`) || '');
    }
  }, [navigate]);

  if (!roleId) return null;

  const role = ROLES.find(r => r.id === roleId);
  const project = PROJECTS[roleId];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!link.trim() || !reflection.trim()) return;

    localStorage.setItem(`project_submitted_${roleId}`, 'true');
    localStorage.setItem(`project_link_${roleId}`, link);
    localStorage.setItem(`project_reflection_${roleId}`, reflection);
    setIsSubmitted(true);
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoToReadiness = () => {
    navigate('/readiness');
  };

  return (
    <div className="max-w-3xl mx-auto animate-in fade-in duration-500">
      <div className="mb-8 border-b border-slate-200 pb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-700 text-sm font-semibold rounded-full mb-4">
          <Briefcase className="w-4 h-4" />
          First Real Project
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 mb-4">{project.title}</h1>
        <p className="text-lg text-slate-600">
          This is the only project you need to build to prove you are ready for a {role?.title} role.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3 mb-10">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h2 className="text-sm font-bold uppercase tracking-wide text-slate-500 mb-2">Why it matters</h2>
            <p className="text-slate-800">{project.why}</p>
          </div>

          <div className="bg-emerald-50 rounded-2xl border border-emerald-100 p-6">
            <h2 className="text-sm font-bold uppercase tracking-wide text-emerald-800 mb-2">Scope Boundaries (What is "Good Enough")</h2>
            <p className="text-emerald-900">{project.goodEnough}</p>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-bold text-slate-900">Task Breakdown</h2>
          <div className="space-y-3">
            {project.tasks.map((task, index) => (
              <div key={task.id} className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500"></div>
                <h3 className="font-semibold text-slate-800 mb-2 text-sm">Step {index + 1}</h3>
                <p className="text-sm text-slate-600 mb-3">{task.instruction}</p>
                <div className="bg-slate-50 rounded p-2 text-xs text-slate-500 font-medium">
                  <span className="text-indigo-600 font-bold mr-1">Outcome:</span>
                  {task.outcome}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Submission Section */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
        <div className={`p-8 ${isSubmitted ? 'bg-indigo-50' : 'bg-slate-900 text-white'}`}>
          <h2 className={`text-2xl font-bold mb-2 ${isSubmitted ? 'text-indigo-900' : ''}`}>
            {isSubmitted ? 'Project Submitted Successfully' : 'Submit Your Project'}
          </h2>
          <p className={isSubmitted ? 'text-indigo-700' : 'text-slate-300'}>
            {isSubmitted 
              ? 'Great job completing your first core project!' 
              : 'Add your live link or code repository so companies can see your work.'}
          </p>
        </div>

        <div className="p-8">
          {isSubmitted ? (
            <div className="space-y-6">
              <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-slate-200">
                <div className="bg-green-100 p-2 rounded-full text-green-600">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">Project Link</h3>
                  <a href={link} target="_blank" rel="noreferrer" className="text-indigo-600 hover:underline break-all">
                    {link}
                  </a>
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <h3 className="font-bold text-slate-900 mb-2">Your Reflection</h3>
                <p className="text-slate-700 italic">"{reflection}"</p>
              </div>

              <button
                onClick={handleGoToReadiness}
                className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-colors shadow-md text-lg"
              >
                Validate My Readiness
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Project Link (GitHub / Google Doc / Live Demo)
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://..."
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-slate-900"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Reflection: What I learned while doing this
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="The hardest part was... I solved it by..."
                  value={reflection}
                  onChange={(e) => setReflection(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-slate-900 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition-colors shadow-md"
              >
                Submit Project
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
