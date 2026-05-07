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
    <div className="bg-brand-white rounded-3xl border border-brand-gray/20 shadow-sm overflow-hidden animate-in fade-in duration-300">
      <div className="bg-brand-black p-8 text-brand-white flex justify-between items-start">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 bg-brand-green rounded-full flex items-center justify-center text-3xl font-bold border-4 border-brand-black shadow-lg">
            {user?.displayName?.charAt(0) || 'U'}
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-1">{user?.displayName || 'User Name'}</h2>
            <div className="flex flex-wrap items-center gap-4 text-brand-gray/40 text-sm">
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
          className="flex items-center gap-2 bg-brand-white/10 hover:bg-brand-white/20 text-brand-white px-4 py-2 rounded-xl transition-colors font-medium text-sm"
        >
          <Edit3 className="w-4 h-4" /> Edit Profile
        </button>
      </div>

      <div className="p-8 grid md:grid-cols-2 gap-8">
        <div className="space-y-8">
          <section>
            <h3 className="text-sm font-bold uppercase tracking-wider text-brand-gray mb-4 border-b border-brand-gray/10 pb-2">About</h3>
            {user?.bio ? (
              <p className="text-brand-gray leading-relaxed">{user.bio}</p>
            ) : (
              <p className="text-brand-gray/60 italic">No bio provided.</p>
            )}
          </section>

          <section>
            <h3 className="text-sm font-bold uppercase tracking-wider text-brand-gray mb-4 border-b border-brand-gray/10 pb-2">Contact & Location</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-brand-gray">
                <MapPin className="w-5 h-5 text-brand-gray/60" />
                <span>{user?.location || <span className="text-brand-gray/60 italic">Not specified</span>}</span>
              </div>
              <div className="flex items-center gap-3 text-brand-gray">
                <Phone className="w-5 h-5 text-brand-gray/60" />
                <span>{user?.phoneNumber || <span className="text-brand-gray/60 italic">Not specified</span>}</span>
              </div>
              {role === 'hr' && user?.workEmail && (
                <div className="flex items-center gap-3 text-brand-gray">
                  <Mail className="w-5 h-5 text-brand-gray/60" />
                  <span>{user.workEmail} <span className="text-xs text-brand-gray/60">(Work)</span></span>
                </div>
              )}
            </div>
          </section>
        </div>

        <div className="space-y-8">
          <section>
            <h3 className="text-sm font-bold uppercase tracking-wider text-brand-gray mb-4 border-b border-brand-gray/10 pb-2">Professional Info</h3>
            <div className="space-y-4">
              {role === 'hr' && (
                <>
                  <div>
                    <p className="text-xs text-brand-gray font-medium mb-1">Company</p>
                    <p className="font-semibold text-brand-black flex items-center gap-2">
                      <Building className="w-4 h-4 text-brand-green" />
                      {user?.companyName || 'Not specified'}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-brand-gray font-medium mb-1">Department</p>
                    <p className="text-brand-black">{user?.department || 'Not specified'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-brand-gray font-medium mb-1">Hiring Focus</p>
                    <p className="text-brand-black">{user?.hiringFocus || 'Not specified'}</p>
                  </div>
                </>
              )}

              {role === 'admin' && (
                <>
                  <div>
                    <p className="text-xs text-brand-gray font-medium mb-1">Department / Team</p>
                    <p className="text-brand-black flex items-center gap-2">
                      <Building className="w-4 h-4 text-brand-green" />
                      {user?.department || 'Not specified'}
                    </p>
                  </div>
                </>
              )}
            </div>
          </section>

          <section>
            <h3 className="text-sm font-bold uppercase tracking-wider text-brand-gray mb-4 border-b border-brand-gray/10 pb-2">Links</h3>
            <div className="flex flex-col gap-3">
              {user?.linkedInUrl ? (
                <a href={user.linkedInUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-brand-green hover:text-indigo-800 font-medium">
                  <LinkIcon className="w-5 h-5" /> LinkedIn Profile
                </a>
              ) : (
                <span className="flex items-center gap-2 text-brand-gray/60"><LinkIcon className="w-5 h-5" /> No LinkedIn added</span>
              )}
              
              {user?.personalWebsite ? (
                <a href={user.personalWebsite} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-brand-green hover:text-indigo-800 font-medium">
                  <Globe className="w-5 h-5" /> {role === 'hr' ? 'Company Website' : 'Personal Website'}
                </a>
              ) : (
                <span className="flex items-center gap-2 text-brand-gray/60"><Globe className="w-5 h-5" /> No website added</span>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
