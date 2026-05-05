import { Outlet, NavLink, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { LayoutDashboard, BookOpen, Briefcase, User, GraduationCap } from 'lucide-react';
import { useStudent } from '../context/StudentContext';
import { useAuth } from '../context/AuthContext';

export default function StudentDashboardLayout() {

  const navItems = [
    { name: 'Overview', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Learning', path: '/dashboard/learning', icon: BookOpen },
    { name: 'Projects', path: '/dashboard/projects', icon: Briefcase },
    { name: 'Opportunities', path: '/dashboard/opportunities', icon: Briefcase }, // Using Briefcase for jobs
    { name: 'Profile / CV', path: '/dashboard/profile', icon: User },
  ];

  const { careerPath } = useStudent();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  // If no career path is selected, force user into the setup or explore views
  const isSetupOrExplore = location.pathname === '/dashboard/setup' || location.pathname === '/dashboard/explore';
  if (!careerPath && !isSetupOrExplore) {
    return <Navigate to="/dashboard/setup" replace />;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col sticky top-0 h-screen">
        <div className="p-6 flex items-center gap-2 text-indigo-600">
          <GraduationCap className="w-8 h-8" />
          <span className="font-bold text-xl tracking-tight">StudentPortal</span>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          {careerPath ? (
            navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/dashboard'}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${
                    isActive 
                      ? 'bg-indigo-50 text-indigo-700' 
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`
                }
              >
                <item.icon className="w-5 h-5" />
                {item.name}
              </NavLink>
            ))
          ) : (
            <div className="px-4 py-6 text-center border-2 border-dashed border-slate-200 rounded-xl mt-4">
              <p className="text-slate-500 text-sm font-medium">Please select a career path to unlock your dashboard.</p>
            </div>
          )}
        </nav>

        <div className="p-6 border-t border-slate-200">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm">
            <p className="font-semibold text-slate-800">Current Path:</p>
            <p className="text-indigo-600 capitalize font-medium">{careerPath?.replace('-', ' ') || 'None selected'}</p>
          </div>
          
          <button 
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 text-slate-500 hover:text-red-600 hover:bg-red-50 w-full mt-4 px-4 py-2 rounded-xl transition-colors font-medium"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-8 overflow-y-auto h-screen">
        <div className="max-w-5xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
