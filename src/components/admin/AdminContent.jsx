import { useState } from 'react';
import { ROLES, ROADMAPS, PROJECTS } from '../../data/mockData';
import { BookOpen, Map, Briefcase, Plus, Edit2, Trash2 } from 'lucide-react';

export default function AdminContent() {
  const [activeSubTab, setActiveSubTab] = useState('paths');

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Content Management</h2>
          <p className="text-slate-500 text-sm">Manage career paths, courses, capstone projects, and skill tags.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 transition-colors">
          <Plus className="w-5 h-5" /> 
          {activeSubTab === 'paths' ? 'New Career Path' : activeSubTab === 'courses' ? 'New Course' : 'New Project'}
        </button>
      </div>

      <div className="flex border-b border-slate-200">
        {['paths', 'courses', 'projects', 'skills'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveSubTab(tab)}
            className={`px-6 py-3 font-semibold text-sm capitalize transition-colors border-b-2 ${
              activeSubTab === tab 
                ? 'border-indigo-600 text-indigo-600' 
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            {tab === 'paths' ? 'Career Paths' : tab}
          </button>
        ))}
      </div>

      <div className="mt-6">
        {activeSubTab === 'paths' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ROLES.map(role => (
              <div key={role.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col h-full">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
                    <Map className="w-6 h-6" />
                  </div>
                  <div className="flex gap-2">
                    <button className="p-1.5 text-slate-400 hover:text-indigo-600 transition-colors"><Edit2 className="w-4 h-4" /></button>
                    <button className="p-1.5 text-slate-400 hover:text-red-600 transition-colors"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{role.title}</h3>
                <p className="text-sm text-slate-600 mb-4 flex-1">{role.expectations}</p>
                <div className="pt-4 border-t border-slate-100 flex justify-between text-xs font-semibold text-slate-500">
                  <span>{ROADMAPS[role.id]?.length || 0} Courses</span>
                  <span>1 Capstone</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeSubTab === 'courses' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase text-xs font-semibold">
                <tr>
                  <th className="px-6 py-4">Course Title</th>
                  <th className="px-6 py-4">Career Path</th>
                  <th className="px-6 py-4">Output/Goal</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {Object.entries(ROADMAPS).flatMap(([pathId, courses]) => 
                  courses.map(course => (
                    <tr key={`${pathId}-${course.id}`} className="hover:bg-slate-50">
                      <td className="px-6 py-4 font-semibold text-slate-900">{course.title}</td>
                      <td className="px-6 py-4">
                        <span className="bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-md text-xs font-bold capitalize">
                          {pathId.replace('-', ' ')}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-500">{course.output}</td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-indigo-600 hover:text-indigo-800 font-medium text-xs">Edit</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {activeSubTab === 'projects' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(PROJECTS).map(([pathId, project]) => (
              <div key={pathId} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <span className="bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-md text-xs font-bold capitalize mb-2 inline-block">
                    {pathId.replace('-', ' ')} Capstone
                  </span>
                  <div className="flex gap-2">
                    <button className="text-indigo-600 hover:text-indigo-800 font-medium text-xs">Edit Rules</button>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{project.title}</h3>
                <p className="text-sm text-slate-600 mb-4">{project.why}</p>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Unlock Criteria</h4>
                  <p className="text-sm font-medium text-slate-700">Must complete all {ROADMAPS[pathId]?.length || 0} courses in the {pathId} roadmap.</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeSubTab === 'skills' && (
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm text-center">
            <h3 className="text-lg font-bold text-slate-700 mb-2">Skill Taxonomy Manager</h3>
            <p className="text-slate-500 max-w-md mx-auto mb-6">Create global tags (e.g. React, Git, Testing) to map Courses to Opportunities for perfect readiness matching.</p>
            <div className="flex flex-wrap justify-center gap-2 max-w-2xl mx-auto">
              {['HTML', 'CSS', 'JavaScript', 'React', 'Git', 'Social Media', 'Meta Ads', 'SEO', 'Manual Testing'].map(skill => (
                <span key={skill} className="px-3 py-1.5 bg-slate-100 border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 hover:border-indigo-300 hover:bg-indigo-50 cursor-pointer transition-colors">
                  {skill}
                </span>
              ))}
              <span className="px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-sm font-semibold cursor-pointer shadow-sm flex items-center gap-1 hover:bg-indigo-700">
                <Plus className="w-4 h-4" /> Add Skill
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
