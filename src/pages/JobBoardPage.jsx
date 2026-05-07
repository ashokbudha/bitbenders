import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { JOBS, ROLES } from '../data/mockData';
import { Building2, Navigation, CheckCircle2, Upload, X } from 'lucide-react';

export default function JobBoardPage() {
  const navigate = useNavigate();
  const [roleId, setRoleId] = useState(null);
  const [projectLink, setProjectLink] = useState('');
  const [selectedJob, setSelectedJob] = useState(null);
  const [isApplying, setIsApplying] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);

  useEffect(() => {
    const savedRole = localStorage.getItem('student_role');
    if (!savedRole) {
      navigate('/');
      return;
    }
    setRoleId(savedRole);
    setProjectLink(localStorage.getItem(`project_link_${savedRole}`) || '');
  }, [navigate]);

  if (!roleId) return null;

  const role = ROLES.find(r => r.id === roleId);
  const roleJobs = JOBS.filter(job => job.roleId === roleId);

  const handleApplyClick = (job) => {
    setSelectedJob(job);
    setIsApplying(true);
    setHasApplied(false);
  };

  const handleCloseModal = () => {
    setIsApplying(false);
    setSelectedJob(null);
  };

  const handleConfirmApplication = (e) => {
    e.preventDefault();
    setHasApplied(true);
    setTimeout(() => {
      handleCloseModal();
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-extrabold text-brand-black mb-4">Fresher Job Opportunities</h1>
        <p className="text-lg text-brand-gray">
          Showing entry-level roles and internships for <span className="font-semibold">{role?.title}</span>.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {roleJobs.map(job => (
          <div key={job.id} className="bg-brand-white rounded-2xl border border-brand-gray/20 p-6 flex flex-col hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-brand-gray/10 flex items-center justify-center shrink-0">
                <Building2 className="w-6 h-6 text-brand-gray" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-brand-black">{job.title}</h2>
                <p className="text-sm font-medium text-brand-gray">{job.company}</p>
              </div>
            </div>
            
            <div className="mb-6 flex-1">
              <h3 className="text-xs font-bold uppercase tracking-wider text-brand-gray mb-2">Expectations</h3>
              <p className="text-sm text-brand-gray">{job.expectations}</p>
            </div>
            
            <button
              onClick={() => handleApplyClick(job)}
              className="w-full py-3 px-4 bg-brand-green/10 hover:bg-indigo-100 text-brand-green/90 font-bold rounded-xl flex items-center justify-center gap-2 transition-colors"
            >
              Apply Now
              <Navigation className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {isApplying && selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-black/50 backdrop-blur-sm animate-in fade-in">
          <div className="bg-brand-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            {hasApplied ? (
              <div className="p-10 text-center">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h2 className="text-2xl font-bold text-brand-black mb-2">Application Sent!</h2>
                <p className="text-brand-gray">Your profile and project have been sent to {selectedJob.company}.</p>
              </div>
            ) : (
              <>
                <div className="px-6 py-4 border-b border-brand-gray/10 flex items-center justify-between bg-brand-neutral">
                  <h2 className="text-lg font-bold text-brand-black">Apply to {selectedJob.company}</h2>
                  <button onClick={handleCloseModal} className="p-2 text-brand-gray/60 hover:text-brand-gray rounded-full hover:bg-brand-gray/20 transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                <form onSubmit={handleConfirmApplication} className="p-6 space-y-6">
                  <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-bold text-green-900 text-sm">Readiness Verified</h3>
                      <p className="text-xs text-green-800/80">You have completed the required roadmap and checklist.</p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-brand-gray mb-2">Your Portfolio/Project Link (Included)</label>
                    <input 
                      type="text" 
                      readOnly 
                      value={projectLink} 
                      className="w-full px-4 py-3 bg-brand-neutral rounded-xl border border-brand-gray/20 text-brand-gray text-sm cursor-not-allowed"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-brand-gray mb-2">Resume / CV (Optional)</label>
                    <div className="border-2 border-dashed border-brand-gray/40 rounded-xl p-6 text-center hover:bg-brand-neutral transition-colors cursor-pointer">
                      <Upload className="w-6 h-6 text-brand-gray/60 mx-auto mb-2" />
                      <span className="text-sm text-brand-gray">Click to upload or drag and drop</span>
                    </div>
                    <p className="text-xs text-brand-gray mt-2">Companies will primarily look at your project. A CV is secondary.</p>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-brand-green hover:bg-brand-green/90 text-brand-white font-bold rounded-xl transition-colors shadow-md text-lg"
                  >
                    Confirm Application
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
