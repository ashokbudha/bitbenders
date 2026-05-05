import { useState } from 'react';
import { Mail, Calendar, XCircle, MoreHorizontal } from 'lucide-react';
import { MOCK_STUDENTS, ROLES } from '../../data/mockData';

// Mock shortlist
const INITIAL_SHORTLIST = [
  { studentId: 's1', jobId: 1, status: 'interview' },
  { studentId: 's3', jobId: 4, status: 'shortlisted' }
];

export default function HRShortlisted() {
  const [shortlist, setShortlist] = useState(INITIAL_SHORTLIST);

  const statuses = [
    { id: 'shortlisted', label: 'Shortlisted', color: 'bg-indigo-100 text-indigo-700 border-indigo-200' },
    { id: 'contacted', label: 'Contacted', color: 'bg-amber-100 text-amber-700 border-amber-200' },
    { id: 'interview', label: 'Interviewing', color: 'bg-purple-100 text-purple-700 border-purple-200' }
  ];

  const updateStatus = (studentId, newStatus) => {
    setShortlist(prev => prev.map(item => 
      item.studentId === studentId ? { ...item, status: newStatus } : item
    ));
  };

  const removeCandidate = (studentId) => {
    setShortlist(prev => prev.filter(item => item.studentId !== studentId));
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Candidate Workflow</h2>
          <p className="text-slate-500 text-sm">Manage shortlisted candidates and track hiring progress.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase text-xs font-semibold">
            <tr>
              <th className="px-6 py-4">Candidate</th>
              <th className="px-6 py-4">Applied For</th>
              <th className="px-6 py-4">Pipeline Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {shortlist.length === 0 ? (
              <tr>
                <td colSpan="4" className="p-8 text-center text-slate-500">No candidates in your pipeline yet. Discover and shortlist talent to see them here.</td>
              </tr>
            ) : (
              shortlist.map(item => {
                const student = MOCK_STUDENTS.find(s => s.id === item.studentId);
                const roleTitle = ROLES.find(r => r.id === student?.careerPath)?.title || 'Unknown Role';
                
                return (
                  <tr key={item.studentId} className="hover:bg-slate-50">
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-900">{student?.name}</div>
                      <div className="text-slate-500 text-xs mt-1">{roleTitle}</div>
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-700">
                      {item.jobId === 1 ? 'Frontend Intern' : 'Junior Digital Marketer'}
                    </td>
                    <td className="px-6 py-4">
                      <select 
                        value={item.status}
                        onChange={(e) => updateStatus(item.studentId, e.target.value)}
                        className={`text-xs font-bold px-3 py-1.5 rounded-lg border outline-none cursor-pointer ${statuses.find(s => s.id === item.status)?.color}`}
                      >
                        {statuses.map(s => (
                          <option key={s.id} value={s.id}>{s.label}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2 text-slate-400">
                        <button className="p-1.5 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors" title="Message"><Mail className="w-4 h-4" /></button>
                        <button className="p-1.5 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors" title="Schedule Interview"><Calendar className="w-4 h-4" /></button>
                        <button onClick={() => removeCandidate(item.studentId)} className="p-1.5 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Remove"><XCircle className="w-4 h-4" /></button>
                        <button className="p-1.5 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"><MoreHorizontal className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
