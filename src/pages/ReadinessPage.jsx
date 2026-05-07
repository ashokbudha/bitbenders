import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROLES } from '../data/mockData';
import { CheckSquare, Square, ShieldCheck, ArrowRight, TrendingUp } from 'lucide-react';

export default function ReadinessPage() {
  const navigate = useNavigate();
  const [roleId, setRoleId] = useState(null);
  const [checks, setChecks] = useState({
    skills: false,
    project: false,
    communication: false,
  });

  useEffect(() => {
    const savedRole = localStorage.getItem('student_role');
    if (!savedRole) {
      navigate('/');
      return;
    }
    setRoleId(savedRole);
    
    const projectSubmitted = localStorage.getItem(`project_submitted_${savedRole}`);
    if (projectSubmitted) {
      setChecks(prev => ({ ...prev, project: true, skills: true })); // Auto-check if roadmap and project done
    }
  }, [navigate]);

  if (!roleId) return null;

  const role = ROLES.find(r => r.id === roleId);
  const allComplete = checks.skills && checks.project && checks.communication;

  const toggleCheck = (key) => {
    setChecks(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleGoToJobs = () => {
    if (allComplete) {
      navigate('/jobs');
    }
  };

  return (
    <div className="max-w-2xl mx-auto animate-in fade-in duration-500">
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 text-brand-green mb-4">
          <ShieldCheck className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-extrabold text-brand-black mb-4">Validation Checklist</h1>
        <p className="text-lg text-brand-gray">
          Imposter syndrome is normal. Let's objectively verify if you are ready to apply for <span className="font-semibold text-brand-black">{role?.title}</span> roles.
        </p>
      </div>

      <div className="bg-brand-white rounded-3xl border border-brand-gray/20 shadow-sm p-6 md:p-8 mb-8 space-y-4">
        <label className="flex items-start gap-4 p-4 rounded-xl border border-brand-gray/10 bg-brand-neutral hover:bg-brand-gray/10 cursor-pointer transition-colors">
          <div className="mt-1 text-brand-green">
            {checks.skills ? <CheckSquare className="w-6 h-6" /> : <Square className="w-6 h-6" />}
          </div>
          <div>
            <span className="block font-bold text-brand-black text-lg">Core Skills Learned</span>
            <span className="text-brand-gray text-sm">I have completed the learning roadmap and understand the basics.</span>
          </div>
          <input 
            type="checkbox" 
            className="hidden" 
            checked={checks.skills} 
            onChange={() => toggleCheck('skills')} 
          />
        </label>

        <label className="flex items-start gap-4 p-4 rounded-xl border border-brand-gray/10 bg-brand-neutral hover:bg-brand-gray/10 cursor-pointer transition-colors">
          <div className="mt-1 text-brand-green">
            {checks.project ? <CheckSquare className="w-6 h-6" /> : <Square className="w-6 h-6" />}
          </div>
          <div>
            <span className="block font-bold text-brand-black text-lg">Proof of Work (Project)</span>
            <span className="text-brand-gray text-sm">I have built and submitted the core mandatory project.</span>
          </div>
          <input 
            type="checkbox" 
            className="hidden" 
            checked={checks.project} 
            onChange={() => toggleCheck('project')} 
          />
        </label>

        <label className="flex items-start gap-4 p-4 rounded-xl border border-brand-gray/10 bg-brand-neutral hover:bg-brand-gray/10 cursor-pointer transition-colors">
          <div className="mt-1 text-brand-green">
            {checks.communication ? <CheckSquare className="w-6 h-6" /> : <Square className="w-6 h-6" />}
          </div>
          <div>
            <span className="block font-bold text-brand-black text-lg">Basic Communication</span>
            <span className="text-brand-gray text-sm">I can clearly explain what I built and why I built it.</span>
          </div>
          <input 
            type="checkbox" 
            className="hidden" 
            checked={checks.communication} 
            onChange={() => toggleCheck('communication')} 
          />
        </label>
      </div>

      {allComplete && (
        <div className="animate-in slide-in-from-bottom-4 zoom-in-95 duration-500">
          <div className="bg-gradient-to-br from-green-600 to-emerald-700 rounded-3xl p-8 text-brand-white text-center shadow-xl mb-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <TrendingUp className="w-32 h-32" />
            </div>
            
            <h2 className="text-3xl font-extrabold mb-4 relative z-10 flex items-center justify-center gap-2">
              <CheckSquare className="w-8 h-8 text-green-300" />
              You are Ready.
            </h2>
            
            <p className="text-green-100 text-lg mb-6 relative z-10">
              You meet the entry-level standard for this role.
            </p>
            
            <div className="bg-green-800/40 rounded-xl p-6 text-left relative z-10 border border-green-500/30">
              <p className="mb-3 font-medium text-green-50">Here is the truth about what companies expect:</p>
              <ul className="space-y-2 text-sm text-green-100">
                <li className="flex items-start gap-2">
                  <span className="text-green-300 mt-1">●</span> 
                  They do NOT expect you to know everything.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-300 mt-1">●</span> 
                  They expect you to have basic foundations (which you have).
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-300 mt-1">●</span> 
                  They expect you to be able to learn the rest on the job.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-300 mt-1">●</span> 
                  Interviews are just conversations to see if you are eager to learn.
                </li>
              </ul>
            </div>
          </div>

          <button
            onClick={handleGoToJobs}
            className="w-full py-4 bg-brand-black hover:bg-brand-black text-brand-white font-bold rounded-xl flex items-center justify-center gap-2 transition-colors shadow-lg text-lg"
          >
            See Fresher Jobs
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}
