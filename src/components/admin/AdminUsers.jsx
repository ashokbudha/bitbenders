import { useState } from 'react';
import { UserCheck, UserX, Shield, MoreVertical, Search, Filter } from 'lucide-react';

// Mock user database for admin view
const MOCK_USERS = [
  { id: '101', name: 'Rabin Sharma', email: 'rabin@example.com', role: 'student', status: 'active', registered: '2023-10-01' },
  { id: '102', name: 'Sita Thapa', email: 'sita@techsolutions.com.np', role: 'hr', status: 'pending_verification', company: 'Tech Solutions', registered: '2023-10-05' },
  { id: '103', name: 'Admin User', email: 'admin@platform.com', role: 'admin', status: 'active', registered: '2023-01-01' },
  { id: '104', name: 'Hari Bahadur', email: 'hari@example.com', role: 'student', status: 'suspended', registered: '2023-09-15' },
  { id: '105', name: 'Gita Nepal', email: 'hr@himalayadigital.com', role: 'hr', status: 'verified', company: 'Himalaya Digital', registered: '2023-08-20' },
];

export default function AdminUsers() {
  const [users, setUsers] = useState(MOCK_USERS);
  const [filterRole, setFilterRole] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const handleVerifyHR = (id) => {
    setUsers(users.map(u => u.id === id ? { ...u, status: 'verified' } : u));
  };

  const handleSuspend = (id) => {
    setUsers(users.map(u => u.id === id ? { ...u, status: u.status === 'suspended' ? 'active' : 'suspended' } : u));
  };

  const filteredUsers = users.filter(u => {
    const matchesRole = filterRole === 'all' || u.role === filterRole;
    const matchesSearch = u.name.toLowerCase().includes(searchQuery.toLowerCase()) || u.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRole && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-brand-black">User & Role Management</h2>
          <p className="text-brand-gray text-sm">Verify HR accounts and manage platform access.</p>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-3 text-brand-gray/60" />
            <input 
              type="text" 
              placeholder="Search users..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-brand-gray/40 rounded-xl focus:ring-2 focus:ring-brand-green outline-none"
            />
          </div>
          <div className="relative">
            <Filter className="w-4 h-4 absolute left-3 top-3 text-brand-gray/60" />
            <select 
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="pl-9 pr-4 py-2 border border-brand-gray/40 rounded-xl focus:ring-2 focus:ring-brand-green outline-none bg-brand-white appearance-none"
            >
              <option value="all">All Roles</option>
              <option value="student">Students</option>
              <option value="hr">HR Partners</option>
              <option value="admin">Admins</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-brand-white rounded-2xl border border-brand-gray/20 shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-brand-neutral border-b border-brand-gray/20 text-brand-gray uppercase text-xs font-semibold">
            <tr>
              <th className="px-6 py-4">User</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Status & Trust</th>
              <th className="px-6 py-4">Joined</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-gray/10">
            {filteredUsers.map(user => (
              <tr key={user.id} className="hover:bg-brand-neutral transition-colors">
                <td className="px-6 py-4">
                  <div className="font-semibold text-brand-black">{user.name}</div>
                  <div className="text-brand-gray text-xs">{user.email}</div>
                  {user.company && <div className="text-brand-green text-xs mt-0.5">{user.company}</div>}
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold capitalize
                    ${user.role === 'admin' ? 'bg-purple-100 text-purple-700' : 
                      user.role === 'hr' ? 'bg-blue-100 text-blue-700' : 
                      'bg-brand-gray/10 text-brand-gray'}`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    {user.status === 'verified' && <span className="flex items-center gap-1 text-brand-green font-medium"><Shield className="w-4 h-4" /> Verified HR</span>}
                    {user.status === 'pending_verification' && <span className="flex items-center gap-1 text-brand-green font-medium"><UserCheck className="w-4 h-4" /> Pending HR Verification</span>}
                    {user.status === 'active' && <span className="text-brand-gray">Active</span>}
                    {user.status === 'suspended' && <span className="flex items-center gap-1 text-red-600 font-medium"><UserX className="w-4 h-4" /> Suspended</span>}
                  </div>
                </td>
                <td className="px-6 py-4 text-brand-gray">{user.registered}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    {user.role === 'hr' && user.status === 'pending_verification' && (
                      <button onClick={() => handleVerifyHR(user.id)} className="text-xs bg-brand-green/10 text-emerald-700 hover:bg-emerald-100 px-3 py-1.5 rounded-lg font-semibold transition-colors">
                        Approve HR
                      </button>
                    )}
                    {user.role !== 'admin' && (
                      <button onClick={() => handleSuspend(user.id)} className={`text-xs px-3 py-1.5 rounded-lg font-semibold transition-colors ${user.status === 'suspended' ? 'bg-brand-gray/10 text-brand-gray hover:bg-brand-gray/20' : 'bg-red-50 text-red-700 hover:bg-red-100'}`}>
                        {user.status === 'suspended' ? 'Reactivate' : 'Suspend'}
                      </button>
                    )}
                    <button className="p-1.5 text-brand-gray/60 hover:text-brand-gray rounded-lg transition-colors">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredUsers.length === 0 && (
          <div className="p-8 text-center text-brand-gray">No users found matching your criteria.</div>
        )}
      </div>
    </div>
  );
}
