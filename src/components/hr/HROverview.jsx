import { useEffect, useMemo, useState } from 'react';
import { Activity, ArrowRightLeft, Briefcase, Search, UserCheck, Users } from 'lucide-react';
import api from '../../api/axios';

export default function HROverview() {
  const [pipeline, setPipeline] = useState([]);
  const [topCandidates, setTopCandidates] = useState([]);
  const [priorityCandidates, setPriorityCandidates] = useState([]);
  const [funnelMovements, setFunnelMovements] = useState([]);
  const [readiness, setReadiness] = useState([]);
  const [activity, setActivity] = useState([]);
  const [loading, setLoading] = useState({
    pipeline: true,
    topCandidates: true,
    priorityCandidates: true,
    funnelMovements: true,
    readiness: true,
    activity: true,
  });
  const [errors, setErrors] = useState({
    pipeline: null,
    topCandidates: null,
    priorityCandidates: null,
    funnelMovements: null,
    readiness: null,
    activity: null,
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      const endpointConfig = [
        { key: 'pipeline', path: '/api/dashboard/pipeline', setter: setPipeline },
        { key: 'topCandidates', path: '/api/dashboard/top-candidates', setter: setTopCandidates },
        { key: 'priorityCandidates', path: '/api/dashboard/priority-candidates', setter: setPriorityCandidates },
        { key: 'funnelMovements', path: '/api/dashboard/funnel-movements', setter: setFunnelMovements },
        { key: 'readiness', path: '/api/dashboard/readiness-by-role', setter: setReadiness },
        { key: 'activity', path: '/api/dashboard/recent-activity', setter: setActivity },
      ];

      await Promise.all(
        endpointConfig.map(async ({ key, path, setter }) => {
          try {
            const response = await api.get(path);
            setter(Array.isArray(response.data) ? response.data : []);
          } catch (err) {
            console.error(`Failed to load ${key}`, err);
            setErrors((prev) => ({
              ...prev,
              [key]: err.response?.data?.error || 'Could not load data',
            }));
          } finally {
            setLoading((prev) => ({
              ...prev,
              [key]: false,
            }));
          }
        })
      );
    };

    fetchDashboardData();
  }, []);

  const activePipelineCount = useMemo(
    () => pipeline.reduce((acc, curr) => acc + Number.parseInt(curr.count || 0, 10), 0),
    [pipeline]
  );
  const inReviewCount = useMemo(() => {
    const shortlisted = pipeline.find((entry) => entry.stage === 'Shortlisted');
    const interview = pipeline.find((entry) => entry.stage === 'Interview');
    return Number.parseInt(shortlisted?.count || 0, 10) + Number.parseInt(interview?.count || 0, 10);
  }, [pipeline]);
  const recentMovementCount = useMemo(
    () => funnelMovements.reduce((acc, movement) => acc + Number.parseInt(movement.movement_count || 0, 10), 0),
    [funnelMovements]
  );
  const hasLowMovement = !loading.funnelMovements && !errors.funnelMovements && recentMovementCount < 3;
  const priorityCount = priorityCandidates.length;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-brand-white p-6 rounded-xl border border-brand-gray/20 shadow-sm flex items-center gap-4">
          <div className="p-4 bg-brand-green/10 text-brand-green rounded-xl">
            <Briefcase className="w-8 h-8" />
          </div>
          <div>
            <p className="text-brand-gray font-medium text-sm">Total Pipeline</p>
            <p className="text-xs text-brand-gray/80">Candidates currently in pipeline</p>
            <p className="text-2xl font-display font-bold text-brand-black">
              {loading.pipeline ? '...' : errors.pipeline ? 'N/A' : activePipelineCount}
            </p>
          </div>
        </div>

        <div className="bg-brand-white p-6 rounded-xl border border-brand-gray/20 shadow-sm flex items-center gap-4">
          <div className="p-4 bg-brand-green/10 text-brand-green rounded-xl">
            <UserCheck className="w-8 h-8" />
          </div>
          <div>
            <p className="text-brand-gray font-medium text-sm">Priority Candidates</p>
            <p className="text-2xl font-display font-bold text-brand-black">
              {loading.priorityCandidates ? '...' : errors.priorityCandidates ? 'N/A' : priorityCount}
            </p>
            {!loading.priorityCandidates && !errors.priorityCandidates && priorityCount === 0 ? (
              <p className="text-xs text-brand-gray mt-1">No priority candidates yet.</p>
            ) : null}
          </div>
        </div>

        <div className="bg-brand-white p-6 rounded-xl border border-brand-gray/20 shadow-sm flex items-center gap-4">
          <div className="p-4 bg-brand-green/10 text-brand-green rounded-xl">
            <Search className="w-8 h-8" />
          </div>
          <div>
            <p className="text-brand-gray font-medium text-sm">Roles Tracked</p>
            <p className="text-2xl font-display font-bold text-brand-black">
              {loading.readiness ? '...' : errors.readiness ? 'N/A' : readiness.length}
            </p>
          </div>
        </div>

        <div className="bg-brand-white p-6 rounded-xl border border-brand-gray/20 shadow-sm flex items-center gap-4">
          <div className="p-4 bg-brand-green/10 text-brand-green rounded-xl">
            <Users className="w-8 h-8" />
          </div>
          <div>
            <p className="text-brand-gray font-medium text-sm">In Review</p>
            <p className="text-xs text-brand-gray/80">Recently moved (30 days)</p>
            <p className="text-2xl font-display font-bold text-brand-black">
              {loading.funnelMovements ? '...' : errors.funnelMovements ? 'N/A' : recentMovementCount}
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-brand-green/20 bg-brand-green/10 p-5">
        <h3 className="text-lg font-bold text-brand-black mb-2">Today&apos;s Focus</h3>
        {errors.priorityCandidates || errors.funnelMovements ? (
          <p className="text-sm text-red-600">
            Dashboard narrative is unavailable while some data sources are failing.
          </p>
        ) : priorityCount === 0 ? (
          <p className="text-sm text-brand-gray">
            No priority candidates. Review top candidates and shortlist promising profiles to build a stronger hiring queue.
          </p>
        ) : hasLowMovement ? (
          <p className="text-sm text-brand-gray">
            Pipeline is slow. Move candidates forward from shortlisted to interview to improve funnel momentum.
          </p>
        ) : (
          <p className="text-sm text-brand-gray">
            Priority candidates are available and the funnel is active. Focus on interview scheduling and final stage conversions.
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-brand-white rounded-xl border border-brand-gray/20 shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-brand-black">Recent Activity</h3>
          </div>
          <div className="space-y-4">
            {loading.activity ? (
              <p className="text-sm text-brand-gray italic">Loading recent activity...</p>
            ) : errors.activity ? (
              <p className="text-sm text-red-600">Could not load recent activity: {errors.activity}</p>
            ) : activity.length === 0 ? (
              <p className="text-sm text-brand-gray italic">No recent activity found.</p>
            ) : (
              activity.slice(0, 5).map((act, index) => (
                <div key={`${act.full_name || 'candidate'}-${act.date}-${index}`} className="flex items-center gap-4 p-3 rounded-lg bg-brand-neutral border border-brand-gray/10">
                  <div className="p-2 rounded-lg text-brand-green bg-brand-green/10">
                    <Activity className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-brand-black">{act.full_name || 'Candidate'} moved to {act.action}.</p>
                    <p className="text-xs text-brand-gray">{new Date(act.date).toLocaleDateString()}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="bg-brand-white rounded-xl border border-brand-gray/20 shadow-sm p-6">
          <h3 className="text-lg font-bold text-brand-black mb-6">Talent Readiness By Role</h3>
          <div className="flex flex-col gap-4">
            {loading.readiness ? (
              <p className="text-sm text-brand-gray italic">Loading readiness by role...</p>
            ) : errors.readiness ? (
              <p className="text-sm text-red-600">Could not load readiness data: {errors.readiness}</p>
            ) : readiness.length === 0 ? (
              <p className="text-sm text-brand-gray italic">No role data found.</p>
            ) : (
              readiness.map((entry) => (
                <div key={entry.target_role || 'unassigned'} className="flex justify-between items-center bg-brand-neutral p-4 rounded-lg border border-brand-gray/10">
                  <div>
                    <p className="font-semibold text-brand-black">{entry.target_role || 'Unassigned'}</p>
                    <p className="text-sm text-brand-gray">{entry.candidate_count} candidates</p>
                  </div>
                  <div className="text-right">
                    <p className="font-display font-bold text-brand-green text-lg">{entry.avg_readiness}%</p>
                    <p className="text-xs text-brand-gray uppercase tracking-wider">Avg Readiness</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-brand-white rounded-xl border border-brand-gray/20 shadow-sm p-6">
          <h3 className="text-lg font-bold text-brand-black mb-6">Top Candidates</h3>
          <div className="space-y-4">
            {loading.topCandidates ? (
              <p className="text-sm text-brand-gray italic">Loading top candidates...</p>
            ) : errors.topCandidates ? (
              <p className="text-sm text-red-600">Could not load top candidates: {errors.topCandidates}</p>
            ) : topCandidates.length === 0 ? (
              <p className="text-sm text-brand-gray italic">No top candidates found yet.</p>
            ) : (
              topCandidates.slice(0, 6).map((candidate) => (
                <div key={candidate.candidate_id} className="flex items-center justify-between bg-brand-neutral p-4 rounded-lg border border-brand-gray/10">
                  <div>
                    <p className="font-semibold text-brand-black">{candidate.full_name}</p>
                    <p className="text-xs text-brand-gray uppercase tracking-wider">{candidate.target_role || 'Unassigned'}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-display font-bold text-brand-green">{candidate.readiness_score}%</p>
                    <p className="text-xs text-brand-gray">readiness</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="bg-brand-white rounded-xl border border-brand-gray/20 shadow-sm p-6">
          <h3 className="text-lg font-bold text-brand-black mb-6">Funnel Movements (30 days)</h3>
          <div className="space-y-4">
            {loading.funnelMovements ? (
              <p className="text-sm text-brand-gray italic">Loading funnel movements...</p>
            ) : errors.funnelMovements ? (
              <p className="text-sm text-red-600">Could not load funnel movements: {errors.funnelMovements}</p>
            ) : funnelMovements.length === 0 ? (
              <p className="text-sm text-brand-gray italic">No funnel activity in the last 30 days.</p>
            ) : (
              funnelMovements.map((movement) => (
                <div key={movement.to_stage} className="flex items-center justify-between bg-brand-neutral p-4 rounded-lg border border-brand-gray/10">
                  <div className="flex items-center gap-2 text-brand-black font-medium">
                    <ArrowRightLeft className="w-4 h-4 text-brand-green" />
                    {movement.to_stage}
                  </div>
                  <span className="text-sm font-semibold text-brand-gray">{movement.movement_count} movements</span>
                </div>
              ))
            )}
            {!loading.funnelMovements && !errors.funnelMovements && funnelMovements.length > 0 ? (
              <p className="text-xs text-brand-gray">In review this cycle: {inReviewCount}</p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
