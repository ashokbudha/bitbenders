import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Search, UserCheck, LogOut, User as UserIcon, Briefcase, LayoutDashboard } from 'lucide-react';
import ProfileSettings from '../components/ProfileSettings';
import HROverview from '../components/hr/HROverview';
import HRDiscovery from '../components/hr/HRDiscovery';
import HRShortlisted from '../components/hr/HRShortlisted';
import HROpportunities from '../components/HROpportunities';

export default function HRDashboard() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  const tabMeta = {
    overview: {
      title: 'HR Dashboard',
      subtitle: 'Live hiring health, movement trends, and readiness signals.',
    },
    discovery: {
      title: 'Discover Talent',
      subtitle: 'Search real candidates and filter by role, stage, and readiness.',
    },
    shortlisted: {
      title: 'Shortlisted',
      subtitle: 'Track candidates currently shortlisted for hiring decisions.',
    },
    opportunities: {
      title: 'Opportunities',
      subtitle: 'Review role demand and readiness to prioritize hiring actions.',
    },
    settings: {
      title: 'Profile Settings',
      subtitle: `Logged in as ${user?.email || 'HR user'}`,
    },
  };

  const renderActiveTab = () => {
    if (activeTab === 'overview') {
      return <HROverview />;
    }
    if (activeTab === 'discovery') {
      return <HRDiscovery />;
    }
    if (activeTab === 'shortlisted') {
      return <HRShortlisted />;
    }
    if (activeTab === 'opportunities') {
      return <HROpportunities />;
    }
    return (
      <div className="max-w-2xl">
        <ProfileSettings />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-brand-neutral flex">
      {/* HR Sidebar */}
      <aside className="w-64 bg-brand-black text-brand-white flex flex-col">
        <div className="p-6 text-brand-white font-bold text-xl tracking-tight border-b border-brand-white/15">
          HR Partner Portal
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button onClick={() => setActiveTab('overview')} className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-colors w-full ${activeTab === 'overview' ? 'bg-brand-green text-brand-white shadow-sm' : 'text-brand-white/95 hover:bg-brand-white/10 hover:text-brand-white'}`}>
            <LayoutDashboard className="w-5 h-5" /> Dashboard
          </button>
          <button onClick={() => setActiveTab('discovery')} className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-colors w-full ${activeTab === 'discovery' ? 'bg-brand-green text-brand-white shadow-sm' : 'text-brand-white/95 hover:bg-brand-white/10 hover:text-brand-white'}`}>
            <Search className="w-5 h-5" /> Discover Talent
          </button>
          <button onClick={() => setActiveTab('shortlisted')} className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-colors w-full text-left ${activeTab === 'shortlisted' ? 'bg-brand-green text-brand-white shadow-sm' : 'text-brand-white/95 hover:bg-brand-white/10 hover:text-brand-white'}`}>
            <UserCheck className="w-5 h-5" /> Shortlisted
          </button>
          <button onClick={() => setActiveTab('opportunities')} className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-colors w-full text-left ${activeTab === 'opportunities' ? 'bg-brand-green text-brand-white shadow-sm' : 'text-brand-white/95 hover:bg-brand-white/10 hover:text-brand-white'}`}>
            <Briefcase className="w-5 h-5" /> Opportunities
          </button>
          <button onClick={() => setActiveTab('settings')} className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-colors w-full ${activeTab === 'settings' ? 'bg-brand-green text-brand-white shadow-sm' : 'text-brand-white/95 hover:bg-brand-white/10 hover:text-brand-white'}`}>
            <UserIcon className="w-5 h-5" /> Profile Settings
          </button>
        </nav>
        <div className="p-4 border-t border-brand-white/15">
          <button 
            onClick={logout}
            className="flex items-center gap-2 text-brand-white/95 hover:bg-brand-white/10 hover:text-brand-white w-full rounded-xl px-4 py-2 font-semibold transition-colors"
          >
            <LogOut className="w-5 h-5" /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <header className="mb-8 flex justify-between items-center border-b border-brand-gray/15 pb-6">
          <div>
            <h1 className="text-3xl font-extrabold text-brand-black">{tabMeta[activeTab].title}</h1>
            <p className="text-brand-gray mt-1">{tabMeta[activeTab].subtitle}</p>
          </div>
          <div className="bg-brand-green/10 text-brand-green px-4 py-2 rounded-lg font-bold text-sm border border-brand-green/20">
            Role: HR
          </div>
        </header>

        {renderActiveTab()}
      </main>
    </div>
  );
}
