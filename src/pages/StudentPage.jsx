import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import { LogOut, Briefcase, Send, Check } from 'lucide-react';

export default function StudentPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [openPositions, setOpenPositions] = useState([]);
  const [myApplications, setMyApplications] = useState([]);
  const [activeTab, setActiveTab] = useState('positions');
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [posRes, appRes] = await Promise.all([
        api.get('/api/open-positions').catch(() => ({ data: [] })),
        api.get('/api/applications/me').catch(() => ({ data: [] }))
      ]);
      setOpenPositions(posRes.data);
      setMyApplications(appRes.data);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async (positionId) => {
    setApplying(positionId);
    try {
      await api.post('/api/applications', { open_position_id: positionId });
      await fetchData();
    } catch (error) {
      console.error('Failed to apply:', error);
    } finally {
      setApplying(null);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login', { replace: true });
  };

  const hasApplied = (positionId) => {
    return myApplications.some(app => app.open_position_id === positionId);
  };

  return (
    <div className="min-h-screen bg-brand-neutral">
      <header className="bg-brand-white shadow-sm border-b border-brand-gray/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-brand-black">Student Dashboard</h1>
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
        <div className="flex gap-2 mb-6 border-b border-brand-gray/10">
          <button
            onClick={() => setActiveTab('positions')}
            className={`px-4 py-2 text-sm font-semibold ${activeTab === 'positions' ? 'text-brand-green border-b-2 border-brand-green' : 'text-brand-gray'}`}
          >
            Open Positions
          </button>
          <button
            onClick={() => setActiveTab('applications')}
            className={`px-4 py-2 text-sm font-semibold ${activeTab === 'applications' ? 'text-brand-green border-b-2 border-brand-green' : 'text-brand-gray'}`}
          >
            My Applications ({myApplications.length})
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-brand-gray">Loading...</p>
          </div>
        ) : activeTab === 'positions' ? (
          <div className="space-y-4">
            {openPositions.length === 0 ? (
              <div className="bg-brand-white rounded-xl shadow-sm border border-brand-gray/10 p-8 text-center">
                <Briefcase className="w-12 h-12 mx-auto text-brand-gray/30 mb-4" />
                <p className="text-brand-gray">No open positions at the moment.</p>
              </div>
            ) : (
              openPositions.map((position) => (
                <div key={position.id} className="bg-brand-white rounded-xl shadow-sm border border-brand-gray/10 p-6 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-brand-black">{position.title}</h3>
                      <p className="text-brand-gray text-sm mt-1">{position.location}</p>
                      {position.target_role && (
                        <p className="text-brand-green text-sm font-medium mt-2">{position.target_role}</p>
                      )}
                      <p className="text-brand-gray text-xs mt-3">Openings: {position.openings}</p>
                    </div>
                    <button
                      onClick={() => handleApply(position.id)}
                      disabled={hasApplied(position.id) || applying === position.id}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                        hasApplied(position.id)
                          ? 'bg-green-50 text-green-600 cursor-default'
                          : 'bg-brand-green text-brand-white hover:bg-brand-green/90'
                      }`}
                    >
                      {hasApplied(position.id) ? (
                        <>
                          <Check className="w-4 h-4" />
                          Applied
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Apply
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {myApplications.length === 0 ? (
              <div className="bg-brand-white rounded-xl shadow-sm border border-brand-gray/10 p-8 text-center">
                <Briefcase className="w-12 h-12 mx-auto text-brand-gray/30 mb-4" />
                <p className="text-brand-gray">You haven't applied to any positions yet.</p>
              </div>
            ) : (
              myApplications.map((app) => (
                <div key={app.application_id} className="bg-brand-white rounded-xl shadow-sm border border-brand-gray/10 p-6">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <h3 className="text-lg font-bold text-brand-black">{app.open_position_title}</h3>
                      <p className="text-brand-gray text-sm mt-1">{app.target_role}</p>
                      <div className="flex items-center gap-2 mt-3">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                          app.status === 'shortlisted' ? 'bg-green-100 text-green-700' :
                          app.status === 'interview' ? 'bg-blue-100 text-blue-700' :
                          app.status === 'hired' ? 'bg-emerald-100 text-emerald-700' :
                          app.status === 'rejected' ? 'bg-rose-100 text-rose-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                        </span>
                      </div>
                    </div>
                    <div className="text-right text-xs text-brand-gray">
                      Applied {new Date(app.applied_at).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </main>
    </div>
  );
}
