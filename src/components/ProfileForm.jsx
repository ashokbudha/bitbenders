import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Save, Loader2, X } from 'lucide-react';

export default function ProfileForm({ onCancel }) {
  const { user, role, updateProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  // Combine all possible fields into one form state
  const [formData, setFormData] = useState({
    // Shared
    displayName: user?.displayName || '',
    phoneNumber: user?.phoneNumber || '',
    location: user?.location || '',
    bio: user?.bio || '',
    linkedInUrl: user?.linkedInUrl || '',
    personalWebsite: user?.personalWebsite || '',
    
    // Student Specific
    headline: user?.headline || '',
    college: user?.college || '',
    degree: user?.degree || '',
    graduationYear: user?.graduationYear || '',
    githubUrl: user?.githubUrl || '',
    portfolioUrl: user?.portfolioUrl || '',
    availabilityStatus: user?.availabilityStatus || 'Actively looking',

    // HR Specific
    companyName: user?.companyName || '',
    jobTitle: user?.jobTitle || '',
    department: user?.department || '',
    workEmail: user?.workEmail || '',
    hiringFocus: user?.hiringFocus || '',

    // Admin Specific
    adminTitle: user?.adminTitle || '',
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    try {
      await updateProfile(formData);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        if (onCancel) onCancel();
      }, 1500);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-8 animate-in fade-in zoom-in-95 duration-200">
      <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-900">Edit Profile</h2>
        {onCancel && (
          <button onClick={onCancel} className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-200 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
      
      <form onSubmit={handleSubmit} className="p-6 space-y-8">
        
        {/* SECTION: Basic Information */}
        <section>
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4 border-b border-slate-100 pb-2">Basic Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
              <input type="text" name="displayName" value={formData.displayName} onChange={handleChange} className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email <span className="text-slate-400 font-normal">(Read-only)</span></label>
              <input type="email" value={user?.email || ''} disabled className="w-full px-4 py-2 border border-slate-200 bg-slate-50 text-slate-500 rounded-xl outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
              <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Location</label>
              <input type="text" name="location" value={formData.location} onChange={handleChange} className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="City, Country" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">Bio / About</label>
              <textarea name="bio" value={formData.bio} onChange={handleChange} className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" rows="3" placeholder="Tell us about yourself..." />
            </div>
          </div>
        </section>

        {/* SECTION: Professional Information (Role Specific) */}
        <section>
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4 border-b border-slate-100 pb-2">Professional Information</h3>
          
          {role === 'student' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-1">Professional Headline</label>
                <input type="text" name="headline" value={formData.headline} onChange={handleChange} className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="Aspiring Frontend Developer" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">College / University</label>
                <input type="text" name="college" value={formData.college} onChange={handleChange} className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Degree / Program</label>
                <input type="text" name="degree" value={formData.degree} onChange={handleChange} className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Graduation Year</label>
                <input type="text" name="graduationYear" value={formData.graduationYear} onChange={handleChange} className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Availability Status</label>
                <select name="availabilityStatus" value={formData.availabilityStatus} onChange={handleChange} className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none bg-white">
                  <option value="Actively looking">Actively looking for opportunities</option>
                  <option value="Open to offers">Open to offers</option>
                  <option value="Not looking">Not looking</option>
                </select>
              </div>
            </div>
          )}

          {role === 'hr' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Job Title</label>
                <input type="text" name="jobTitle" value={formData.jobTitle} onChange={handleChange} className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Company Name</label>
                <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Department</label>
                <input type="text" name="department" value={formData.department} onChange={handleChange} className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Work Email</label>
                <input type="email" name="workEmail" value={formData.workEmail} onChange={handleChange} className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="If different from login email" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-1">Hiring Focus</label>
                <input type="text" name="hiringFocus" value={formData.hiringFocus} onChange={handleChange} className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="e.g. Frontend, Backend, Interns" />
              </div>
            </div>
          )}

          {role === 'admin' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Admin Title</label>
                <input type="text" name="adminTitle" value={formData.adminTitle} onChange={handleChange} className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Department / Team</label>
                <input type="text" name="department" value={formData.department} onChange={handleChange} className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" />
              </div>
            </div>
          )}
        </section>

        {/* SECTION: Links */}
        <section>
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4 border-b border-slate-100 pb-2">Links & Social</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">LinkedIn Profile</label>
              <input type="url" name="linkedInUrl" value={formData.linkedInUrl} onChange={handleChange} className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="https://linkedin.com/in/..." />
            </div>
            
            {role === 'student' ? (
              <>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">GitHub Profile</label>
                  <input type="url" name="githubUrl" value={formData.githubUrl} onChange={handleChange} className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="https://github.com/..." />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Portfolio Website</label>
                  <input type="url" name="portfolioUrl" value={formData.portfolioUrl} onChange={handleChange} className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="https://..." />
                </div>
              </>
            ) : (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">{role === 'hr' ? 'Company Website' : 'Personal Website'}</label>
                <input type="url" name="personalWebsite" value={formData.personalWebsite} onChange={handleChange} className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="https://..." />
              </div>
            )}
          </div>
        </section>

        <div className="flex items-center justify-end gap-4 pt-4 border-t border-slate-100">
          {onCancel && (
            <button type="button" onClick={onCancel} className="px-6 py-2 text-slate-600 font-medium hover:bg-slate-100 rounded-xl transition-colors">
              Cancel
            </button>
          )}
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 px-8 py-2 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 transition-colors disabled:opacity-50 shadow-sm"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
