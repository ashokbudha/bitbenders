import { useEffect, useState } from 'react';
import { Briefcase, UserCheck, Search, Users, Activity } from 'lucide-react';
import api from '../../api/axios';

export default function HROverview() {
  const [pipeline, setPipeline] = useState([]);
  const [priorityCount, setPriorityCount] = useState(0);
  const [activity, setActivity] = useState([]);
  const [readiness, setReadiness] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [pipelineRes, priorityRes, activityRes, readinessRes] = await Promise.all([
          api.get('/api/dashboard/pipeline'),
          api.get('/api/dashboard/priority-candidates'),
          api.get('/api/dashboard/recent-activity'),
          api.get('/api/dashboard/readiness-by-role')
        ]);
        setPipeline(pipelineRes.data);
        setPriorityCount(priorityRes.data.length);
        setActivity(activityRes.data);
        setReadiness(readinessRes.data);
      } catch (err) {
        console.error('Failed to fetch HR dashboard data', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  if (loading) {
    return <div className="p-8 text-center text-brand-gray font-medium">Loading Dashboard...</div>;
  }

  const activeOpportunities = pipeline.reduce((acc, curr) => acc + parseInt(curr.count || 0), 0);
  const shortlistedCount = pipeline.find(p => p.stage === 'Shortlisted' || p.stage === 'Interview')?.count || 0;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1 */}
        <div className="bg-brand-white p-6 rounded-xl border border-brand-gray/20 shadow-sm flex items-center gap-4">
          <div className="p-4 bg-brand-green/10 text-brand-green rounded-xl">
            <Briefcase className="w-8 h-8" />
          </div>
          <div>
            <p className="text-brand-gray font-medium text-sm">Total Pipeline</p>
            <p className="text-2xl font-display font-bold text-brand-black">{activeOpportunities}</p>
          </div>
        </div>
        {/* Card 2 */}
        <div className="bg-brand-white p-6 rounded-xl border border-brand-gray/20 shadow-sm flex items-center gap-4">
          <div className="p-4 bg-brand-green/10 text-brand-green rounded-xl">
            <UserCheck className="w-8 h-8" />
          </div>
          <div>
            <p className="text-brand-gray font-medium text-sm">Priority Candidates</p>
            <p className="text-2xl font-display font-bold text-brand-black">{priorityCount}</p>
          </div>
        </div>
        {/* Card 3 */}
        <div className="bg-brand-white p-6 rounded-xl border border-brand-gray/20 shadow-sm flex items-center gap-4">
          <div className="p-4 bg-brand-green/10 text-brand-green rounded-xl">
            <Search className="w-8 h-8" />
          </div>
          <div>
            <p className="text-brand-gray font-medium text-sm">Roles Tracked</p>
            <p className="text-2xl font-display font-bold text-brand-black">{readiness.length}</p>
          </div>
        </div>
        {/* Card 4 */}
        <div className="bg-brand-white p-6 rounded-xl border border-brand-gray/20 shadow-sm flex items-center gap-4">
          <div className="p-4 bg-brand-green/10 text-brand-green rounded-xl">
            <Users className="w-8 h-8" />
          </div>
          <div>
            <p className="text-brand-gray font-medium text-sm">In Review</p>
            <p className="text-2xl font-display font-bold text-brand-black">{shortlistedCount}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity List */}
        <div className="bg-brand-white rounded-xl border border-brand-gray/20 shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-brand-black">Recent Activity</h3>
          </div>
          <div className="space-y-4">
            {activity.length === 0 ? (
              <p className="text-sm text-brand-gray italic">No recent activity found.</p>
            ) : activity.slice(0, 5).map((act, i) => (
              <div key={i} className="flex items-center gap-4 p-3 rounded-lg bg-brand-neutral border border-brand-gray/10">
                <div className="p-2 rounded-lg text-brand-green bg-brand-green/10">
                  <Activity className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm font-medium text-brand-black">{act.full_name || 'Candidate'} moved to {act.action}.</p>
                  <p className="text-xs text-brand-gray">{new Date(act.date).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Readiness List */}
        <div className="bg-brand-white rounded-xl border border-brand-gray/20 shadow-sm p-6">
          <h3 className="text-lg font-bold text-brand-black mb-6">Talent Readiness By Role</h3>
          <div className="flex flex-col gap-4">
            {readiness.length === 0 ? (
              <p className="text-sm text-brand-gray italic">No role data found.</p>
            ) : readiness.map(r => (
              <div key={r.target_role} className="flex justify-between items-center bg-brand-neutral p-4 rounded-lg border border-brand-gray/10">
                <div>
                  <p className="font-semibold text-brand-black">{r.target_role || 'Unassigned'}</p>
                  <p className="text-sm text-brand-gray">{r.candidate_count} candidates</p>
                </div>
                <div className="text-right">
                  <p className="font-display font-bold text-brand-green text-lg">{r.avg_readiness}%</p>
                  <p className="text-xs text-brand-gray uppercase tracking-wider">Avg Readiness</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
