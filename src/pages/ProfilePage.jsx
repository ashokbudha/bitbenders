import { useState } from 'react';
import { useStudent } from '../context/StudentContext';
import { ROLES, ROADMAPS, PROJECT_LIBRARY } from '../data/mockData';
import { User, Mail, GraduationCap, BookOpen, Briefcase, ShieldCheck, ExternalLink, Settings, Edit3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProfileForm from '../components/ProfileForm';

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const { user, careerPath, completedCourses, completedProjects } = useStudent();
  
  if (!careerPath) return <div className="p-8 text-center text-slate-500">Please select a career path first.</div>;
  
  const role = ROLES.find(r => r.id === careerPath);
  const requiredCourses = ROADMAPS[careerPath] || [];
  
  const courseProgress = requiredCourses.length > 0 
    ? Math.round((completedCourses.length / requiredCourses.length) * 100) 
    : 0;

  return (
    <div className="animate-in fade-in duration-500 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Professional Profile</h1>
          <p className="text-slate-600">Your automatically generated CV based on your activity.</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => setIsEditing(true)} className="flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-indigo-600 bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm transition-all">
            <Edit3 className="w-4 h-4" />
            Edit Profile
          </button>
          <Link to="/dashboard/setup" className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-indigo-600 bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm transition-all">
            <Settings className="w-4 h-4" />
            Change Path
          </Link>
        </div>
      </div>
      
      {isEditing ? (
        <ProfileForm onCancel={() => setIsEditing(false)} />
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Header / Basic Info */}
        <div className="bg-slate-900 p-8 text-white">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="w-24 h-24 bg-indigo-500 rounded-full flex items-center justify-center text-3xl font-bold border-4 border-slate-800 shadow-lg">
              {user?.displayName?.charAt(0) || 'U'}
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-1">{user?.displayName || 'Student Name'}</h2>
              {user?.headline && <p className="text-indigo-200 font-medium mb-3">{user.headline}</p>}
              <div className="flex flex-wrap items-center gap-4 text-slate-300 text-sm mt-2">
                <span className="flex items-center gap-1.5"><Mail className="w-4 h-4" /> {user?.email}</span>
                {user?.phoneNumber && <span className="flex items-center gap-1.5"><User className="w-4 h-4" /> {user.phoneNumber}</span>}
                <span className="flex items-center gap-1.5"><GraduationCap className="w-4 h-4" /> Entry-level {role?.title}</span>
              </div>
            </div>
            <div className="text-right hidden md:block">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border-4 border-indigo-500/30">
                <span className="text-xl font-bold text-indigo-400">{courseProgress}%</span>
              </div>
              <div className="text-xs text-slate-400 mt-2 uppercase font-bold tracking-wider">Completion</div>
            </div>
          </div>
        </div>

        <div className="p-8">
          <div className="grid md:grid-cols-3 gap-10">
            {/* Left Column */}
            <div className="md:col-span-2 space-y-8">
              
              {/* Completed Projects Section */}
              <section>
                <h3 className="flex items-center gap-2 text-xl font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2">
                  <Briefcase className="w-5 h-5 text-indigo-600" />
                  Portfolio Projects
                </h3>
                
                {completedProjects.length > 0 ? (
                  <div className="space-y-4">
                    {completedProjects.map((proj, idx) => {
                      // Lookup project details from mockData based on proj.id
                      const projectDetails = PROJECT_LIBRARY.find(p => p.id === proj.id);
                      const title = projectDetails?.title || (proj.id === 'capstone' ? proj.reflection : 'Custom Capstone Project');
                      const why = projectDetails?.shortDescription || projectDetails?.why || 'Capstone project proving advanced skills.';

                      return (
                        <div key={idx} className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-bold text-slate-900 text-lg">{title}</h4>
                            <span className="bg-green-100 text-green-700 text-xs font-bold px-2.5 py-1 rounded-md flex items-center gap-1">
                              <ShieldCheck className="w-3.5 h-3.5" /> Verified
                            </span>
                          </div>
                          <p className="text-sm text-slate-600 mb-4">{why}</p>
                          <a href={proj.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-sm font-medium text-indigo-600 hover:text-indigo-800">
                            View Project Work <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 border-dashed text-center">
                    <p className="text-slate-500 text-sm">No completed projects yet. Complete your learning modules to unlock and build projects.</p>
                  </div>
                )}
              </section>

              {/* Education / Courses Section */}
              <section>
                <h3 className="flex items-center gap-2 text-xl font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2">
                  <BookOpen className="w-5 h-5 text-indigo-600" />
                  Learning Journey
                </h3>
                
                <div className="space-y-3">
                  {requiredCourses.map((course, idx) => {
                    const isCompleted = completedCourses.includes(course.id);
                    return (
                      <div key={course.id} className="flex gap-4 items-start">
                        <div className="mt-1">
                          {isCompleted ? (
                            <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center">
                              <ShieldCheck className="w-4 h-4" />
                            </div>
                          ) : (
                            <div className="w-6 h-6 rounded-full bg-slate-100 border-2 border-slate-200"></div>
                          )}
                        </div>
                        <div>
                          <h4 className={`font-bold ${isCompleted ? 'text-slate-800' : 'text-slate-500'}`}>{course.title}</h4>
                          {isCompleted && <p className="text-xs text-slate-500 mt-1">Successfully completed theoretical module and assignments.</p>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>

            </div>

            {/* Right Column */}
            <div className="space-y-8">
              
              {/* Skills Area */}
              <section className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Core Competencies</h3>
                <div className="flex flex-wrap gap-2">
                  {/* Derive skills from completed courses */}
                  {completedCourses.map(id => {
                    const course = requiredCourses.find(c => c.id === id);
                    if (!course) return null;
                    return (
                      <span key={id} className="bg-white border border-slate-200 text-slate-700 text-xs font-semibold px-3 py-1.5 rounded-lg shadow-sm">
                        {course.title.split(' ')[0]}
                      </span>
                    );
                  })}
                  {completedCourses.length === 0 && (
                    <span className="text-slate-500 text-sm">Skills will appear here as you learn.</span>
                  )}
                </div>
              </section>

              {/* Expectations */}
              <section>
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-3">Target Industry Role</h3>
                <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-xl">
                  <h4 className="font-bold text-indigo-900 mb-2">{role?.title}</h4>
                  <p className="text-sm text-indigo-800/80 leading-relaxed">
                    "{role?.expectations}"
                  </p>
                </div>
              </section>

              {/* Contact & Links */}
              <section className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-3">Links & Contact</h3>
                <div className="space-y-3 text-sm text-slate-600">
                  {user?.location && (
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-800">Location:</span> {user.location}
                    </div>
                  )}
                  {user?.linkedInUrl && (
                    <div className="flex items-center gap-2">
                      <a href={user.linkedInUrl} target="_blank" rel="noreferrer" className="text-indigo-600 hover:text-indigo-800 font-medium">LinkedIn Profile</a>
                    </div>
                  )}
                  {user?.githubUrl && (
                    <div className="flex items-center gap-2">
                      <a href={user.githubUrl} target="_blank" rel="noreferrer" className="text-indigo-600 hover:text-indigo-800 font-medium">GitHub Profile</a>
                    </div>
                  )}
                  {user?.portfolioUrl && (
                    <div className="flex items-center gap-2">
                      <a href={user.portfolioUrl} target="_blank" rel="noreferrer" className="text-indigo-600 hover:text-indigo-800 font-medium">Portfolio Website</a>
                    </div>
                  )}
                  {!user?.linkedInUrl && !user?.githubUrl && !user?.portfolioUrl && (
                    <p className="text-slate-400 italic">No links added yet.</p>
                  )}
                </div>
              </section>

            </div>
          </div>
          </div>
        </div>
      )}
    </div>
  );
}
