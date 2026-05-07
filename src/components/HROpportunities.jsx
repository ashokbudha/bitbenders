import { useState } from 'react';
import { JOBS, ROLES, ROADMAPS } from '../data/mockData';
import { PlusCircle, Building, MapPin, Edit3, Trash2, Users } from 'lucide-react';

export default function HROpportunities() {
  const [opportunities, setOpportunities] = useState(JOBS);
  const [isCreating, setIsCreating] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    roleId: 'frontend-dev',
    type: 'internship',
    location: '',
    expectations: '',
    requiredCoursesCount: 0,
    requiredProjectsCount: 0,
    skills: ''
  });

  const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const newJob = {
      id: Date.now(),
      company: 'Your Company', // Hardcoded for MVP, would normally come from HR context
      ...formData,
      requirements: { 
        courses: ROADMAPS[formData.roleId]?.slice(0, formData.requiredCoursesCount).map(c => c.id) || [], 
        projects: parseInt(formData.requiredProjectsCount), 
        skills: formData.skills.split(',').map(s => s.trim()).filter(Boolean) 
      }
    };
    setOpportunities([newJob, ...opportunities]);
    setIsCreating(false);
    setFormData({ title: '', roleId: 'frontend-dev', type: 'internship', location: '', expectations: '', requiredCoursesCount: 0, requiredProjectsCount: 0, skills: '' });
  };

  return (
    <div className="animate-in fade-in duration-300">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-brand-black">Manage Opportunities</h2>
          <p className="text-brand-gray">Post internships, traineeships, and junior roles.</p>
        </div>
        <button 
          onClick={() => setIsCreating(!isCreating)}
          className="flex items-center gap-2 px-4 py-2 bg-brand-green text-brand-white font-medium rounded-xl hover:bg-brand-green/90 transition-colors"
        >
          <PlusCircle className="w-5 h-5" /> Post Opportunity
        </button>
      </div>

      {isCreating && (
        <div className="bg-brand-white rounded-2xl border border-brand-gray/20 shadow-sm p-6 mb-8">
          <h3 className="text-lg font-bold text-brand-black mb-4">Post New Opportunity</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-brand-gray mb-1">Opportunity Title</label>
                <input required type="text" name="title" value={formData.title} onChange={handleChange} className="w-full px-4 py-2 border border-brand-gray/40 rounded-xl focus:ring-2 focus:ring-brand-green outline-none" placeholder="e.g. Frontend Intern" />
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-gray mb-1">Target Career Path</label>
                <select name="roleId" value={formData.roleId} onChange={handleChange} className="w-full px-4 py-2 border border-brand-gray/40 rounded-xl focus:ring-2 focus:ring-brand-green outline-none bg-brand-white">
                  {ROLES.map(r => <option key={r.id} value={r.id}>{r.title}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-gray mb-1">Type</label>
                <select name="type" value={formData.type} onChange={handleChange} className="w-full px-4 py-2 border border-brand-gray/40 rounded-xl focus:ring-2 focus:ring-brand-green outline-none bg-brand-white">
                  <option value="internship">Internship</option>
                  <option value="trainee">Trainee</option>
                  <option value="junior">Junior Role</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-gray mb-1">Location / Work Mode</label>
                <input required type="text" name="location" value={formData.location} onChange={handleChange} className="w-full px-4 py-2 border border-brand-gray/40 rounded-xl focus:ring-2 focus:ring-brand-green outline-none" placeholder="e.g. Kathmandu (Hybrid)" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-gray mb-1">Expectations & Description</label>
              <textarea required name="expectations" value={formData.expectations} onChange={handleChange} rows="2" className="w-full px-4 py-2 border border-brand-gray/40 rounded-xl focus:ring-2 focus:ring-brand-green outline-none" placeholder="What should the candidate know?"></textarea>
            </div>
            <div className="bg-brand-neutral p-4 rounded-xl border border-brand-gray/20">
              <h4 className="font-semibold text-brand-black mb-3 text-sm">Readiness Requirements (Used for Matching)</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-brand-gray mb-1">Required Courses (0 to {ROADMAPS[formData.roleId]?.length || 0})</label>
                  <input type="number" min="0" max={ROADMAPS[formData.roleId]?.length || 0} name="requiredCoursesCount" value={formData.requiredCoursesCount} onChange={handleChange} className="w-full px-3 py-1.5 text-sm border border-brand-gray/40 rounded-lg outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-brand-gray mb-1">Required Capstone Projects</label>
                  <input type="number" min="0" max="1" name="requiredProjectsCount" value={formData.requiredProjectsCount} onChange={handleChange} className="w-full px-3 py-1.5 text-sm border border-brand-gray/40 rounded-lg outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-brand-gray mb-1">Skill Tags (comma separated)</label>
                  <input type="text" name="skills" value={formData.skills} onChange={handleChange} className="w-full px-3 py-1.5 text-sm border border-brand-gray/40 rounded-lg outline-none" placeholder="React, Git" />
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <button type="button" onClick={() => setIsCreating(false)} className="px-4 py-2 text-brand-gray font-medium hover:bg-brand-gray/10 rounded-xl transition-colors">Cancel</button>
              <button type="submit" className="px-6 py-2 bg-brand-green text-brand-white font-medium rounded-xl hover:bg-brand-green/90 transition-colors shadow-sm">Publish Opportunity</button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-4">
        {opportunities.map(job => (
          <div key={job.id} className="bg-brand-white rounded-2xl border border-brand-gray/20 shadow-sm p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-gray/10 text-brand-gray mb-2">
                {job.type}
              </span>
              <h4 className="text-lg font-bold text-brand-black">{job.title}</h4>
              <div className="flex items-center gap-4 text-brand-gray text-sm mt-1">
                <span className="flex items-center gap-1.5"><Building className="w-4 h-4" /> {job.company}</span>
                <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {job.location}</span>
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {job.requirements?.skills.map((skill, idx) => (
                  <span key={idx} className="bg-brand-neutral border border-brand-gray/20 text-brand-gray text-xs font-semibold px-2 py-0.5 rounded">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex gap-2 w-full md:w-auto mt-4 md:mt-0">
              <button className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-brand-green bg-brand-green/10 hover:bg-indigo-100 rounded-xl flex-1 md:flex-none transition-colors">
                <Users className="w-4 h-4" /> View Matches
              </button>
              <button className="p-2 text-brand-gray/60 border border-brand-gray/20 hover:bg-brand-neutral hover:text-brand-gray rounded-xl transition-colors">
                <Edit3 className="w-4 h-4" />
              </button>
              <button className="p-2 text-red-400 border border-brand-gray/20 hover:bg-red-50 hover:text-red-600 rounded-xl transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
