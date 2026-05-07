import { useState } from 'react';
import { Search, Filter, CheckCircle2, AlertCircle, MapPin, Briefcase, GraduationCap, X, ExternalLink, Mail } from 'lucide-react';
import { MOCK_STUDENTS, JOBS, ROLES, ROADMAPS } from '../../data/mockData';

export default function HRDiscovery() {
  const [selectedJobId, setSelectedJobId] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewingStudent, setViewingStudent] = useState(null);

  // Find the selected job to match against
  const targetJob = JOBS.find(j => j.id === parseInt(selectedJobId));

  const calculateReadiness = (student, job) => {
    if (!job) return null;
    const requiredCourses = job.requirements?.courses || [];
    const requiredProjects = job.requirements?.projects || 0;

    const completedCoursesSet = new Set(student.completedCourses);
    const missingCourses = requiredCourses.filter(c => !completedCoursesSet.has(c));
    const missingProjectsCount = Math.max(0, requiredProjects - student.completedProjects.length);

    const totalRequirements = requiredCourses.length + requiredProjects;
    if (totalRequirements === 0) return { score: 100, isReady: true, missing: [] };

    const completedCount = (requiredCourses.length - missingCourses.length) + (student.completedProjects.length >= requiredProjects ? requiredProjects : student.completedProjects.length);
    const score = Math.round((completedCount / totalRequirements) * 100);

    return {
      score,
      isReady: score === 100,
      missingCourses,
      missingProjectsCount
    };
  };

  const filteredStudents = MOCK_STUDENTS.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          student.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    
    // If a job is selected, only show students in that career path
    const matchesPath = targetJob ? student.careerPath === targetJob.roleId : true;
    
    return matchesSearch && matchesPath;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-brand-black">Discover Talent</h2>
          <p className="text-brand-gray text-sm">Find candidates based on proven skills and readiness.</p>
        </div>
      </div>

      <div className="bg-brand-white p-4 rounded-2xl border border-brand-gray/20 shadow-sm flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-3 text-brand-gray/60" />
          <input 
            type="text" 
            placeholder="Search by name, skills..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-brand-gray/40 rounded-xl focus:ring-2 focus:ring-brand-green outline-none"
          />
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-brand-gray whitespace-nowrap">Match Against:</span>
          <select 
            value={selectedJobId}
            onChange={(e) => setSelectedJobId(e.target.value)}
            className="w-full md:w-64 px-4 py-2 border border-brand-gray/40 rounded-xl focus:ring-2 focus:ring-brand-green outline-none bg-brand-white"
          >
            <option value="all">General Browse (No Matcher)</option>
            {JOBS.map(job => (
              <option key={job.id} value={job.id}>{job.title} ({ROLES.find(r=>r.id===job.roleId)?.title})</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {filteredStudents.length === 0 ? (
          <div className="p-12 text-center text-brand-gray bg-brand-white rounded-3xl border border-brand-gray/20 border-dashed">
            <Filter className="w-12 h-12 text-brand-gray/40 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-brand-black mb-2">No Candidates Found</h3>
            <p>Try adjusting your search or matching criteria.</p>
          </div>
        ) : (
          filteredStudents.map(student => {
            const readiness = calculateReadiness(student, targetJob);
            const role = ROLES.find(r => r.id === student.careerPath);

            return (
              <div key={student.id} className="bg-brand-white rounded-2xl border border-brand-gray/20 shadow-sm overflow-hidden flex flex-col md:flex-row transition-all hover:shadow-md">
                <div className="p-6 flex-1 border-b md:border-b-0 md:border-r border-brand-gray/10">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-brand-black mb-1">{student.name}</h3>
                      <div className="flex flex-wrap items-center gap-4 text-brand-gray text-sm font-medium">
                        <span className="flex items-center gap-1.5"><GraduationCap className="w-4 h-4" /> {role?.title}</span>
                        <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {student.location}</span>
                        {student.portfolioUrl && (
                          <a href={`https://${student.portfolioUrl}`} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-brand-green hover:underline">
                            <Briefcase className="w-4 h-4" /> Portfolio
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-xs font-bold text-brand-gray uppercase tracking-wider mb-2">Validated Skills</p>
                    <div className="flex flex-wrap gap-2">
                      {student.skills.map((skill, idx) => (
                        <span key={idx} className="bg-brand-neutral border border-brand-gray/20 text-brand-gray text-xs font-semibold px-2.5 py-1 rounded-md">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-brand-gray">
                    <span className="font-semibold text-brand-black">{student.completedCourses.length}</span> Courses Completed
                    <span>&bull;</span>
                    <span className="font-semibold text-brand-black">{student.completedProjects.length}</span> Capstones Done
                  </div>
                </div>

                <div className="p-6 md:w-80 bg-brand-neutral flex flex-col justify-between">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-brand-gray mb-3">
                      {targetJob ? 'Match Readiness' : 'Availability'}
                    </h4>
                    
                    {targetJob && readiness ? (
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-2xl font-bold text-brand-black">{readiness.score}%</span>
                          {readiness.isReady ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-md text-xs font-bold"><CheckCircle2 className="w-3.5 h-3.5" /> Ready</span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-amber-100 text-amber-800 border border-amber-200 rounded-md text-xs font-bold"><AlertCircle className="w-3.5 h-3.5" /> Missing Proof</span>
                          )}
                        </div>
                        <div className="w-full bg-brand-gray/20 rounded-full h-1.5 mb-4">
                          <div className={`h-1.5 rounded-full ${readiness.isReady ? 'bg-brand-green' : 'bg-brand-green'}`} style={{ width: `${readiness.score}%` }}></div>
                        </div>
                        
                        {!readiness.isReady && (
                          <div className="text-xs text-brand-gray bg-brand-white p-3 rounded-xl border border-brand-gray/20 shadow-sm">
                            <p className="font-semibold text-brand-black mb-1 uppercase">Missing Requirements:</p>
                            <ul className="list-disc list-inside space-y-1">
                              {readiness.missingCourses.map(cId => {
                                const courseMap = ROADMAPS[student.careerPath] || [];
                                const course = courseMap.find(c => c.id === cId);
                                return <li key={cId}>{course?.title || 'Required Course'}</li>;
                              })}
                              {readiness.missingProjectsCount > 0 && <li>{readiness.missingProjectsCount} Capstone Project(s)</li>}
                            </ul>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-semibold text-sm bg-brand-green/10 text-brand-green/90 border-indigo-200">
                        {student.availabilityStatus}
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2 mt-4">
                    <button 
                      onClick={() => setViewingStudent({ student, readiness, targetJob })}
                      className="flex-1 py-2 px-4 rounded-xl border border-brand-gray/20 bg-brand-white text-brand-gray font-medium hover:bg-brand-neutral transition-colors shadow-sm text-sm"
                    >
                      View Profile Details
                    </button>
                    <button className="flex-1 py-2 px-4 rounded-xl bg-brand-green text-brand-white font-medium hover:bg-brand-green/90 transition-colors shadow-sm text-sm">
                      Shortlist
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Candidate Review Modal */}
      {viewingStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-black/50 backdrop-blur-sm">
          <div className="bg-brand-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col">
            <div className="sticky top-0 bg-brand-white border-b border-brand-gray/10 p-6 flex justify-between items-start z-10">
              <div>
                <h2 className="text-2xl font-bold text-brand-black">{viewingStudent.student.name}</h2>
                <div className="flex items-center gap-4 text-brand-gray mt-2">
                  <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {viewingStudent.student.location}</span>
                  <span className="flex items-center gap-1.5"><Briefcase className="w-4 h-4" /> {viewingStudent.student.availabilityStatus}</span>
                </div>
              </div>
              <button 
                onClick={() => setViewingStudent(null)}
                className="p-2 bg-brand-gray/10 text-brand-gray hover:bg-brand-gray/20 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2 space-y-8">
                <section>
                  <h3 className="text-sm font-bold text-brand-black uppercase tracking-wider mb-4 border-b border-brand-gray/10 pb-2">Verified Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {viewingStudent.student.skills.map((skill, idx) => (
                      <span key={idx} className="bg-brand-green/10 border border-indigo-100 text-brand-green/90 font-semibold px-3 py-1.5 rounded-lg text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </section>

                <section>
                  <h3 className="text-sm font-bold text-brand-black uppercase tracking-wider mb-4 border-b border-brand-gray/10 pb-2">Completed Courses</h3>
                  <div className="space-y-3">
                    {viewingStudent.student.completedCourses.map(cId => {
                      const courseMap = ROADMAPS[viewingStudent.student.careerPath] || [];
                      const course = courseMap.find(c => c.id === cId);
                      return (
                        <div key={cId} className="flex gap-3 items-start p-3 bg-brand-neutral rounded-xl border border-brand-gray/10">
                          <CheckCircle2 className="w-5 h-5 text-brand-green flex-shrink-0" />
                          <div>
                            <p className="font-semibold text-brand-black">{course?.title || 'Course Completed'}</p>
                            <p className="text-xs text-brand-gray mt-1">{course?.output}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </section>

                <section>
                  <h3 className="text-sm font-bold text-brand-black uppercase tracking-wider mb-4 border-b border-brand-gray/10 pb-2">Capstone Projects</h3>
                  <div className="space-y-4">
                    {viewingStudent.student.completedProjects.length === 0 ? (
                      <p className="text-brand-gray italic">No capstone projects completed yet.</p>
                    ) : (
                      viewingStudent.student.completedProjects.map((proj, idx) => (
                        <div key={idx} className="p-4 border border-brand-gray/20 rounded-xl shadow-sm">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-bold text-brand-black capitalize">{proj.id.replace('-', ' ')} Capstone</h4>
                            <a href={`https://${proj.link}`} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-xs font-bold text-brand-green bg-brand-green/10 px-2 py-1 rounded hover:bg-indigo-100">
                              <ExternalLink className="w-3.5 h-3.5" /> View Project
                            </a>
                          </div>
                          <p className="text-sm text-brand-gray">This candidate has successfully built the required capstone demonstrating end-to-end knowledge of the roadmap.</p>
                        </div>
                      ))
                    )}
                  </div>
                </section>
              </div>

              <div className="space-y-6">
                {viewingStudent.targetJob && viewingStudent.readiness && (
                  <div className={`p-5 rounded-2xl border shadow-sm ${viewingStudent.readiness.isReady ? 'bg-brand-green/10 border-emerald-200' : 'bg-brand-green/10 border-amber-200'}`}>
                    <h3 className="text-xs font-bold uppercase tracking-wider mb-2 text-brand-gray">Match Readiness</h3>
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`text-3xl font-extrabold ${viewingStudent.readiness.isReady ? 'text-emerald-700' : 'text-amber-700'}`}>
                        {viewingStudent.readiness.score}%
                      </span>
                      <span className="font-semibold text-brand-gray">Match</span>
                    </div>
                    {!viewingStudent.readiness.isReady && (
                      <div className="text-sm text-amber-800">
                        <p className="font-bold mb-1">Missing:</p>
                        <ul className="list-disc list-inside">
                          {viewingStudent.readiness.missingCourses.length > 0 && <li>{viewingStudent.readiness.missingCourses.length} Courses</li>}
                          {viewingStudent.readiness.missingProjectsCount > 0 && <li>Capstone Project</li>}
                        </ul>
                      </div>
                    )}
                    {viewingStudent.readiness.isReady && (
                      <p className="text-sm text-emerald-800 font-medium">This candidate fully meets your posted requirements.</p>
                    )}
                  </div>
                )}

                <div className="bg-brand-neutral p-5 rounded-2xl border border-brand-gray/20">
                  <h3 className="text-sm font-bold text-brand-black mb-4">External Links</h3>
                  <div className="space-y-3">
                    {viewingStudent.student.portfolioUrl && (
                      <a href={`https://${viewingStudent.student.portfolioUrl}`} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-sm font-medium text-brand-gray hover:text-brand-green group">
                        <div className="p-2 bg-brand-white rounded-lg border border-brand-gray/20 group-hover:border-indigo-200 group-hover:bg-brand-green/10"><Briefcase className="w-4 h-4" /></div>
                        Portfolio Website
                      </a>
                    )}
                    <button className="flex items-center gap-3 text-sm font-medium text-brand-gray hover:text-brand-green group">
                      <div className="p-2 bg-brand-white rounded-lg border border-brand-gray/20 group-hover:border-indigo-200 group-hover:bg-brand-green/10"><Mail className="w-4 h-4" /></div>
                      Contact Candidate
                    </button>
                  </div>
                </div>

                <button className="w-full py-3 px-4 bg-brand-green hover:bg-brand-green/90 text-brand-white font-bold rounded-xl shadow-sm transition-colors flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-5 h-5" /> Shortlist Candidate
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
