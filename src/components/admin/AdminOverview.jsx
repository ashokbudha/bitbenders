import { Users, Building, Briefcase, GraduationCap, TrendingUp, ShieldCheck } from 'lucide-react';
// Removing mock data and replacing with static placeholders for UI refactor (Phase 4).
// Re-integration with admin-specific APIs happens when backend exposes them.

export default function AdminOverview() {
  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* High-Level Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-brand-white p-6 rounded-xl border border-brand-gray/20 shadow-sm flex items-center gap-4">
          <div className="p-4 bg-brand-green/10 text-brand-green rounded-xl"><Users className="w-8 h-8" /></div>
          <div>
            <h3 className="text-brand-gray font-medium text-sm">Total Students</h3>
            <p className="text-2xl font-display font-bold text-brand-black">1,204</p>
          </div>
        </div>
        <div className="bg-brand-white p-6 rounded-xl border border-brand-gray/20 shadow-sm flex items-center gap-4">
          <div className="p-4 bg-brand-green/10 text-brand-green rounded-xl"><Building className="w-8 h-8" /></div>
          <div>
            <h3 className="text-brand-gray font-medium text-sm">Verified HR</h3>
            <p className="text-2xl font-display font-bold text-brand-black">42 <span className="text-xs text-brand-gray/60 font-sans font-normal">/ 45</span></p>
          </div>
        </div>
        <div className="bg-brand-white p-6 rounded-xl border border-brand-gray/20 shadow-sm flex items-center gap-4">
          <div className="p-4 bg-brand-green/10 text-brand-green rounded-xl"><Briefcase className="w-8 h-8" /></div>
          <div>
            <h3 className="text-brand-gray font-medium text-sm">Active Opportunities</h3>
            <p className="text-2xl font-display font-bold text-brand-black">12</p>
          </div>
        </div>
        <div className="bg-brand-white p-6 rounded-xl border border-brand-gray/20 shadow-sm flex items-center gap-4">
          <div className="p-4 bg-brand-green/10 text-brand-green rounded-xl"><GraduationCap className="w-8 h-8" /></div>
          <div>
            <h3 className="text-brand-gray font-medium text-sm">Active Career Paths</h3>
            <p className="text-2xl font-display font-bold text-brand-black">5</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Moderation Actions / Audit */}
        <div className="bg-brand-white rounded-xl border border-brand-gray/20 shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-brand-black">Recent Platform Activity</h3>
            <button className="text-sm font-medium text-brand-green hover:underline">View Audit Log</button>
          </div>
          <div className="space-y-4">
            {[
              { text: "Approved HR Account: Himalaya Digital", icon: ShieldCheck },
              { text: "Moderated Opportunity: Frontend Intern", icon: Briefcase },
              { text: "New Student Signup Spike (+45 today)", icon: TrendingUp },
            ].map((log, idx) => (
              <div key={idx} className="flex items-center gap-4 p-3 rounded-lg bg-brand-neutral border border-brand-gray/10 hover:border-brand-green/30 transition-colors">
                <div className="p-2 rounded-lg text-brand-green bg-brand-green/10">
                  <log.icon className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium text-brand-black">{log.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Readiness Analytics */}
        <div className="bg-brand-white rounded-xl border border-brand-gray/20 shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-brand-black">Student Readiness</h3>
            <span className="px-2 py-1 bg-brand-neutral border border-brand-gray/10 text-brand-gray text-xs font-bold uppercase tracking-wider rounded-md">This Month</span>
          </div>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-semibold text-brand-gray">Course Completion Rate</span>
                <span className="text-brand-green font-bold">68%</span>
              </div>
              <div className="w-full bg-brand-neutral border border-brand-gray/10 rounded-full h-2">
                <div className="bg-brand-green h-2 rounded-full" style={{ width: '68%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-semibold text-brand-gray">Capstone Project Submissions</span>
                <span className="text-brand-green font-bold">42%</span>
              </div>
              <div className="w-full bg-brand-neutral border border-brand-gray/10 rounded-full h-2">
                <div className="bg-brand-green h-2 rounded-full" style={{ width: '42%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-semibold text-brand-gray">Opportunity Match Rate</span>
                <span className="text-brand-green font-bold">85%</span>
              </div>
              <div className="w-full bg-brand-neutral border border-brand-gray/10 rounded-full h-2">
                <div className="bg-brand-green h-2 rounded-full" style={{ width: '85%' }}></div>
              </div>
              <p className="text-xs text-brand-gray mt-2">85% of active students have at least one eligible opportunity match.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
