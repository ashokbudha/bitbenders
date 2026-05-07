import { useEffect, useMemo, useState } from 'react';
import api from '../api/axios';
import DataCard from './hr/DataCard';
import DataTable from './hr/DataTable';
import EmptyState from './hr/EmptyState';

const toNumber = (value) => Number.parseFloat(value || 0);

const getSuggestedAction = (avgReadiness) => {
  const score = toNumber(avgReadiness);
  if (score < 60) {
    return 'Increase sourcing for this role and expand outreach channels.';
  }
  if (score < 75) {
    return 'Boost shortlist quality with targeted screening and coaching.';
  }
  return 'High readiness pool. Prioritize interviews and move candidates faster.';
};

export default function HROpportunities() {
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOpportunities = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await api.get('/api/opportunities');
        setOpportunities(Array.isArray(response.data) ? response.data : []);
      } catch (requestError) {
        console.error('Failed to load opportunities', requestError);
        setOpportunities([]);
        setError(requestError.response?.data?.error || 'Could not load opportunities.');
      } finally {
        setLoading(false);
      }
    };

    fetchOpportunities();
  }, []);

  const metrics = useMemo(() => {
    const rolesTracked = opportunities.length;
    const totalCandidates = opportunities.reduce((sum, row) => sum + Number.parseInt(row.candidate_count || 0, 10), 0);
    const averageReadiness =
      rolesTracked > 0
        ? (
            opportunities.reduce((sum, row) => sum + toNumber(row.avg_readiness), 0) /
            rolesTracked
          ).toFixed(1)
        : '0.0';

    return { rolesTracked, totalCandidates, averageReadiness };
  }, [opportunities]);

  const rows = useMemo(
    () =>
      opportunities.map((entry) => ({
        ...entry,
        suggested_action: getSuggestedAction(entry.avg_readiness),
      })),
    [opportunities]
  );

  const columns = [
    {
      key: 'role',
      label: 'Role',
      render: (row) => <span className="font-semibold text-brand-black">{row.role}</span>,
    },
    {
      key: 'candidate_count',
      label: 'Candidate Count',
      headerClassName: 'text-right',
      cellClassName: 'text-right font-semibold text-brand-black',
    },
    {
      key: 'avg_readiness',
      label: 'Avg Readiness',
      headerClassName: 'text-right',
      cellClassName: 'text-right font-semibold text-brand-black',
      render: (row) => `${toNumber(row.avg_readiness).toFixed(1)}%`,
    },
    {
      key: 'suggested_action',
      label: 'Suggested Action',
      render: (row) => <span className="text-brand-gray">{row.suggested_action}</span>,
    },
  ];

  const hasNoResults = !loading && !error && rows.length === 0;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div>
        <h2 className="text-2xl font-bold text-brand-black">Opportunities</h2>
        <p className="text-sm text-brand-gray">Role demand and readiness trends derived from live candidate data.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <DataCard title="Roles Tracked" value={metrics.rolesTracked} hint="Roles with active candidates in pipeline" />
        <DataCard title="Candidates Across Roles" value={metrics.totalCandidates} hint="Total candidate volume across all roles" />
        <DataCard title="Overall Avg Readiness" value={`${metrics.averageReadiness}%`} hint="Average readiness across all tracked roles" />
      </div>

      {hasNoResults ? (
        <EmptyState
          title="No role opportunities available"
          description="Once candidates are tracked, role-level opportunities will appear here."
        />
      ) : (
        <DataTable
          columns={columns}
          rows={rows}
          rowKey="role"
          loading={loading}
          error={error}
          emptyTitle="No opportunities found"
          emptyDescription="The opportunities dataset is currently empty."
        />
      )}
    </div>
  );
}
