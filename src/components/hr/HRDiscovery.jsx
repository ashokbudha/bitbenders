import { useEffect, useMemo, useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import api from '../../api/axios';
import DataCard from './DataCard';
import DataTable from './DataTable';
import EmptyState from './EmptyState';

const STAGE_OPTIONS = ['Applied', 'Shortlisted', 'Interview', 'Offer', 'Hired'];

const toNumber = (value) => Number.parseFloat(value || 0);

const scoreClass = (score) => {
  if (score >= 80) {
    return 'bg-brand-green/10 text-brand-green border-brand-green/20';
  }
  if (score >= 60) {
    return 'bg-amber-100 text-amber-800 border-amber-200';
  }
  return 'bg-red-100 text-red-700 border-red-200';
};

export default function HRDiscovery() {
  const [search, setSearch] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedStage, setSelectedStage] = useState('');
  const [minReadiness, setMinReadiness] = useState('0');
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [roleOptions, setRoleOptions] = useState([]);

  useEffect(() => {
    const loadRoleOptions = async () => {
      try {
        const response = await api.get('/api/opportunities');
        const roles = Array.isArray(response.data) ? response.data.map((entry) => entry.role).filter(Boolean) : [];
        setRoleOptions(roles);
      } catch (roleError) {
        console.error('Failed to load role options', roleError);
      }
    };

    loadRoleOptions();
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(async () => {
      try {
        setLoading(true);
        setError(null);

        const params = {};
        if (search.trim()) {
          params.search = search.trim();
        }
        if (selectedRole) {
          params.role = selectedRole;
        }
        if (selectedStage) {
          params.stage = selectedStage;
        }
        if (toNumber(minReadiness) > 0) {
          params.minReadiness = toNumber(minReadiness);
        }

        const response = await api.get('/api/talent', { params });
        setCandidates(Array.isArray(response.data) ? response.data : []);
      } catch (requestError) {
        console.error('Failed to load talent', requestError);
        setCandidates([]);
        setError(requestError.response?.data?.error || 'Could not load talent list.');
      } finally {
        setLoading(false);
      }
    }, 250);

    return () => {
      window.clearTimeout(timer);
    };
  }, [search, selectedRole, selectedStage, minReadiness]);

  const metrics = useMemo(() => {
    const total = candidates.length;
    const totalReadiness = candidates.reduce((sum, candidate) => sum + toNumber(candidate.readiness_score), 0);
    const avgReadiness = total > 0 ? (totalReadiness / total).toFixed(1) : '0.0';
    const shortlistReady = candidates.filter((candidate) => toNumber(candidate.readiness_score) >= 80).length;

    return { total, avgReadiness, shortlistReady };
  }, [candidates]);

  const fallbackRoles = useMemo(() => {
    const uniqueRoles = [...new Set(candidates.map((candidate) => candidate.target_role).filter(Boolean))];
    return uniqueRoles.sort((a, b) => a.localeCompare(b));
  }, [candidates]);

  const availableRoles = roleOptions.length > 0 ? roleOptions : fallbackRoles;

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
      label: 'Target Role',
      render: (candidate) => candidate.target_role || 'Unassigned',
    },
    {
      key: 'current_stage',
      label: 'Current Stage',
      render: (candidate) => (
        <span className="rounded-full border border-brand-gray/20 bg-brand-neutral px-3 py-1 text-xs font-semibold text-brand-gray">
          {candidate.current_stage}
        </span>
      ),
    },
    {
      key: 'readiness_score',
      label: 'Readiness',
      headerClassName: 'text-right',
      cellClassName: 'text-right',
      render: (candidate) => {
        const score = toNumber(candidate.readiness_score);
        return (
          <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold ${scoreClass(score)}`}>
            {score.toFixed(1)}%
          </span>
        );
      },
    },
  ];

  const hasNoResults = !loading && !error && candidates.length === 0;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div>
        <h2 className="text-2xl font-bold text-brand-black">Discover Talent</h2>
        <p className="text-sm text-brand-gray">Search and filter real candidates from the hiring pipeline.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 rounded-xl border border-brand-gray/20 bg-brand-white p-4 shadow-sm lg:grid-cols-4">
        <label className="relative lg:col-span-2">
          <Search className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-brand-gray/60" />
          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by name or role..."
            className="w-full rounded-xl border border-brand-gray/30 py-2.5 pl-9 pr-3 text-sm text-brand-black outline-none focus:border-brand-green focus:ring-2 focus:ring-brand-green/20"
          />
        </label>

        <select
          value={selectedRole}
          onChange={(event) => setSelectedRole(event.target.value)}
          className="rounded-xl border border-brand-gray/30 bg-brand-white px-3 py-2.5 text-sm text-brand-black outline-none focus:border-brand-green focus:ring-2 focus:ring-brand-green/20"
        >
          <option value="">All roles</option>
          {availableRoles.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>

        <div className="flex items-center gap-2 rounded-xl border border-brand-gray/30 bg-brand-neutral px-3">
          <SlidersHorizontal className="h-4 w-4 text-brand-gray/70" />
          <input
            type="number"
            min="0"
            max="100"
            value={minReadiness}
            onChange={(event) => setMinReadiness(event.target.value)}
            className="w-full bg-transparent py-2.5 text-sm text-brand-black outline-none"
            aria-label="Minimum readiness"
          />
          <span className="text-xs font-semibold text-brand-gray">min %</span>
        </div>

        <select
          value={selectedStage}
          onChange={(event) => setSelectedStage(event.target.value)}
          className="rounded-xl border border-brand-gray/30 bg-brand-white px-3 py-2.5 text-sm text-brand-black outline-none focus:border-brand-green focus:ring-2 focus:ring-brand-green/20"
        >
          <option value="">All stages</option>
          {STAGE_OPTIONS.map((stage) => (
            <option key={stage} value={stage}>
              {stage}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <DataCard title="Candidates Shown" value={metrics.total} hint="Live list after current filters" />
        <DataCard title="Average Readiness" value={`${metrics.avgReadiness}%`} hint="Current average for visible candidates" />
        <DataCard title="Shortlist Ready" value={metrics.shortlistReady} hint="Candidates with readiness score ≥ 80%" />
      </div>

      {hasNoResults ? (
        <EmptyState
          title="No candidates matched the filters"
          description="Adjust role, stage, readiness, or search text to widen the results."
        />
      ) : (
        <DataTable
          columns={columns}
          rows={candidates}
          rowKey="candidate_id"
          loading={loading}
          error={error}
          emptyTitle="No talent data available"
          emptyDescription="The talent dataset is currently empty."
        />
      )}
    </div>
  );
}
