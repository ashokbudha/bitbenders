import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROLES } from '../data/mockData';
import { CheckCircle2, XCircle } from 'lucide-react';
import { useStudent } from '../context/StudentContext';

export default function RoleSelectionPage() {
  const navigate = useNavigate();
  const { careerPath, updateCareerPath } = useStudent();
  const [selectedRole, setSelectedRole] = useState(careerPath || null);

  const handleSelectRole = (roleId) => {
    setSelectedRole(roleId);
  };

  const handleConfirmRole = () => {
    if (!selectedRole) return;
    
    // Save state using context
    updateCareerPath(selectedRole);
    
    // Redirect to dashboard overview
    navigate('/dashboard');
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-5xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-4">Choose Your Career Path</h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Select ONE realistic industry role to start your journey. No quizzes, no AI guessing. Just pick the one that matches your current interest and commit to learning it.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {ROLES.map((role) => (
          <div 
            key={role.id}
            className={`relative bg-white rounded-2xl border-2 transition-all duration-200 flex flex-col ${
              selectedRole === role.id 
                ? 'border-indigo-600 shadow-lg shadow-indigo-100 scale-[1.02]' 
                : 'border-slate-200 hover:border-indigo-300 hover:shadow-md cursor-pointer'
            }`}
            onClick={() => handleSelectRole(role.id)}
          >
            {selectedRole === role.id && (
              <div className="absolute top-4 right-4 text-indigo-600">
                <CheckCircle2 className="w-6 h-6 fill-indigo-100" />
              </div>
            )}
            
            <div className="p-6 flex-1">
              <h2 className="text-xl font-bold text-slate-900 mb-2">{role.title}</h2>
              <p className="text-sm text-slate-600 mb-6">{role.dayToDay}</p>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Example Tasks</h3>
                  <ul className="space-y-2">
                    {role.exampleTasks.map((task, i) => (
                      <li key={i} className="text-sm text-slate-700 flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
                        <span>{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Expectations</h3>
                  <p className="text-sm text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-100">
                    {role.expectations}
                  </p>
                </div>

                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-rose-500 mb-2 flex items-center gap-1">
                    <XCircle className="w-3.5 h-3.5" />
                    Not For
                  </h3>
                  <p className="text-sm text-slate-600 italic">
                    "{role.notFor}"
                  </p>
                </div>
              </div>
            </div>
            
            <div className="p-6 pt-0 mt-auto">
              {selectedRole === role.id ? (
                <button
                  onClick={handleConfirmRole}
                  className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition-colors shadow-sm"
                >
                  Confirm & Start Learning
                </button>
              ) : (
                <button className="w-full py-3 px-4 bg-slate-50 text-slate-600 font-medium rounded-xl border border-slate-200 transition-colors pointer-events-none">
                  Select this role
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
