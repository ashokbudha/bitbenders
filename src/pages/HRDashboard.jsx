import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Search, UserCheck, FileText, LogOut, User as UserIcon, Briefcase, LayoutDashboard } from 'lucide-react';
import ProfileSettings from '../components/ProfileSettings';
import HROpportunities from '../components/HROpportunities';
import HROverview from '../components/hr/HROverview';
import HRDiscovery from '../components/hr/HRDiscovery';
import HRShortlisted from '../components/hr/HRShortlisted';

export default function HRDashboard() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-brand-neutral flex">
      {/* HR Sidebar */}
      <aside className="w-64 bg-indigo-900 text-indigo-200 flex flex-col">
        <div className="p-6 text-brand-white font-bold text-xl tracking-tight border-b border-indigo-800">
          HR Partner Portal
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button onClick={() => setActiveTab('overview')} className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors w-full ${activeTab === 'overview' ? 'bg-indigo-800 text-brand-white' : 'hover:bg-indigo-800 hover:text-brand-white'}`}>
            <LayoutDashboard className="w-5 h-5" /> Dashboard
          </button>
          <button onClick={() => setActiveTab('discovery')} className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors w-full ${activeTab === 'discovery' ? 'bg-indigo-800 text-brand-white' : 'hover:bg-indigo-800 hover:text-brand-white'}`}>
            <Search className="w-5 h-5" /> Discover Talent
          </button>
          <button onClick={() => setActiveTab('shortlisted')} className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors w-full text-left ${activeTab === 'shortlisted' ? 'bg-indigo-800 text-brand-white' : 'hover:bg-indigo-800 hover:text-brand-white'}`}>
            <UserCheck className="w-5 h-5" /> Shortlisted
          </button>
          <button onClick={() => setActiveTab('opportunities')} className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors w-full text-left ${activeTab === 'opportunities' ? 'bg-indigo-800 text-brand-white' : 'hover:bg-indigo-800 hover:text-brand-white'}`}>
            <Briefcase className="w-5 h-5" /> Opportunities
          </button>
          <button onClick={() => setActiveTab('settings')} className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors w-full ${activeTab === 'settings' ? 'bg-indigo-800 text-brand-white' : 'hover:bg-indigo-800 hover:text-brand-white'}`}>
            <UserIcon className="w-5 h-5" /> Profile Settings
          </button>
        </nav>
        <div className="p-4 border-t border-indigo-800">
          <button 
            onClick={logout}
            className="flex items-center gap-2 text-indigo-300 hover:text-brand-white w-full px-4 py-2"
          >
            <LogOut className="w-5 h-5" /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <header className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-extrabold text-brand-black">Talent Discovery</h1>
            <p className="text-brand-gray mt-1">Logged in as {user?.email}</p>
          </div>
          <div className="bg-indigo-100 text-brand-green/90 px-4 py-2 rounded-lg font-bold text-sm">
            Role: HR
          </div>
        </header>

        {activeTab === 'overview' ? (
          <HROverview />
        ) : activeTab === 'discovery' ? (
          <HRDiscovery />
        ) : activeTab === 'shortlisted' ? (
          <HRShortlisted />
        ) : activeTab === 'opportunities' ? (
          <HROpportunities />
        ) : (
          <div className="max-w-2xl">
            <ProfileSettings />
          </div>
        )}
      </main>
    </div>
  );
}
