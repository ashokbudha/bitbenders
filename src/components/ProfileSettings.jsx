import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { User as UserIcon, Mail, MapPin, Phone, Briefcase, Building, Edit3, Globe, Link as LinkIcon } from 'lucide-react';
import ProfileForm from './ProfileForm';

export default function ProfileSettings() {
  const { user, role } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  if (isEditing) {
    return <ProfileForm onCancel={() => setIsEditing(false)} />;
  }

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden animate-in fade-in duration-300">
      <div className="bg-slate-900 p-8 text-white flex justify-between items-start">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 bg-indigo-500 rounded-full flex items-center justify-center text-3xl font-bold border-4 border-slate-800 shadow-lg">
            {user?.displayName?.charAt(0) || 'U'}
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-1">{user?.displayName || 'User Name'}</h2>
            <div className="flex flex-wrap items-center gap-4 text-slate-300 text-sm">
              <span className="flex items-center gap-1.5"><Mail className="w-4 h-4" /> {user?.email}</span>
              {role === 'hr' && user?.jobTitle && <span className="flex items-center gap-1.5"><Briefcase className="w-4 h-4" /> {user.jobTitle}</span>}
              {role === 'admin' && user?.adminTitle && <span className="flex items-center gap-1.5"><Briefcase className="w-4 h-4" /> {user.adminTitle}</span>}
              <span className="flex items-center gap-1.5 uppercase tracking-wider font-semibold text-indigo-400 bg-indigo-900/50 px-2 py-0.5 rounded">
                Role: {role}
              </span>
            </div>
          </div>
        </div>
        <button 
          onClick={() => setIsEditing(true)}
          className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-xl transition-colors font-medium text-sm"
        >
          <Edit3 className="w-4 h-4" /> Edit Profile
        </button>
      </div>

      <div className="p-8 grid md:grid-cols-2 gap-8">
        <div className="space-y-8">
          <section>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4 border-b border-slate-100 pb-2">About</h3>
            {user?.bio ? (
              <p className="text-slate-700 leading-relaxed">{user.bio}</p>
            ) : (
              <p className="text-slate-400 italic">No bio provided.</p>
            )}
          </section>

          <section>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4 border-b border-slate-100 pb-2">Contact & Location</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-slate-700">
                <MapPin className="w-5 h-5 text-slate-400" />
                <span>{user?.location || <span className="text-slate-400 italic">Not specified</span>}</span>
              </div>
              <div className="flex items-center gap-3 text-slate-700">
                <Phone className="w-5 h-5 text-slate-400" />
                <span>{user?.phoneNumber || <span className="text-slate-400 italic">Not specified</span>}</span>
              </div>
              {role === 'hr' && user?.workEmail && (
                <div className="flex items-center gap-3 text-slate-700">
                  <Mail className="w-5 h-5 text-slate-400" />
                  <span>{user.workEmail} <span className="text-xs text-slate-400">(Work)</span></span>
                </div>
              )}
            </div>
          </section>
        </div>

        <div className="space-y-8">
          <section>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4 border-b border-slate-100 pb-2">Professional Info</h3>
            <div className="space-y-4">
              {role === 'hr' && (
                <>
                  <div>
                    <p className="text-xs text-slate-500 font-medium mb-1">Company</p>
                    <p className="font-semibold text-slate-800 flex items-center gap-2">
                      <Building className="w-4 h-4 text-indigo-500" />
                      {user?.companyName || 'Not specified'}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-medium mb-1">Department</p>
                    <p className="text-slate-800">{user?.department || 'Not specified'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-medium mb-1">Hiring Focus</p>
                    <p className="text-slate-800">{user?.hiringFocus || 'Not specified'}</p>
                  </div>
                </>
              )}

              {role === 'admin' && (
                <>
                  <div>
                    <p className="text-xs text-slate-500 font-medium mb-1">Department / Team</p>
                    <p className="text-slate-800 flex items-center gap-2">
                      <Building className="w-4 h-4 text-indigo-500" />
                      {user?.department || 'Not specified'}
                    </p>
                  </div>
                </>
              )}
            </div>
          </section>

          <section>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4 border-b border-slate-100 pb-2">Links</h3>
            <div className="flex flex-col gap-3">
              {user?.linkedInUrl ? (
                <a href={user.linkedInUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-medium">
                  <LinkIcon className="w-5 h-5" /> LinkedIn Profile
                </a>
              ) : (
                <span className="flex items-center gap-2 text-slate-400"><LinkIcon className="w-5 h-5" /> No LinkedIn added</span>
              )}
              
              {user?.personalWebsite ? (
                <a href={user.personalWebsite} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-medium">
                  <Globe className="w-5 h-5" /> {role === 'hr' ? 'Company Website' : 'Personal Website'}
                </a>
              ) : (
                <span className="flex items-center gap-2 text-slate-400"><Globe className="w-5 h-5" /> No website added</span>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
