import { Briefcase, UserCheck, Search, Users, Activity } from 'lucide-react';
import { JOBS, MOCK_STUDENTS } from '../../data/mockData';

export default function HROverview() {
  const activeOpportunities = JOBS.length; // Mock count
  const readyCandidates = MOCK_STUDENTS.filter(s => s.completedProjects.length > 0).length;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-4 bg-indigo-50 text-indigo-600 rounded-2xl"><Briefcase className="w-8 h-8" /></div>
          <div>
            <h3 className="text-slate-500 font-semibold text-sm">Active Postings</h3>
            <p className="text-2xl font-bold text-slate-900">{activeOpportunities}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl"><UserCheck className="w-8 h-8" /></div>
          <div>
            <h3 className="text-slate-500 font-semibold text-sm">Ready Candidates</h3>
            <p className="text-2xl font-bold text-slate-900">{readyCandidates}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-4 bg-purple-50 text-purple-600 rounded-2xl"><Search className="w-8 h-8" /></div>
          <div>
            <h3 className="text-slate-500 font-semibold text-sm">Total Discovery Profile Views</h3>
            <p className="text-2xl font-bold text-slate-900">124</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-4 bg-amber-50 text-amber-600 rounded-2xl"><Users className="w-8 h-8" /></div>
          <div>
            <h3 className="text-slate-500 font-semibold text-sm">Shortlisted Candidates</h3>
            <p className="text-2xl font-bold text-slate-900">12</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-slate-900">Recent Candidate Activity</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-3 rounded-xl bg-slate-50 border border-slate-100">
              <div className="p-2 rounded-lg text-indigo-500 bg-indigo-50"><Activity className="w-4 h-4" /></div>
              <div>
                <p className="text-sm font-medium text-slate-700">Aayush Sharma expressed interest in Frontend Intern.</p>
                <p className="text-xs text-slate-500">2 hours ago &bull; 100% Match</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-3 rounded-xl bg-slate-50 border border-slate-100">
              <div className="p-2 rounded-lg text-emerald-500 bg-emerald-50"><UserCheck className="w-4 h-4" /></div>
              <div>
                <p className="text-sm font-medium text-slate-700">Pooja Thapa completed HTML/CSS Course.</p>
                <p className="text-xs text-slate-500">5 hours ago &bull; Needs 2 more courses</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Most Useful Skills in Talent Pool</h3>
          <div className="flex flex-wrap gap-2">
            {['React', 'HTML', 'JavaScript', 'Social Media', 'Git', 'CSS', 'Meta Ads'].map(skill => (
              <span key={skill} className="px-3 py-1.5 bg-slate-100 border border-slate-200 rounded-lg text-sm font-semibold text-slate-700">
                {skill}
              </span>
            ))}
          </div>
          <p className="text-xs text-slate-500 mt-4">These are the most common validated skills held by students active on the platform today.</p>
        </div>
      </div>
    </div>
  );
}
