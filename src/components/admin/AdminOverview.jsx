import { Users, Building, Briefcase, GraduationCap, TrendingUp, ShieldCheck } from 'lucide-react';
import { JOBS, ROLES } from '../../data/mockData';

export default function AdminOverview() {
  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* High-Level Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-4 bg-indigo-50 text-indigo-600 rounded-2xl"><Users className="w-8 h-8" /></div>
          <div>
            <h3 className="text-slate-500 font-semibold text-sm">Total Students</h3>
            <p className="text-2xl font-bold text-slate-900">1,204</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl"><Building className="w-8 h-8" /></div>
          <div>
            <h3 className="text-slate-500 font-semibold text-sm">Verified HR / Companies</h3>
            <p className="text-2xl font-bold text-slate-900">42 <span className="text-xs text-slate-400 font-normal">/ 45</span></p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-4 bg-amber-50 text-amber-600 rounded-2xl"><Briefcase className="w-8 h-8" /></div>
          <div>
            <h3 className="text-slate-500 font-semibold text-sm">Active Opportunities</h3>
            <p className="text-2xl font-bold text-slate-900">{JOBS.length}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-4 bg-purple-50 text-purple-600 rounded-2xl"><GraduationCap className="w-8 h-8" /></div>
          <div>
            <h3 className="text-slate-500 font-semibold text-sm">Active Career Paths</h3>
            <p className="text-2xl font-bold text-slate-900">{ROLES.length}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Moderation Actions / Audit */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-slate-900">Recent Platform Activity</h3>
            <button className="text-sm font-medium text-indigo-600 hover:text-indigo-800">View Audit Log</button>
          </div>
          <div className="space-y-4">
            {[
              { text: "Approved HR Account: Himalaya Digital", icon: ShieldCheck, color: "text-emerald-500 bg-emerald-50" },
              { text: "Moderated Opportunity: Frontend Intern", icon: Briefcase, color: "text-indigo-500 bg-indigo-50" },
              { text: "New Student Signup Spike (+45 today)", icon: TrendingUp, color: "text-purple-500 bg-purple-50" },
            ].map((log, idx) => (
              <div key={idx} className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors">
                <div className={`p-2 rounded-lg ${log.color}`}>
                  <log.icon className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium text-slate-700">{log.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Readiness Analytics */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-slate-900">Student Readiness</h3>
            <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-wider rounded-md">This Month</span>
          </div>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-semibold text-slate-700">Course Completion Rate</span>
                <span className="text-indigo-600 font-bold">68%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div className="bg-indigo-500 h-2 rounded-full" style={{ width: '68%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-semibold text-slate-700">Capstone Project Submissions</span>
                <span className="text-emerald-600 font-bold">42%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '42%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-semibold text-slate-700">Opportunity Match Rate</span>
                <span className="text-purple-600 font-bold">85%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div className="bg-purple-500 h-2 rounded-full" style={{ width: '85%' }}></div>
              </div>
              <p className="text-xs text-slate-500 mt-2">85% of active students have at least one eligible opportunity match.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
