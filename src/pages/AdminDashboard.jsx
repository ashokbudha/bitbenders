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
    <div className="min-h-screen bg-slate-50 flex">
      {/* Admin Sidebar */}
      <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col">
        <div className="p-6 text-white font-bold text-xl tracking-tight border-b border-slate-800">
          Admin Portal
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button onClick={() => setActiveTab('overview')} className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors w-full ${activeTab === 'overview' ? 'bg-indigo-600 text-white' : 'hover:bg-slate-800 hover:text-white'}`}>
            <LayoutDashboard className="w-5 h-5" /> Overview
          </button>
          <button onClick={() => setActiveTab('users')} className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors w-full ${activeTab === 'users' ? 'bg-indigo-600 text-white' : 'hover:bg-slate-800 hover:text-white'}`}>
            <Users className="w-5 h-5" /> User Management
          </button>
          <button onClick={() => setActiveTab('content')} className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors w-full text-left ${activeTab === 'content' ? 'bg-indigo-600 text-white' : 'hover:bg-slate-800 hover:text-white'}`}>
            <BookOpen className="w-5 h-5" /> Content Manager
          </button>
          <button onClick={() => setActiveTab('opportunities')} className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors w-full text-left ${activeTab === 'opportunities' ? 'bg-indigo-600 text-white' : 'hover:bg-slate-800 hover:text-white'}`}>
            <Briefcase className="w-5 h-5" /> Opportunities
          </button>
          <button onClick={() => setActiveTab('settings')} className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors w-full ${activeTab === 'settings' ? 'bg-indigo-600 text-white' : 'hover:bg-slate-800 hover:text-white'}`}>
            <Settings className="w-5 h-5" /> Platform Settings
          </button>
        </nav>
        <div className="p-4 border-t border-slate-800">
          <button 
            onClick={logout}
            className="flex items-center gap-2 text-slate-400 hover:text-white w-full px-4 py-2"
          >
            <LogOut className="w-5 h-5" /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <header className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900">Dashboard Overview</h1>
            <p className="text-slate-500 mt-1">Logged in as {user?.email}</p>
          </div>
          <div className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-lg font-bold text-sm">
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
