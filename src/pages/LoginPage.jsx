import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Lock, User, Loader2, ShieldAlert, Mail } from 'lucide-react';

export default function LoginPage() {
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState('student');
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { login, signup } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname;

  const handleAuthSuccess = (userRole) => {
    if (from && userRole === 'hr') {
      navigate(from, { replace: true });
    } else if (userRole === 'hr') {
      navigate('/hr', { replace: true });
    } else if (userRole === 'student') {
      navigate('/student', { replace: true });
    } else if (userRole === 'admin') {
      navigate('/admin', { replace: true });
    } else {
      navigate('/coming-soon', { replace: true });
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      const userRole = await login({ email, password });
      handleAuthSuccess(userRole);
    } catch (err) {
      setError(err.response?.data?.error || 'Authentication failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setIsSubmitting(false);
      return;
    }

    try {
      const userRole = await signup({ email, password, confirmPassword, full_name: fullName, role });
      handleAuthSuccess(userRole);
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-neutral flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="mx-auto flex items-center justify-center h-14 w-14 rounded-full bg-brand-green shadow-lg mb-4">
          <Lock className="h-7 w-7 text-brand-white" />
        </div>
        <h2 className="mt-4 text-center text-3xl font-extrabold text-brand-black tracking-tight">
          {mode === 'login' ? 'Welcome back' : 'Create account'}
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-brand-white py-8 px-4 shadow-xl shadow-brand-gray/20/50 sm:rounded-2xl sm:px-10 border border-brand-gray/10">
          
          <div className="flex gap-2 mb-6 border-b border-brand-gray/10">
            <button
              onClick={() => { setMode('login'); setError(null); }}
              className={`px-4 py-2 text-sm font-semibold ${mode === 'login' ? 'text-brand-green border-b-2 border-brand-green' : 'text-brand-gray'}`}
            >
              Login
            </button>
            <button
              onClick={() => { setMode('signup'); setError(null); }}
              className={`px-4 py-2 text-sm font-semibold ${mode === 'signup' ? 'text-brand-green border-b-2 border-brand-green' : 'text-brand-gray'}`}
            >
              Sign Up
            </button>
          </div>

          <form className="space-y-5" onSubmit={mode === 'login' ? handleLoginSubmit : handleSignupSubmit}>
            {error && (
              <div className="bg-rose-50 border border-rose-100 text-rose-600 p-4 rounded-xl text-sm flex items-start gap-3">
                <ShieldAlert className="w-5 h-5 shrink-0" />
                <p>{error}</p>
              </div>
            )}

            {mode === 'signup' && (
              <div>
                <label className="block text-sm font-bold text-brand-gray mb-1">Full Name</label>
                <div className="relative rounded-xl shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-brand-gray/60" />
                  </div>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="block w-full pl-10 sm:text-sm border-brand-gray/20 rounded-xl focus:ring-2 focus:ring-brand-green focus:border-brand-green border p-3 outline-none transition-shadow"
                    placeholder="John Doe"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-bold text-brand-gray mb-1">Email address</label>
              <div className="relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-brand-gray/60" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 sm:text-sm border-brand-gray/20 rounded-xl focus:ring-2 focus:ring-brand-green focus:border-brand-green border p-3 outline-none transition-shadow"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-brand-gray mb-1">Password</label>
              <div className="relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-brand-gray/60" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 sm:text-sm border-brand-gray/20 rounded-xl focus:ring-2 focus:ring-brand-green focus:border-brand-green border p-3 outline-none transition-shadow"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {mode === 'signup' && (
              <>
                <div>
                  <label className="block text-sm font-bold text-brand-gray mb-1">Confirm Password</label>
                  <div className="relative rounded-xl shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-brand-gray/60" />
                    </div>
                    <input
                      type="password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="block w-full pl-10 sm:text-sm border-brand-gray/20 rounded-xl focus:ring-2 focus:ring-brand-green focus:border-brand-green border p-3 outline-none transition-shadow"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-brand-gray mb-1">Role</label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="block w-full sm:text-sm border-brand-gray/20 rounded-xl focus:ring-2 focus:ring-brand-green focus:border-brand-green border p-3 outline-none transition-shadow"
                  >
                    <option value="student">Student</option>
                    <option value="hr">HR</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center py-2.5 px-4 rounded-xl shadow-md font-semibold text-brand-white bg-brand-green hover:bg-brand-green/90 focus:outline-none focus:ring-2 focus:ring-brand-green focus:ring-offset-2 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin h-5 w-5" />
                </>
              ) : (
                mode === 'login' ? 'Sign in' : 'Create Account'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
