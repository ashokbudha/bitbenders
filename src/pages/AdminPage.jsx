import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import { LogOut, Users, BarChart3, Briefcase } from 'lucide-react';

export default function AdminPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({ users: 0, candidates: 0, positions: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [usersRes, candidatesRes, positionsRes] = await Promise.all([
          api.get('/api/candidates').catch(() => ({ data: [] })),
          api.get('/api/candidates').catch(() => ({ data: [] })),
          api.get('/api/open-positions').catch(() => ({ data: [] }))
        ]);
        setStats({
          users: usersRes.data.length || 0,
          candidates: candidatesRes.data.length || 0,
          positions: positionsRes.data.length || 0
        });
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate('/login', { replace: true });
  };

  return (
    <div className="min-h-screen bg-brand-neutral">
      <header className="bg-brand-white shadow-sm border-b border-brand-gray/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-brand-black">Admin Dashboard</h1>
            <p className="text-brand-gray text-sm mt-1">Welcome, {user?.full_name || user?.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-brand-white rounded-xl shadow-sm border border-brand-gray/10 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-brand-gray text-sm font-medium">Total Candidates</p>
                <p className="text-3xl font-bold text-brand-black mt-2">{stats.candidates}</p>
              </div>
              <Users className="w-12 h-12 text-brand-green/20" />
            </div>
          </div>

          <div className="bg-brand-white rounded-xl shadow-sm border border-brand-gray/10 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-brand-gray text-sm font-medium">Open Positions</p>
                <p className="text-3xl font-bold text-brand-black mt-2">{stats.positions}</p>
              </div>
              <Briefcase className="w-12 h-12 text-brand-blue/20" />
            </div>
          </div>

          <div className="bg-brand-white rounded-xl shadow-sm border border-brand-gray/10 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-brand-gray text-sm font-medium">System Users</p>
                <p className="text-3xl font-bold text-brand-black mt-2">{stats.users}</p>
              </div>
              <BarChart3 className="w-12 h-12 text-brand-purple/20" />
            </div>
          </div>
        </div>

        <div className="bg-brand-white rounded-xl shadow-sm border border-brand-gray/10 p-8">
          <h2 className="text-xl font-bold text-brand-black mb-4">Admin Overview</h2>
          <p className="text-brand-gray mb-6">
            Welcome to the admin dashboard. You have access to:
          </p>
          <ul className="space-y-3 text-brand-gray">
            <li className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-brand-green"></div>
              View all candidates and their readiness scores
            </li>
            <li className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-brand-green"></div>
              Manage job postings and open positions
            </li>
            <li className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-brand-green"></div>
              Review and update application statuses
            </li>
            <li className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-brand-green"></div>
              Access HR analytics and insights
            </li>
            <li className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-brand-green"></div>
              Manage user roles and permissions
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
}
