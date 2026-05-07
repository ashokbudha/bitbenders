import { GraduationCap, Lock, LogOut, UserCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function StudentPage() {
  const { user, role, logout } = useAuth();
  const displayName = user?.full_name || user?.name || user?.email?.split('@')[0] || 'Student';

  return (
    <div className="min-h-screen bg-brand-neutral flex items-center justify-center p-6">
      <div className="w-full max-w-2xl rounded-2xl border border-brand-gray/20 bg-brand-white shadow-sm p-8">
        <div className="flex items-center justify-between gap-3 mb-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-green/20 bg-brand-green/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-green">
            <GraduationCap className="w-4 h-4" />
            Student Profile
          </div>
          <span className="rounded-lg border border-brand-gray/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-gray">
            Role: {role || 'student'}
          </span>
        </div>

        <h1 className="text-3xl font-black text-brand-black mb-2">Welcome, {displayName}</h1>
        <p className="text-brand-gray mb-6">
          Student dashboard coming soon. You are successfully logged in and your account is active for the demo.
        </p>

        <div className="space-y-3 mb-8">
          <div className="flex items-center gap-3 rounded-xl border border-brand-gray/15 bg-brand-neutral px-4 py-3">
            <UserCircle className="w-5 h-5 text-brand-green" />
            <div className="text-sm">
              <p className="text-brand-gray">Name</p>
              <p className="font-semibold text-brand-black">{displayName}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-xl border border-brand-gray/15 bg-brand-neutral px-4 py-3">
            <Lock className="w-5 h-5 text-brand-green" />
            <div className="text-sm">
              <p className="text-brand-gray">Email</p>
              <p className="font-semibold text-brand-black">{user?.email || 'Not available'}</p>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={logout}
          className="inline-flex items-center gap-2 rounded-xl bg-brand-green px-4 py-2 font-semibold text-brand-white transition-colors hover:bg-brand-green/90"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </div>
  );
}

