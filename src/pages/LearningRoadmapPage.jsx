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
        <h1 className="text-3xl font-extrabold text-brand-black mb-2">Your Learning Roadmap</h1>
        <p className="text-lg text-brand-gray">
          Path: <span className="font-semibold text-brand-green">{role?.title}</span>
        </p>
      </div>

      <div className="relative border-l-2 border-brand-gray/20 ml-4 md:ml-6 space-y-10">
        {roadmap.map((step, index) => {
          const isPast = step.id < currentStepId;
          const isCurrent = step.id === currentStepId;
          const isLocked = step.id > currentStepId;

          return (
            <div key={step.id} className="relative pl-8 md:pl-10">
              {/* Timeline Icon */}
              <div className={`absolute -left-[17px] top-1 flex items-center justify-center w-8 h-8 rounded-full border-2 bg-brand-white ${
                isPast ? 'border-green-500 text-green-500' :
                isCurrent ? 'border-brand-green text-brand-green ring-4 ring-brand-green/10' :
                'border-brand-gray/40 text-brand-gray/60'
              }`}>
                {isPast ? <CheckCircle2 className="w-5 h-5" /> : 
                 isLocked ? <Lock className="w-4 h-4" /> : 
                 <BookOpen className="w-4 h-4" />}
              </div>

              {/* Card */}
              <div className={`rounded-2xl border p-6 transition-all ${
                isCurrent ? 'bg-brand-white border-indigo-200 shadow-md shadow-indigo-100/50' :
                isPast ? 'bg-brand-neutral border-brand-gray/20' :
                'bg-brand-neutral/50 border-brand-gray/10 opacity-60'
              }`}>
                {isCurrent && (
                  <span className="inline-block px-3 py-1 bg-indigo-100 text-brand-green/90 text-xs font-bold uppercase tracking-wider rounded-full mb-4">
                    Your Next Step
                  </span>
                )}
                
                <h2 className={`text-xl font-bold mb-3 ${isCurrent ? 'text-brand-black' : 'text-brand-gray'}`}>
                  {step.id}. {step.title}
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-semibold text-brand-gray mb-1">Why it matters for the job</h3>
                    <p className={`text-sm ${isCurrent ? 'text-brand-gray' : 'text-brand-gray'}`}>
                      {step.why}
                    </p>
                  </div>
                  
                  <div className="bg-brand-green/10 rounded-lg p-4 border border-amber-100/50">
                    <h3 className="text-sm font-semibold text-amber-800 mb-1">Output to prove completion</h3>
                    <p className="text-sm text-amber-900/80">
                      {step.output}
                    </p>
                  </div>
                </div>

                {isCurrent && (
                  <button
                    onClick={() => handleCompleteStep(step.id)}
                    className="mt-6 flex items-center justify-center gap-2 w-full py-3 px-4 bg-brand-green hover:bg-brand-green/90 text-brand-white font-medium rounded-xl transition-colors shadow-sm"
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
            className="flex items-center justify-center gap-2 w-full sm:w-auto mx-auto py-3 px-8 bg-green-600 hover:bg-green-700 text-brand-white font-bold rounded-xl transition-colors shadow-md"
          >
            Go to Project Workspace
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}
