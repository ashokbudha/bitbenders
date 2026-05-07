import { Clock3, Lock, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function ComingSoonPage() {
  const { role, user, logout } = useAuth();
  const roleLabel = role ? role.toUpperCase() : 'USER';

  return (
    <div className="min-h-screen bg-brand-neutral flex items-center justify-center p-6">
      <div className="w-full max-w-xl bg-brand-white border border-brand-gray/20 rounded-2xl shadow-sm p-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-green/20 bg-brand-green/10 text-brand-green text-xs font-semibold tracking-wide uppercase mb-5">
          <Clock3 className="w-4 h-4" />
          Coming soon
        </div>

        <h1 className="text-3xl font-black text-brand-black mb-2">Access Restricted</h1>
        <p className="text-brand-gray leading-relaxed">
          The HR dashboard is ready for this demo. The <span className="font-semibold text-brand-black">{roleLabel}</span> experience is on the roadmap and will be unlocked in a future update.
        </p>

        <div className="mt-6 p-4 rounded-xl border border-brand-gray/15 bg-brand-neutral">
          <div className="flex items-center gap-2 text-sm text-brand-gray">
            <Lock className="w-4 h-4 text-brand-green" />
            Signed in as <span className="font-medium text-brand-black">{user?.email || 'Unknown user'}</span>
          </div>
        </div>

        <button
          type="button"
          onClick={logout}
          className="mt-6 inline-flex items-center gap-2 rounded-xl px-4 py-2 bg-brand-green text-brand-white font-semibold hover:bg-brand-green/90 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </div>
  );
}

