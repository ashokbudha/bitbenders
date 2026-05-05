import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROLES, ROADMAPS } from '../data/mockData';
import { CheckCircle2, ArrowLeft, Briefcase, Code2, Users, Wrench, Lightbulb, Check, Target, Layers, LayoutTemplate, X } from 'lucide-react';
import { useStudent } from '../context/StudentContext';

// Simple quiz questions
const QUIZ_QUESTIONS = [
  { text: "Do you prefer working on visual design or logical systems?", options: [{ label: "Visuals", pointsTo: ['frontend-dev', 'ui-ux'] }, { label: "Logic", pointsTo: ['backend-dev', 'qa-tester'] }] },
  { text: "Do you enjoy analyzing data to find patterns?", options: [{ label: "Yes", pointsTo: ['digital-marketing', 'qa-tester'] }, { label: "No", pointsTo: ['ui-ux', 'frontend-dev'] }] },
  { text: "How do you feel about writing code?", options: [{ label: "Love it", pointsTo: ['frontend-dev', 'backend-dev'] }, { label: "Prefer avoiding it", pointsTo: ['ui-ux', 'digital-marketing', 'qa-tester'] }] }
];

export default function CareerExplorerPage() {
  const navigate = useNavigate();
  const { careerPath, updateCareerPath } = useStudent();
  
  const [activeRole, setActiveRole] = useState(ROLES[0]);
  const [compareRole, setCompareRole] = useState(null);
  
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [quizStep, setQuizStep] = useState(0);
  const [quizScores, setQuizScores] = useState({});

  // Scroll to top when active role changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeRole]);

  const handleSelectPath = (roleId) => {
    updateCareerPath(roleId);
    navigate('/dashboard');
  };

  // Quiz logic
  const handleQuizAnswer = (pointsTo) => {
    const newScores = { ...quizScores };
    pointsTo.forEach(role => {
      newScores[role] = (newScores[role] || 0) + 1;
    });
    setQuizScores(newScores);

    if (quizStep < QUIZ_QUESTIONS.length - 1) {
      setQuizStep(quizStep + 1);
    } else {
      // Find highest score
      const sorted = Object.entries(newScores).sort((a, b) => b[1] - a[1]);
      const topRoleId = sorted[0][0];
      const topRole = ROLES.find(r => r.id === topRoleId);
      setActiveRole(topRole);
      setQuizStep(quizStep + 1); // move to result
    }
  };

  const closeQuiz = () => {
    setIsQuizOpen(false);
    setQuizStep(0);
    setQuizScores({});
  };

  const RoleDetailView = ({ role, isCompareMode = false }) => (
    <div className={`bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-full ${isCompareMode ? 'col-span-1' : 'col-span-1'}`}>
      {/* Header */}
      <div className="bg-slate-900 text-white p-8 relative overflow-hidden shrink-0">
        {isCompareMode && (
          <button onClick={() => setCompareRole(null)} className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition z-20">
            <X className="w-5 h-5 text-white" />
          </button>
        )}
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <Briefcase className="w-48 h-48" />
        </div>
        <div className="relative z-10">
          <div className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold tracking-wide uppercase mb-4 text-indigo-100 border border-white/10">
            Career Path
          </div>
          <h2 className={`font-extrabold mb-4 ${isCompareMode ? 'text-2xl' : 'text-3xl md:text-4xl'}`}>{role.title}</h2>
          <p className="text-slate-300 max-w-2xl leading-relaxed text-sm md:text-base">
            {role.dayToDay}
          </p>
        </div>
      </div>

      <div className="p-8 space-y-10 flex-1 overflow-y-auto">
        {/* Fit & Expectations */}
        <div className="space-y-6">
          <div className="bg-indigo-50 rounded-2xl p-6 border border-indigo-100">
            <div className="flex items-center gap-3 mb-2">
              <Users className="w-5 h-5 text-indigo-600" />
              <h3 className="font-bold text-slate-900">Who it fits best</h3>
            </div>
            <p className="text-slate-700 text-sm">{role.fit}</p>
          </div>
          <div className="bg-amber-50 rounded-2xl p-6 border border-amber-100">
            <div className="flex items-center gap-3 mb-2">
              <Lightbulb className="w-5 h-5 text-amber-600" />
              <h3 className="font-bold text-slate-900">Expectations</h3>
            </div>
            <p className="text-slate-700 text-sm">{role.expectations}</p>
          </div>
        </div>

        {/* Skills */}
        <div>
          <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Code2 className="w-5 h-5 text-indigo-600" /> Required Skills
          </h3>
          <div className="space-y-6">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">Technical Skills</h4>
              <div className="flex flex-wrap gap-2">
                {role.reqSkills?.map((skill, idx) => (
                  <span key={idx} className="bg-slate-100 text-slate-700 text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-200">{skill}</span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">Soft & Cognitive Skills</h4>
              <div className="flex flex-wrap gap-2">
                {role.softSkills?.map((skill, idx) => (
                  <span key={idx} className="bg-indigo-50 text-indigo-700 text-xs font-semibold px-3 py-1.5 rounded-lg border border-indigo-100">{skill}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tools & Projects */}
        <div className={`grid gap-6 ${isCompareMode ? 'grid-cols-1' : 'sm:grid-cols-2'}`}>
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Wrench className="w-5 h-5 text-indigo-600" /> Common Tools
            </h3>
            <ul className="space-y-2">
              {role.tools?.map((tool, idx) => (
                <li key={idx} className="text-sm text-slate-700 flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" /> {tool}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <LayoutTemplate className="w-5 h-5 text-indigo-600" /> Example Projects
            </h3>
            <ul className="space-y-2">
              {role.exampleProjects?.map((proj, idx) => (
                <li key={idx} className="text-sm text-slate-700 flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" /> {proj}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Opportunities */}
        <div>
          <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-indigo-600" /> Opportunity Types
          </h3>
          <div className="flex flex-wrap gap-2">
            {role.opportunities?.map((opp, idx) => (
              <span key={idx} className="bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1.5 rounded-full border border-emerald-200">
                {opp}
              </span>
            ))}
          </div>
        </div>

        {/* Roadmap Preview */}
        {!isCompareMode && (
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Check className="w-5 h-5 text-indigo-600" /> Roadmap Preview
            </h3>
            <div className="relative border-l-2 border-indigo-100 ml-3 pl-6 space-y-6">
              {(ROADMAPS[role.id] || []).slice(0, 3).map((module, idx) => (
                <div key={idx} className="relative">
                  <div className="absolute -left-[31px] top-1 w-4 h-4 bg-white border-2 border-indigo-600 rounded-full" />
                  <h4 className="font-bold text-slate-900">Module {module.id}: {module.title}</h4>
                  <p className="text-sm text-slate-600 mt-1">{module.why}</p>
                </div>
              ))}
              {(ROADMAPS[role.id]?.length > 3) && (
                <div className="relative">
                  <div className="absolute -left-[31px] top-1 w-4 h-4 bg-white border-2 border-slate-300 rounded-full" />
                  <p className="text-sm font-medium text-slate-500 italic">... and {ROADMAPS[role.id].length - 3} more modules.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      
      {/* Action Bar */}
      <div className="bg-slate-50 border-t border-slate-200 p-6 flex flex-col items-center justify-between gap-4 shrink-0 mt-auto">
        {!isCompareMode && (
          <div className="w-full flex items-center justify-between">
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Ready to start?</h4>
              <p className="text-slate-500 text-xs">Personalize your dashboard.</p>
            </div>
            <button
              onClick={() => handleSelectPath(role.id)}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-colors shadow-md"
            >
              Choose {role.title.split(' ')[0]}
            </button>
          </div>
        )}
        {isCompareMode && (
          <button
            onClick={() => handleSelectPath(role.id)}
            className="w-full px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-colors shadow-md"
          >
            Choose {role.title.split(' ')[0]}
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="animate-in fade-in duration-500 max-w-7xl mx-auto py-6">
      
      {/* Quiz Modal */}
      {isQuizOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative">
            <button onClick={closeQuiz} className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600"><X className="w-5 h-5"/></button>
            
            {quizStep < QUIZ_QUESTIONS.length ? (
              <>
                <h3 className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-2">Question {quizStep + 1} of {QUIZ_QUESTIONS.length}</h3>
                <h2 className="text-2xl font-bold text-slate-900 mb-6">{QUIZ_QUESTIONS[quizStep].text}</h2>
                <div className="space-y-3">
                  {QUIZ_QUESTIONS[quizStep].options.map((opt, i) => (
                    <button key={i} onClick={() => handleQuizAnswer(opt.pointsTo)} className="w-full p-4 border-2 border-slate-200 rounded-xl hover:border-indigo-600 hover:bg-indigo-50 font-semibold text-slate-700 transition text-left">
                      {opt.label}
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-6">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">We found a match!</h2>
                <p className="text-slate-600 mb-6">Based on your answers, we highly recommend exploring the <span className="font-bold text-indigo-600">{activeRole.title}</span> path.</p>
                <button onClick={closeQuiz} className="w-full py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700">
                  View This Role
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <button 
            onClick={() => navigate('/dashboard/setup')}
            className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-indigo-600 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" /> Back to simple selection
          </button>
          <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Career Explorer</h1>
          <p className="text-slate-600 max-w-2xl">
            Deep dive into different industry roles. Understand what they do, what skills you need, and decide if it's the right fit for you.
          </p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => setIsQuizOpen(true)} className="px-5 py-2.5 bg-indigo-100 text-indigo-700 font-bold rounded-xl hover:bg-indigo-200 transition-colors flex items-center gap-2 shadow-sm">
            <Lightbulb className="w-4 h-4" /> Take Fit Quiz
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Sidebar Navigation */}
        <div className="lg:col-span-3 space-y-3 sticky top-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4 px-2">Available Paths</h3>
            <div className="space-y-2 mb-6">
              {ROLES.map(role => (
                <button
                  key={role.id}
                  onClick={() => { setActiveRole(role); if(compareRole?.id === role.id) setCompareRole(null); }}
                  className={`w-full text-left px-4 py-3 rounded-xl transition-all flex items-center justify-between ${
                    activeRole.id === role.id 
                      ? 'bg-indigo-50 text-indigo-700 font-semibold ring-1 ring-indigo-200' 
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <span className="truncate pr-2">{role.title.split(' ')[0]}</span>
                </button>
              ))}
            </div>

            {/* Compare Feature */}
            {!compareRole && (
              <div className="border-t border-slate-100 pt-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 px-2 flex items-center gap-2">
                  <Layers className="w-3 h-3" /> Compare With
                </h3>
                <div className="space-y-2">
                  {ROLES.filter(r => r.id !== activeRole.id).map(role => (
                    <button
                      key={role.id}
                      onClick={() => setCompareRole(role)}
                      className="w-full text-left px-4 py-2 rounded-xl text-sm text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-all border border-transparent hover:border-slate-200 flex items-center gap-2"
                    >
                      <span className="text-slate-400 font-bold">+</span> {role.title.split(' ')[0]}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Role Details Area */}
        <div className={`lg:col-span-9 grid gap-6 items-stretch ${compareRole ? 'md:grid-cols-2' : 'grid-cols-1'}`}>
          <RoleDetailView role={activeRole} isCompareMode={!!compareRole} />
          {compareRole && <RoleDetailView role={compareRole} isCompareMode={true} />}
        </div>

      </div>
    </div>
  );
}
