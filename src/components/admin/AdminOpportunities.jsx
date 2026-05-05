import { useState } from 'react';
import { JOBS, ROADMAPS } from '../../data/mockData';
import { Briefcase, Building, CheckCircle, XCircle, AlertTriangle, Settings } from 'lucide-react';

export default function AdminOpportunities() {
  const [opportunities, setOpportunities] = useState(
    JOBS.map(job => ({ ...job, moderationStatus: 'approved' }))
  );

  const handleModeration = (id, status) => {
    setOpportunities(opportunities.map(job => 
      job.id === id ? { ...job, moderationStatus: status } : job
    ));
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Opportunities Moderation</h2>
          <p className="text-slate-500 text-sm">Review, approve, or reject HR-posted opportunities to maintain quality.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 font-medium rounded-xl hover:bg-slate-50 transition-colors shadow-sm">
          <Settings className="w-5 h-5" /> Readiness Rules
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase text-xs font-semibold">
            <tr>
              <th className="px-6 py-4">Opportunity</th>
              <th className="px-6 py-4">Company</th>
              <th className="px-6 py-4">Required Readiness</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Moderation</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {opportunities.map(job => (
              <tr key={job.id} className="hover:bg-slate-50">
                <td className="px-6 py-4">
                  <div className="font-bold text-slate-900">{job.title}</div>
                  <div className="text-slate-500 text-xs flex items-center gap-2 mt-1">
                    <span className="uppercase tracking-wider font-semibold text-indigo-600">{job.type}</span>
                    &bull;
                    <span>{job.location}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 font-medium text-slate-700">
                    <Building className="w-4 h-4 text-slate-400" /> {job.company}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-xs space-y-1">
                    <div className="text-slate-600"><span className="font-bold text-slate-800">{job.requirements?.courses.length || 0}</span> Courses</div>
                    <div className="text-slate-600"><span className="font-bold text-slate-800">{job.requirements?.projects || 0}</span> Capstone</div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  {job.moderationStatus === 'approved' && <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 text-xs font-bold"><CheckCircle className="w-3.5 h-3.5" /> Approved</span>}
                  {job.moderationStatus === 'pending' && <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-amber-50 text-amber-700 text-xs font-bold"><AlertTriangle className="w-3.5 h-3.5" /> Pending</span>}
                  {job.moderationStatus === 'rejected' && <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-red-50 text-red-700 text-xs font-bold"><XCircle className="w-3.5 h-3.5" /> Rejected</span>}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    {job.moderationStatus !== 'approved' && (
                      <button onClick={() => handleModeration(job.id, 'approved')} className="text-xs bg-emerald-50 text-emerald-700 hover:bg-emerald-100 px-3 py-1.5 rounded-lg font-semibold transition-colors">
                        Approve
                      </button>
                    )}
                    {job.moderationStatus !== 'rejected' && (
                      <button onClick={() => handleModeration(job.id, 'rejected')} className="text-xs bg-red-50 text-red-700 hover:bg-red-100 px-3 py-1.5 rounded-lg font-semibold transition-colors">
                        Reject
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
