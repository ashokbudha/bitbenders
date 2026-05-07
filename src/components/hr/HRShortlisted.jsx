import { useEffect, useMemo, useState } from 'react';
import api from '../../api/axios';
import DataCard from './DataCard';
import DataTable from './DataTable';
import EmptyState from './EmptyState';

const toNumber = (value) => Number.parseFloat(value || 0);

export default function HRShortlisted() {
  const [search, setSearch] = useState('');
  const [shortlisted, setShortlisted] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const timer = window.setTimeout(async () => {
      try {
        setLoading(true);
        setError(null);

        const [shortlistedResponse, activityResponse] = await Promise.all([
          api.get('/api/talent/shortlisted', {
            params: search.trim() ? { search: search.trim() } : undefined,
          }),
          api.get('/api/dashboard/recent-activity'),
        ]);

        setShortlisted(Array.isArray(shortlistedResponse.data) ? shortlistedResponse.data : []);
        setRecentActivity(Array.isArray(activityResponse.data) ? activityResponse.data : []);
      } catch (requestError) {
        console.error('Failed to load shortlisted candidates', requestError);
        setShortlisted([]);
        setRecentActivity([]);
        setError(requestError.response?.data?.error || 'Could not load shortlisted candidates.');
      } finally {
        setLoading(false);
      }
    }, 250);

    return () => {
      window.clearTimeout(timer);
    };
  }, [search]);

  const shortlistedActivityByName = useMemo(() => {
    const lookup = {};
    recentActivity
      .filter((entry) => entry.action === 'Shortlisted')
      .forEach((entry) => {
        if (!lookup[entry.full_name]) {
          lookup[entry.full_name] = entry.date;
        }
      });
    return lookup;
  }, [recentActivity]);

  const metrics = useMemo(() => {
    const total = shortlisted.length;
    const highReadiness = shortlisted.filter((candidate) => toNumber(candidate.readiness_score) >= 80).length;
    const averageReadiness =
      total > 0
        ? (shortlisted.reduce((sum, candidate) => sum + toNumber(candidate.readiness_score), 0) / total).toFixed(1)
        : '0.0';

    return { total, highReadiness, averageReadiness };
  }, [shortlisted]);

  const columns = [
    {
      key: 'full_name',
      label: 'Candidate',
      render: (candidate) => (
        <div>
          <p className="font-semibold text-brand-black">{candidate.full_name}</p>
          <p className="text-xs text-brand-gray">ID: {candidate.candidate_id}</p>
        </div>
      ),
    },
    {
      key: 'target_role',
      label: 'Role',
      render: (candidate) => candidate.target_role || 'Unassigned',
    },
    {
      key: 'current_stage',
      label: 'Stage',
      render: (candidate) => (
        <span className="rounded-full border border-brand-green/20 bg-brand-green/10 px-3 py-1 text-xs font-bold text-brand-green">
          {candidate.current_stage}
        </span>
      ),
    },
    {
      key: 'readiness_score',
      label: 'Readiness',
      headerClassName: 'text-right',
      cellClassName: 'text-right',
      render: (candidate) => (
        <span className="font-semibold text-brand-black">{toNumber(candidate.readiness_score).toFixed(1)}%</span>
      ),
    },
    {
      key: 'last_shortlisted_date',
      label: 'Recent Shortlist Activity',
      render: (candidate) => {
        const date = shortlistedActivityByName[candidate.full_name];
        return date ? new Date(date).toLocaleDateString() : 'No recent update';
      },
    },
  ];

  const hasNoResults = !loading && !error && shortlisted.length === 0;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div>
        <h2 className="text-2xl font-bold text-brand-black">Shortlisted Candidates</h2>
        <p className="text-sm text-brand-gray">
          Candidates currently in the <span className="font-semibold text-brand-black">Shortlisted</span> stage.
        </p>
      </div>

      <div className="rounded-xl border border-brand-gray/20 bg-brand-white p-4 shadow-sm">
        <input
          type="text"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search shortlisted candidates by name or role..."
          className="w-full rounded-xl border border-brand-gray/30 px-3 py-2.5 text-sm text-brand-black outline-none focus:border-brand-green focus:ring-2 focus:ring-brand-green/20"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <DataCard title="Shortlisted Count" value={metrics.total} hint="Candidates in shortlisted stage" />
        <DataCard title="High Readiness" value={metrics.highReadiness} hint="Readiness score ≥ 80%" />
        <DataCard title="Average Readiness" value={`${metrics.averageReadiness}%`} hint="Across shortlisted candidates" />
      </div>

      {hasNoResults ? (
        <EmptyState
          title="No shortlisted candidates yet"
          description="Shortlist candidates from Discover Talent to populate this view."
        />
      ) : (
        <DataTable
          columns={columns}
          rows={shortlisted}
          rowKey="candidate_id"
          loading={loading}
          error={error}
          emptyTitle="No shortlisted candidates yet"
          emptyDescription="Try broadening the search to see more candidates."
        />
      )}
    </div>
  );
}
