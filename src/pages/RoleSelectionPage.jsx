import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ROLES } from '../data/mockData';
import { CheckCircle2, ArrowRight, Compass } from 'lucide-react';
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
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-5xl mx-auto py-8">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">Choose Your Skill Path</h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Start your journey by selecting a realistic industry role. Your dashboard, learning roadmap, and capstone projects will be personalized for this path.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-10">
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
              <h2 className="text-xl font-bold text-slate-900 mb-2 pr-8">{role.title}</h2>
              <p className="text-sm text-slate-600 mb-4 line-clamp-2">{role.dayToDay}</p>

              <div className="space-y-2 mb-4">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">Key Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {role.reqSkills?.slice(0, 3).map((skill, i) => (
                    <span key={i} className="text-xs font-medium bg-slate-100 text-slate-700 px-2 py-1 rounded-md">
                      {skill}
                    </span>
                  ))}
                  {role.reqSkills?.length > 3 && (
                    <span className="text-xs font-medium bg-slate-100 text-slate-500 px-2 py-1 rounded-md">
                      +{role.reqSkills.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            </div>
            
            <div className="p-6 pt-0 mt-auto">
              {selectedRole === role.id ? (
                <button
                  onClick={handleConfirmRole}
                  className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2"
                >
                  Start Learning <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button className="w-full py-3 px-4 bg-slate-50 text-slate-600 font-medium rounded-xl border border-slate-200 transition-colors pointer-events-none">
                  Select this path
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col items-center justify-center p-8 bg-indigo-50/50 rounded-3xl border border-indigo-100 text-center">
        <Compass className="w-12 h-12 text-indigo-400 mb-4" />
        <h3 className="text-xl font-bold text-slate-900 mb-2">Not sure which path to pick?</h3>
        <p className="text-slate-600 mb-6 max-w-lg">
          Don't worry! Choosing a career path can be overwhelming. Take some time to explore the different roles, responsibilities, and required skills to find the perfect fit for you.
        </p>
        <Link 
          to="/dashboard/explore" 
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-indigo-700 hover:bg-indigo-50 font-bold rounded-xl border border-indigo-200 transition-colors shadow-sm"
        >
          Still confused? Let's explore
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
