import { useState } from 'react';
import { useStudent } from '../context/StudentContext';
import { JOBS, ROADMAPS } from '../data/mockData';
import { Briefcase, MapPin, Building, CheckCircle2, AlertCircle, Bookmark, Send } from 'lucide-react';

export default function OpportunitiesPage() {
  const { careerPath, completedCourses, completedProjects } = useStudent();
  const [savedJobs, setSavedJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);

  if (!careerPath) {
    return (
      <div className="p-8 text-center text-slate-500 bg-white rounded-3xl border border-slate-200 shadow-sm">
        <Briefcase className="w-12 h-12 text-slate-300 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-slate-900 mb-2">Select a Career Path First</h3>
        <p>You need to select a career path to discover relevant opportunities.</p>
      </div>
    );
  }

  // Filter jobs by the student's career path
  const relevantJobs = JOBS.filter(job => job.roleId === careerPath);

  const calculateReadiness = (job) => {
    const requiredCourses = job.requirements?.courses || [];
    const requiredProjectsCount = job.requirements?.projects || 0;

    const missingCourses = requiredCourses.filter(cId => !completedCourses.includes(cId));
    const missingProjectsCount = Math.max(0, requiredProjectsCount - completedProjects.length);

    if (missingCourses.length === 0 && missingProjectsCount === 0) {
      return { status: 'eligible', label: 'Ready to Apply', color: 'bg-emerald-100 text-emerald-800 border-emerald-200', icon: CheckCircle2 };
    }
    
    // Partially eligible
    return { 
      status: 'missing', 
      label: 'Needs Preparation', 
      color: 'bg-amber-100 text-amber-800 border-amber-200', 
      icon: AlertCircle,
      missingCourses,
      missingProjectsCount
    };
  };

  const handleSave = (id) => {
    setSavedJobs(prev => prev.includes(id) ? prev.filter(jId => jId !== id) : [...prev, id]);
  };

  const handleApply = (id) => {
    if (!appliedJobs.includes(id)) {
      setAppliedJobs([...appliedJobs, id]);
    }
  };

  const roadmapMap = ROADMAPS[careerPath] || [];

  return (
    <div className="animate-in fade-in duration-500 max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Matched Opportunities</h1>
        <p className="text-slate-600">Internships, traineeships, and junior roles tailored to your learning progress.</p>
      </div>

      <div className="grid gap-6">
        {relevantJobs.length === 0 ? (
          <div className="p-8 text-center text-slate-500 bg-white rounded-3xl border border-slate-200 border-dashed">
            No opportunities currently available for your path. Keep learning!
          </div>
        ) : (
          relevantJobs.map(job => {
            const readiness = calculateReadiness(job);
            const isSaved = savedJobs.includes(job.id);
            const isApplied = appliedJobs.includes(job.id);

            return (
              <div key={job.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col md:flex-row transition-all hover:shadow-md">
                <div className="p-6 flex-1 border-b md:border-b-0 md:border-r border-slate-100">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-50 text-indigo-600 mb-3 border border-indigo-100">
                        {job.type}
                      </span>
                      <h3 className="text-xl font-bold text-slate-900">{job.title}</h3>
                      <div className="flex items-center gap-4 text-slate-500 text-sm mt-2 font-medium">
                        <span className="flex items-center gap-1.5"><Building className="w-4 h-4" /> {job.company}</span>
                        <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {job.location}</span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-slate-600 text-sm leading-relaxed mb-4">{job.expectations}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    {job.requirements?.skills.map((skill, idx) => (
                      <span key={idx} className="bg-slate-50 border border-slate-200 text-slate-600 text-xs font-semibold px-2.5 py-1 rounded-md">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-6 md:w-72 bg-slate-50 flex flex-col justify-between">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">Readiness Status</h4>
                    <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-semibold text-sm ${readiness.color} mb-4`}>
                      <readiness.icon className="w-4 h-4" /> {readiness.label}
                    </div>

                    {readiness.status === 'missing' && (
                      <div className="text-sm text-slate-600 mb-4 bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
                        <p className="font-semibold text-slate-800 mb-1 text-xs uppercase">Missing Requirements:</p>
                        <ul className="list-disc list-inside space-y-1 text-xs">
                          {readiness.missingCourses?.map(cId => {
                            const course = roadmapMap.find(c => c.id === cId);
                            return <li key={cId}>{course?.title || 'Required Course'}</li>;
                          })}
                          {readiness.missingProjectsCount > 0 && (
                            <li>{readiness.missingProjectsCount} Capstone Project(s)</li>
                          )}
                        </ul>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-3 mt-4">
                    <button 
                      onClick={() => handleSave(job.id)}
                      className={`p-2.5 rounded-xl border font-medium transition-colors ${isSaved ? 'bg-indigo-50 border-indigo-200 text-indigo-600' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                      title={isSaved ? "Saved" : "Save Opportunity"}
                    >
                      <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
                    </button>
                    
                    <button 
                      onClick={() => handleApply(job.id)}
                      disabled={isApplied || readiness.status === 'missing'}
                      className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold transition-all shadow-sm ${
                        isApplied 
                          ? 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
                          : readiness.status === 'missing'
                            ? 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
                            : 'bg-indigo-600 hover:bg-indigo-700 text-white border border-transparent'
                      }`}
                    >
                      {isApplied ? 'Expressed Interest' : (
                        <>
                          <Send className="w-4 h-4" /> Express Interest
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
