import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROADMAPS, ROLES } from '../data/mockData';
import { CheckCircle2, Lock, ArrowRight, BookOpen } from 'lucide-react';

export default function LearningRoadmapPage() {
  const navigate = useNavigate();
  const [roleId, setRoleId] = useState(null);
  const [currentStepId, setCurrentStepId] = useState(1);

  useEffect(() => {
    const savedRole = localStorage.getItem('student_role');
    if (!savedRole) {
      navigate('/');
      return;
    }
    setRoleId(savedRole);
    
    const savedStep = localStorage.getItem(`roadmap_step_${savedRole}`);
    if (savedStep) {
      setCurrentStepId(parseInt(savedStep, 10));
    }
  }, [navigate]);

  if (!roleId) return null;

  const role = ROLES.find(r => r.id === roleId);
  const roadmap = ROADMAPS[roleId];
  const isCompleted = currentStepId > roadmap.length;

  const handleCompleteStep = (stepId) => {
    const nextStep = stepId + 1;
    setCurrentStepId(nextStep);
    localStorage.setItem(`roadmap_step_${roleId}`, nextStep.toString());
  };

  const handleProceedToProject = () => {
    navigate('/project');
  };

  return (
    <div className="max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Your Learning Roadmap</h1>
        <p className="text-lg text-slate-600">
          Path: <span className="font-semibold text-indigo-600">{role?.title}</span>
        </p>
      </div>

      <div className="relative border-l-2 border-slate-200 ml-4 md:ml-6 space-y-10">
        {roadmap.map((step, index) => {
          const isPast = step.id < currentStepId;
          const isCurrent = step.id === currentStepId;
          const isLocked = step.id > currentStepId;

          return (
            <div key={step.id} className="relative pl-8 md:pl-10">
              {/* Timeline Icon */}
              <div className={`absolute -left-[17px] top-1 flex items-center justify-center w-8 h-8 rounded-full border-2 bg-white ${
                isPast ? 'border-green-500 text-green-500' :
                isCurrent ? 'border-indigo-600 text-indigo-600 ring-4 ring-indigo-50' :
                'border-slate-300 text-slate-400'
              }`}>
                {isPast ? <CheckCircle2 className="w-5 h-5" /> : 
                 isLocked ? <Lock className="w-4 h-4" /> : 
                 <BookOpen className="w-4 h-4" />}
              </div>

              {/* Card */}
              <div className={`rounded-2xl border p-6 transition-all ${
                isCurrent ? 'bg-white border-indigo-200 shadow-md shadow-indigo-100/50' :
                isPast ? 'bg-slate-50 border-slate-200' :
                'bg-slate-50/50 border-slate-100 opacity-60'
              }`}>
                {isCurrent && (
                  <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider rounded-full mb-4">
                    Your Next Step
                  </span>
                )}
                
                <h2 className={`text-xl font-bold mb-3 ${isCurrent ? 'text-slate-900' : 'text-slate-700'}`}>
                  {step.id}. {step.title}
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-semibold text-slate-500 mb-1">Why it matters for the job</h3>
                    <p className={`text-sm ${isCurrent ? 'text-slate-700' : 'text-slate-600'}`}>
                      {step.why}
                    </p>
                  </div>
                  
                  <div className="bg-amber-50 rounded-lg p-4 border border-amber-100/50">
                    <h3 className="text-sm font-semibold text-amber-800 mb-1">Output to prove completion</h3>
                    <p className="text-sm text-amber-900/80">
                      {step.output}
                    </p>
                  </div>
                </div>

                {isCurrent && (
                  <button
                    onClick={() => handleCompleteStep(step.id)}
                    className="mt-6 flex items-center justify-center gap-2 w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition-colors shadow-sm"
                  >
                    Mark as Completed
                    <CheckCircle2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {isCompleted && (
        <div className="mt-12 bg-green-50 rounded-2xl border border-green-200 p-8 text-center animate-in zoom-in-95 duration-500">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-green-900 mb-2">Roadmap Completed!</h2>
          <p className="text-green-800 mb-8 max-w-md mx-auto">
            You have successfully learned the fundamentals. Now it's time to build your first real project to prove your skills.
          </p>
          <button
            onClick={handleProceedToProject}
            className="flex items-center justify-center gap-2 w-full sm:w-auto mx-auto py-3 px-8 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl transition-colors shadow-md"
          >
            Go to Project Workspace
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}
