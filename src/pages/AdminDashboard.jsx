import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, Users, BookOpen, Briefcase, Settings, LogOut, User as UserIcon } from 'lucide-react';
import ProfileSettings from '../components/ProfileSettings';
import AdminOverview from '../components/admin/AdminOverview';
import AdminUsers from '../components/admin/AdminUsers';
import AdminContent from '../components/admin/AdminContent';
import AdminOpportunities from '../components/admin/AdminOpportunities';

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-brand-neutral flex">
      {/* Admin Sidebar */}
      <aside className="w-64 bg-brand-black text-brand-gray/40 flex flex-col">
        <div className="p-6 text-brand-white font-bold text-xl tracking-tight border-b border-brand-black">
          Admin Portal
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button onClick={() => setActiveTab('overview')} className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors w-full ${activeTab === 'overview' ? 'bg-brand-green text-brand-white' : 'hover:bg-brand-black hover:text-brand-white'}`}>
            <LayoutDashboard className="w-5 h-5" /> Overview
          </button>
          <button onClick={() => setActiveTab('users')} className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors w-full ${activeTab === 'users' ? 'bg-brand-green text-brand-white' : 'hover:bg-brand-black hover:text-brand-white'}`}>
            <Users className="w-5 h-5" /> User Management
          </button>
          <button onClick={() => setActiveTab('content')} className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors w-full text-left ${activeTab === 'content' ? 'bg-brand-green text-brand-white' : 'hover:bg-brand-black hover:text-brand-white'}`}>
            <BookOpen className="w-5 h-5" /> Content Manager
          </button>
          <button onClick={() => setActiveTab('opportunities')} className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors w-full text-left ${activeTab === 'opportunities' ? 'bg-brand-green text-brand-white' : 'hover:bg-brand-black hover:text-brand-white'}`}>
            <Briefcase className="w-5 h-5" /> Opportunities
          </button>
          <button onClick={() => setActiveTab('settings')} className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors w-full ${activeTab === 'settings' ? 'bg-brand-green text-brand-white' : 'hover:bg-brand-black hover:text-brand-white'}`}>
            <Settings className="w-5 h-5" /> Platform Settings
          </button>
        </nav>
        <div className="p-4 border-t border-brand-black">
          <button 
            onClick={logout}
            className="flex items-center gap-2 text-brand-gray/60 hover:text-brand-white w-full px-4 py-2"
          >
            <LogOut className="w-5 h-5" /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <header className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-extrabold text-brand-black">Dashboard Overview</h1>
            <p className="text-brand-gray mt-1">Logged in as {user?.email}</p>
          </div>
          <div className="bg-indigo-100 text-brand-green/90 px-4 py-2 rounded-lg font-bold text-sm">
            Role: ADMIN
          </div>
        </header>

        {activeTab === 'overview' ? (
          <AdminOverview />
        ) : activeTab === 'users' ? (
          <AdminUsers />
        ) : activeTab === 'content' ? (
          <AdminContent />
        ) : activeTab === 'opportunities' ? (
          <AdminOpportunities />
        ) : (
          <div className="max-w-2xl">
            <ProfileSettings />
          </div>
        )}
      </main>
    </div>
  );
}
