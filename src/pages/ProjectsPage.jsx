import { useState } from 'react';
import { useStudent } from '../context/StudentContext';
import { PROJECT_LIBRARY, CAPSTONE_IDEAS } from '../data/mockData';
import { Target, Layout, Rocket, Trophy, Star, CheckCircle, ArrowRight, Lightbulb, Play, BookOpen, PenTool, CheckSquare, ShieldCheck, Lock } from 'lucide-react';

export default function ProjectsPage() {
  const { careerPath, completedCourses, completedProjects, completeProject, activeProjectState, updateProjectState, capstoneProposal, updateCapstoneProposal } = useStudent();
  const [activeTab, setActiveTab] = useState('library');
  const [activeProjectView, setActiveProjectView] = useState(null); // ID of project currently viewing/building
  const [capstoneView, setCapstoneView] = useState('intro'); // 'intro', 'ideas', 'proposal', 'building'

  if (!careerPath) return <div className="p-8 text-center text-brand-gray">Please select a career path first.</div>;

  const myProjects = PROJECT_LIBRARY.filter(p => p.careerPath === careerPath);
  const myIdeas = CAPSTONE_IDEAS.filter(p => p.careerPath === careerPath);

  // --- REUSED: PROJECT LAUNCHPAD (The multi-stage builder from previous phase) ---
  const ProjectLaunchpad = ({ projectId, onBack }) => {
    const project = PROJECT_LIBRARY.find(p => p.id === projectId);
    const state = activeProjectState[projectId] || {};
    const isCompleted = completedProjects.some(p => p.id === projectId);
    const stage = isCompleted ? 'completed' : (state.stage || 'recommendation');

    const setStage = (s) => updateProjectState(projectId, { stage: s });

    const renderRecommendation = () => (
      <div className="bg-brand-white rounded-3xl border border-brand-gray/20 overflow-hidden shadow-sm animate-in slide-in-from-bottom-4 duration-500">
        <div className="bg-gradient-to-r from-brand-green to-violet-600 p-8 text-brand-white">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-white/20 text-sm font-bold rounded-full mb-4">
            <Target className="w-4 h-4" /> {project.type === 'mini' ? 'Mini Project' : 'Guided Project'}
          </div>
          <h2 className="text-3xl font-extrabold mb-2">{project.title}</h2>
          <p className="text-indigo-100">{project.shortDescription}</p>
        </div>
        <div className="p-8">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-brand-black mb-2">Skills Proved</h3>
              <div className="flex flex-wrap gap-2">
                {project.skillsUsed.map(s => <span key={s} className="px-3 py-1 bg-brand-gray/10 text-brand-gray rounded-lg text-sm font-medium">{s}</span>)}
              </div>
            </div>
            <div>
              <h3 className="font-bold text-brand-black mb-2">Why build this?</h3>
              <p className="text-brand-gray text-sm">{project.proves}</p>
            </div>
          </div>
          <button onClick={() => setStage('blueprint')} className="w-full py-4 bg-brand-black hover:bg-brand-black text-brand-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all">
            Start Project <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    );

    const renderBlueprint = () => (
      <div className="bg-brand-white rounded-3xl border border-brand-gray/20 p-8 shadow-sm">
        <h2 className="text-2xl font-extrabold text-brand-black mb-6">Project Blueprint</h2>
        <div className="bg-brand-neutral p-6 rounded-2xl mb-8">
          <h3 className="font-bold text-brand-black mb-2">Goal</h3>
          <p className="text-brand-gray">{project.blueprint?.goal || project.shortDescription}</p>
        </div>
        <button onClick={() => setStage('building')} className="w-full py-4 bg-brand-green hover:bg-brand-green/90 text-brand-white font-bold rounded-xl">
          Enter Workspace
        </button>
      </div>
    );

    const renderMilestones = () => {
      const completed = state.completedMilestones || [];
      const progress = project.milestones ? Math.round((completed.length / project.milestones.length) * 100) : 0;
      
      const toggleMilestone = (mId) => {
        const updated = completed.includes(mId) ? completed.filter(id => id !== mId) : [...completed, mId];
        updateProjectState(projectId, { completedMilestones: updated });
      };

      return (
        <div className="bg-brand-white p-8 rounded-3xl border border-brand-gray/20 shadow-sm">
          <div className="flex justify-between items-end mb-6">
            <h2 className="text-2xl font-bold">Project Builder</h2>
            <span className="text-2xl font-bold text-brand-green">{progress}%</span>
          </div>
          <div className="w-full bg-brand-gray/20 h-2 rounded-full mb-8"><div className="bg-brand-green h-full transition-all" style={{width: `${Number(progress)||0}%`}}></div></div>
          
          <div className="space-y-4">
            {project.milestones?.map((m, i) => (
              <div key={m.id} className="border border-brand-gray/20 p-4 rounded-xl flex items-start gap-4">
                <button onClick={() => toggleMilestone(m.id)} className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 mt-1 ${completed.includes(m.id) ? 'bg-brand-green border-brand-green text-brand-white' : 'border-brand-gray/40 text-transparent'}`}>
                  <CheckCircle className="w-4 h-4" />
                </button>
                <div>
                  <h3 className={`font-bold ${completed.includes(m.id) ? 'text-brand-gray line-through' : 'text-brand-black'}`}>{i+1}. {m.title}</h3>
                  <p className="text-sm text-brand-gray mt-1">{m.description}</p>
                </div>
              </div>
            ))}
          </div>

          <button onClick={() => setStage('showcase')} disabled={progress < 100} className={`w-full mt-8 py-4 font-bold rounded-xl ${progress === 100 ? 'bg-brand-black text-brand-white' : 'bg-brand-gray/10 text-brand-gray/60'}`}>
            Final Review & Showcase
          </button>
        </div>
      );
    };

    const renderShowcase = () => {
      const [link, setLink] = useState('');
      return (
        <div className="bg-brand-white p-8 rounded-3xl border border-brand-gray/20 text-center">
          <Trophy className="w-16 h-16 text-brand-green mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-6">Submit to Portfolio</h2>
          <input type="url" placeholder="GitHub or Live URL" className="w-full p-4 rounded-xl border border-brand-gray/20 mb-4" value={link} onChange={e => setLink(e.target.value)} />
          <button onClick={() => { if(link) completeProject(projectId, link, 'Completed'); }} className="w-full py-4 bg-brand-green text-brand-white font-bold rounded-xl">Submit</button>
        </div>
      );
    };

    return (
      <div className="max-w-4xl mx-auto animate-in slide-in-from-right-8 duration-500">
        <button onClick={onBack} className="text-brand-gray hover:text-brand-green font-medium mb-6 flex items-center gap-2">← Back to Projects</button>
        {stage === 'recommendation' && renderRecommendation()}
        {stage === 'blueprint' && renderBlueprint()}
        {stage === 'building' && renderMilestones()}
        {stage === 'showcase' && renderShowcase()}
        {stage === 'completed' && (
          <div className="bg-brand-green/10 p-10 rounded-3xl text-center border border-emerald-200">
            <CheckCircle className="w-16 h-16 text-brand-green mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-emerald-900 mb-2">Project Completed!</h2>
            <p className="text-emerald-700 mb-6">Added to your professional profile.</p>
            <button onClick={onBack} className="px-6 py-3 bg-brand-green text-brand-white font-bold rounded-xl">Return to Library</button>
          </div>
        )}
      </div>
    );
  };

  // --- TABS RENDERING ---

  const renderLibrary = () => (
    <div className="animate-in fade-in duration-500">
      <div className="mb-8">
        <h2 className="text-2xl font-extrabold text-brand-black">Project Library</h2>
        <p className="text-brand-gray">Browse and start practice projects to build your skills.</p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {myProjects.map(proj => {
          const isCompleted = completedProjects.some(p => p.id === proj.id);
          const state = activeProjectState[proj.id];
          const isStarted = !!state;
          const hasPrereqs = proj.prerequisites?.every(c => completedCourses.includes(c)) ?? true;

          return (
            <div key={proj.id} className="bg-brand-white border border-brand-gray/20 rounded-2xl p-6 flex flex-col hover:shadow-lg transition-all relative overflow-hidden group">
              {!hasPrereqs && (
                <div className="absolute inset-0 bg-brand-black/5 backdrop-blur-[2px] z-10 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-brand-white p-4 rounded-xl shadow-xl flex items-center gap-3">
                    <Lock className="text-rose-500 w-5 h-5" />
                    <span className="text-sm font-bold text-brand-black">Complete prior courses</span>
                  </div>
                </div>
              )}
              <div className="flex justify-between items-start mb-4">
                <span className={`text-xs font-bold uppercase px-2.5 py-1 rounded-md ${proj.type === 'mini' ? 'bg-amber-100 text-amber-700' : 'bg-indigo-100 text-brand-green/90'}`}>
                  {proj.type}
                </span>
                {isCompleted && <ShieldCheck className="text-brand-green w-5 h-5" />}
              </div>
              <h3 className="font-bold text-brand-black text-lg mb-2">{proj.title}</h3>
              <p className="text-sm text-brand-gray mb-4 flex-1">{proj.shortDescription}</p>
              
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-brand-gray/10">
                <span className="text-xs font-medium text-brand-gray">{proj.estimatedTime}</span>
                <button 
                  disabled={!hasPrereqs}
                  onClick={() => setActiveProjectView(proj.id)}
                  className={`text-sm font-bold flex items-center gap-1 ${!hasPrereqs ? 'text-brand-gray/60' : isCompleted ? 'text-brand-green' : isStarted ? 'text-brand-green' : 'text-brand-black hover:text-brand-green'}`}
                >
                  {isCompleted ? 'Review' : isStarted ? 'Continue' : 'Start'} <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderCapstone = () => {
    // Determine Capstone Status
    const capstoneCompleted = completedProjects.some(p => p.id === 'capstone');
    const capstoneState = activeProjectState['capstone'] || {};
    const proposal = capstoneProposal;

    const currentCapstoneView = capstoneCompleted ? 'completed' : (capstoneState.stage === 'building' ? 'building' : capstoneView);

    if (currentCapstoneView === 'intro') {
      return (
        <div className="bg-brand-black text-brand-white rounded-3xl overflow-hidden shadow-xl animate-in slide-in-from-bottom-4">
          <div className="p-12 md:p-16 text-center">
            <div className="w-20 h-20 bg-brand-green/20 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-brand-green/50">
              <Trophy className="w-10 h-10 text-indigo-400" />
            </div>
            <h2 className="text-4xl font-extrabold mb-4">The Final Capstone</h2>
            <p className="text-lg text-brand-gray/40 max-w-2xl mx-auto mb-10">
              This is the ultimate proof of your readiness. Unlike practice projects, the capstone is a major, portfolio-defining application. You can choose a recommended idea or propose your own custom project.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button onClick={() => setCapstoneView('ideas')} className="px-8 py-4 bg-brand-green hover:bg-brand-green font-bold rounded-xl transition-all">
                View Recommended Ideas
              </button>
              <button onClick={() => setCapstoneView('proposal')} className="px-8 py-4 bg-transparent border-2 border-brand-gray hover:border-brand-gray/60 font-bold rounded-xl transition-all">
                Submit Custom Proposal
              </button>
            </div>
          </div>
        </div>
      );
    }

    if (currentCapstoneView === 'ideas') {
      return (
        <div className="animate-in fade-in duration-500">
          <button onClick={() => setCapstoneView('intro')} className="text-brand-gray hover:text-brand-green font-medium mb-6 flex items-center gap-2">← Back</button>
          <div className="mb-8">
            <h2 className="text-2xl font-extrabold text-brand-black">Recommended Capstones</h2>
            <p className="text-brand-gray">Curated ideas with high employability value.</p>
          </div>
          <div className="space-y-6">
            {myIdeas.map(idea => (
              <div key={idea.id} className="bg-brand-white border-2 border-brand-gray/20 rounded-2xl p-8 hover:border-indigo-400 transition-all flex flex-col md:flex-row justify-between gap-6">
                <div>
                  <h3 className="text-xl font-bold text-brand-black mb-2">{idea.title}</h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {idea.skillsProved.map(s => <span key={s} className="text-xs font-bold bg-brand-green/10 text-brand-green/90 px-2 py-1 rounded">{s}</span>)}
                  </div>
                  <p className="text-brand-gray text-sm mb-2"><span className="font-bold text-brand-black">Why it fits:</span> {idea.whyFits}</p>
                  <p className="text-brand-gray text-sm"><span className="font-bold text-brand-black">Hiring value:</span> {idea.hiringValue}</p>
                </div>
                <div className="shrink-0 flex items-center">
                  <button onClick={() => {
                    updateCapstoneProposal({ title: idea.title, type: 'recommended', status: 'approved' });
                    updateProjectState('capstone', { stage: 'building' });
                  }} className="w-full md:w-auto px-6 py-3 bg-brand-black hover:bg-brand-black text-brand-white font-bold rounded-xl">
                    Select & Start
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (currentCapstoneView === 'proposal') {
      return (
        <div className="max-w-3xl mx-auto bg-brand-white p-10 rounded-3xl border border-brand-gray/20 shadow-sm animate-in fade-in duration-500">
          <button onClick={() => setCapstoneView('intro')} className="text-brand-gray hover:text-brand-green font-medium mb-6 flex items-center gap-2">← Back</button>
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-indigo-100 text-brand-green mb-4"><PenTool className="w-6 h-6" /></div>
            <h2 className="text-2xl font-extrabold text-brand-black">Custom Capstone Proposal</h2>
            <p className="text-brand-gray">Pitch your own final project. We will validate the scope to ensure it's not too small or impossibly large.</p>
          </div>

          <form onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData);
            // Simulate instant auto-approval for MVP
            updateCapstoneProposal({ ...data, type: 'custom', status: 'approved' });
            updateProjectState('capstone', { stage: 'building' });
          }} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-brand-gray mb-2">Project Title</label>
              <input name="title" required className="w-full p-3 rounded-xl border border-brand-gray/20 focus:border-brand-green outline-none" placeholder="e.g. HealthTracker App" />
            </div>
            <div>
              <label className="block text-sm font-bold text-brand-gray mb-2">What problem does it solve?</label>
              <textarea name="problem" required rows={3} className="w-full p-3 rounded-xl border border-brand-gray/20 focus:border-brand-green outline-none resize-none" placeholder="Explain why this needs to exist..."></textarea>
            </div>
            <div>
              <label className="block text-sm font-bold text-brand-gray mb-2">Core Features (Scope)</label>
              <textarea name="features" required rows={3} className="w-full p-3 rounded-xl border border-brand-gray/20 focus:border-brand-green outline-none resize-none" placeholder="1. User Auth\n2. Dashboard View\n..."></textarea>
            </div>
            <div>
              <label className="block text-sm font-bold text-brand-gray mb-2">Why does this fit your career path?</label>
              <input name="relevance" required className="w-full p-3 rounded-xl border border-brand-gray/20 focus:border-brand-green outline-none" placeholder="It proves I can handle..." />
            </div>
            <div className="pt-4 border-t border-brand-gray/10">
              <button type="submit" className="w-full py-4 bg-brand-green text-brand-white font-bold rounded-xl shadow-md hover:bg-brand-green/90">Submit Proposal for Approval</button>
            </div>
          </form>
        </div>
      );
    }

    if (currentCapstoneView === 'building') {
      // Re-use a simplified milestone flow for capstone
      const setStage = (s) => updateProjectState('capstone', { stage: s });
      const stage = capstoneState.stage || 'building';

      if (stage === 'showcase') {
        const [link, setLink] = useState('');
        return (
          <div className="max-w-2xl mx-auto bg-brand-white p-10 rounded-3xl border border-brand-gray/20 text-center shadow-sm">
            <Trophy className="w-16 h-16 text-brand-green mx-auto mb-4" />
            <h2 className="text-3xl font-extrabold mb-4">Submit Capstone</h2>
            <p className="text-brand-gray mb-8">This is the final step. Ensure your GitHub repo is public and the live link works.</p>
            <input type="url" placeholder="https://github.com/..." className="w-full p-4 rounded-xl border border-brand-gray/20 mb-4 outline-none focus:border-brand-green" value={link} onChange={e => setLink(e.target.value)} required />
            <button onClick={() => { if(link) completeProject('capstone', link, proposal.title); }} className="w-full py-4 bg-brand-black text-brand-white font-bold rounded-xl hover:bg-brand-black">Finalize Capstone</button>
          </div>
        );
      }

      return (
        <div className="max-w-4xl mx-auto">
          <div className="bg-indigo-900 text-brand-white p-8 rounded-3xl mb-8 flex justify-between items-center shadow-lg">
            <div>
              <div className="text-indigo-300 text-sm font-bold uppercase tracking-wide mb-1">Approved Capstone</div>
              <h2 className="text-2xl font-extrabold">{proposal.title}</h2>
            </div>
            <div className="bg-brand-green/20 text-emerald-300 px-3 py-1 rounded-full font-bold flex items-center gap-2 border border-brand-green/30">
              <ShieldCheck className="w-4 h-4" /> Approved
            </div>
          </div>
          <div className="bg-brand-white p-8 rounded-3xl border border-brand-gray/20 shadow-sm text-center">
            <Rocket className="w-16 h-16 text-brand-gray/40 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-brand-black mb-2">Build Phase Active</h3>
            <p className="text-brand-gray mb-8 max-w-md mx-auto">You are now independently building your final capstone project based on your approved scope.</p>
            <button onClick={() => setStage('showcase')} className="px-8 py-4 bg-brand-green text-brand-white font-bold rounded-xl hover:bg-brand-green/90 transition-all shadow-md">
              I have finished building
            </button>
          </div>
        </div>
      );
    }
    
    if (currentCapstoneView === 'completed') {
       return (
        <div className="max-w-3xl mx-auto bg-brand-green/10 p-12 rounded-3xl border border-emerald-200 text-center">
          <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Trophy className="w-12 h-12 text-brand-green" />
          </div>
          <h2 className="text-3xl font-extrabold text-emerald-900 mb-4">Capstone Completed!</h2>
          <p className="text-emerald-800 text-lg mb-8">You have successfully proved your skills. Your profile is now portfolio-ready.</p>
        </div>
       )
    }

    return null;
  };

  // If a specific project from the library is selected, render its launchpad
  if (activeProjectView) {
    return <ProjectLaunchpad projectId={activeProjectView} onBack={() => setActiveProjectView(null)} />;
  }

  return (
    <div className="max-w-6xl mx-auto pb-20">
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold text-brand-black mb-2">Project Studio</h1>
        <p className="text-brand-gray text-lg">Learn by building. Practice with guided projects, then prove it with your capstone.</p>
      </div>

      {/* Tabs Header */}
      <div className="flex space-x-2 border-b border-brand-gray/20 mb-8 overflow-x-auto no-scrollbar">
        {[
          { id: 'library', label: 'Project Library', icon: BookOpen },
          { id: 'capstone', label: 'Final Capstone', icon: Trophy },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-6 py-4 font-bold border-b-2 whitespace-nowrap transition-colors ${
              activeTab === tab.id ? 'border-brand-green text-brand-green/90' : 'border-transparent text-brand-gray hover:text-brand-black hover:bg-brand-neutral'
            }`}
          >
            <tab.icon className={`w-5 h-5 ${activeTab === tab.id ? 'text-brand-green' : 'text-brand-gray/60'}`} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'library' && renderLibrary()}
      {activeTab === 'capstone' && renderCapstone()}
    </div>
  );
}
