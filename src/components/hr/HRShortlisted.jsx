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
    { id: 'shortlisted', label: 'Shortlisted', color: 'bg-indigo-100 text-brand-green/90 border-indigo-200' },
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
          <h2 className="text-2xl font-bold text-brand-black">Candidate Workflow</h2>
          <p className="text-brand-gray text-sm">Manage shortlisted candidates and track hiring progress.</p>
        </div>
      </div>

      <div className="bg-brand-white rounded-2xl border border-brand-gray/20 shadow-sm overflow-hidden flex">
        <table className="w-full text-left text-sm">
          <thead className="bg-brand-neutral border-b border-brand-gray/20 text-brand-gray uppercase text-xs font-semibold">
            <tr>
              <th className="px-6 py-4">Candidate</th>
              <th className="px-6 py-4">Applied For</th>
              <th className="px-6 py-4">Pipeline Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-gray/10">
            {shortlist.length === 0 ? (
              <tr>
                <td colSpan="4" className="p-8 text-center text-brand-gray">No candidates in your pipeline yet. Discover and shortlist talent to see them here.</td>
              </tr>
            ) : (
              shortlist.map(item => {
                const student = MOCK_STUDENTS.find(s => s.id === item.studentId);
                const roleTitle = ROLES.find(r => r.id === student?.careerPath)?.title || 'Unknown Role';
                
                return (
                  <tr key={item.studentId} className="hover:bg-brand-neutral">
                    <td className="px-6 py-4">
                      <div className="font-bold text-brand-black">{student?.name}</div>
                      <div className="text-brand-gray text-xs mt-1">{roleTitle}</div>
                    </td>
                    <td className="px-6 py-4 font-medium text-brand-gray">
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
                      <div className="flex justify-end gap-2 text-brand-gray/60">
                        <button className="p-1.5 hover:text-brand-green hover:bg-brand-green/10 rounded-lg transition-colors" title="Message"><Mail className="w-4 h-4" /></button>
                        <button className="p-1.5 hover:text-brand-green hover:bg-brand-green/10 rounded-lg transition-colors" title="Schedule Interview"><Calendar className="w-4 h-4" /></button>
                        <button onClick={() => removeCandidate(item.studentId)} className="p-1.5 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Remove"><XCircle className="w-4 h-4" /></button>
                        <button className="p-1.5 hover:text-brand-black hover:bg-brand-gray/10 rounded-lg transition-colors"><MoreHorizontal className="w-4 h-4" /></button>
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
