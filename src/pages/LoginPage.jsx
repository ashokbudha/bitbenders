import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Lock, User, Loader2, ShieldAlert, GraduationCap, Briefcase, Key } from 'lucide-react';

export default function LoginPage() {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState('student');
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname;

  const handleAuthSuccess = (role) => {
    if (from) {
      navigate(from, { replace: true });
    } else {
      if (role === 'admin') navigate('/admin', { replace: true });
      else if (role === 'hr') navigate('/hr', { replace: true });
      else navigate('/dashboard', { replace: true });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      let role;
      if (isLoginMode) {
        role = await login({ email, password });
      } else {
        role = await register({ email, password, role: selectedRole });
      }
      handleAuthSuccess(role);
    } catch (err) {
      setError(err.message || 'Authentication failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleQuickDemo = async (role) => {
    // A quick bypass strictly for demo purposes
    setIsSubmitting(true);
    try {
      // Create a random unique email for the demo session
      const demoEmail = `demo_${role}_${Math.floor(Math.random() * 1000)}@example.com`;
      await register({ email: demoEmail, password: 'password', role });
      handleAuthSuccess(role);
    } catch (err) {
      setError('Demo login failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="mx-auto flex items-center justify-center h-14 w-14 rounded-full bg-indigo-600 shadow-lg mb-4">
          <Lock className="h-7 w-7 text-white" />
        </div>
        <h2 className="mt-4 text-center text-3xl font-extrabold text-slate-900 tracking-tight">
          {isLoginMode ? 'Welcome back' : 'Create your account'}
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl shadow-slate-200/50 sm:rounded-2xl sm:px-10 border border-slate-100">
          
          {/* Mode Toggle */}
          <div className="flex p-1 bg-slate-100 rounded-xl mb-8">
            <button
              type="button"
              onClick={() => setIsLoginMode(true)}
              className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${isLoginMode ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setIsLoginMode(false)}
              className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${!isLoginMode ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Register
            </button>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-rose-50 border border-rose-100 text-rose-600 p-4 rounded-xl text-sm flex items-start gap-3">
                <ShieldAlert className="w-5 h-5 shrink-0" />
                <p>{error}</p>
              </div>
            )}
            
            {!isLoginMode && (
              <div className="space-y-3 mb-6">
                <label className="block text-sm font-bold text-slate-700">I am joining as a:</label>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedRole('student')}
                    className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all ${selectedRole === 'student' ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-slate-200 bg-white text-slate-500 hover:border-indigo-300'}`}
                  >
                    <GraduationCap className="w-6 h-6 mb-1" />
                    <span className="text-xs font-bold">Student</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedRole('hr')}
                    className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all ${selectedRole === 'hr' ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-slate-200 bg-white text-slate-500 hover:border-indigo-300'}`}
                  >
                    <Briefcase className="w-6 h-6 mb-1" />
                    <span className="text-xs font-bold">HR / Co.</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedRole('admin')}
                    className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all ${selectedRole === 'admin' ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-slate-200 bg-white text-slate-500 hover:border-indigo-300'}`}
                  >
                    <Key className="w-6 h-6 mb-1" />
                    <span className="text-xs font-bold">Admin</span>
                  </button>
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Email address</label>
              <div className="relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 sm:text-sm border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 border p-3 outline-none transition-shadow"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Password</label>
              <div className="relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 sm:text-sm border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 border p-3 outline-none transition-shadow"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-md text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-70 transition-colors mt-6"
            >
              {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : (isLoginMode ? 'Sign In securely' : 'Create Account')}
            </button>
          </form>

        </div>

        {/* Development / Demo Mode Selector */}
        <div className="mt-8 border-2 border-dashed border-amber-300 bg-amber-50 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4 text-amber-800">
            <ShieldAlert className="w-5 h-5" />
            <h3 className="font-bold text-sm uppercase tracking-wider">Demo / Testing Mode</h3>
          </div>
          <p className="text-xs text-amber-700 mb-4">
            Since the backend is mocked locally, you can bypass registration and instantly log in to any dashboard to test RBAC logic.
          </p>
          <div className="flex flex-wrap gap-2">
            <button onClick={() => handleQuickDemo('student')} disabled={isSubmitting} className="flex-1 py-2 px-3 bg-white border border-amber-200 text-amber-900 text-xs font-bold rounded-lg hover:bg-amber-100 transition-colors">
              Test Student
            </button>
            <button onClick={() => handleQuickDemo('hr')} disabled={isSubmitting} className="flex-1 py-2 px-3 bg-white border border-amber-200 text-amber-900 text-xs font-bold rounded-lg hover:bg-amber-100 transition-colors">
              Test HR
            </button>
            <button onClick={() => handleQuickDemo('admin')} disabled={isSubmitting} className="flex-1 py-2 px-3 bg-white border border-amber-200 text-amber-900 text-xs font-bold rounded-lg hover:bg-amber-100 transition-colors">
              Test Admin
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
