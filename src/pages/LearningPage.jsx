import { useStudent } from '../context/StudentContext';
import { ROLES, ROADMAPS } from '../data/mockData';
import { CheckCircle2, Circle } from 'lucide-react';

export default function LearningPage() {
  const { careerPath, completedCourses, completeCourse } = useStudent();
  
  if (!careerPath) return <div className="p-8 text-center text-slate-500">Please select a career path first.</div>;
  
  const courses = ROADMAPS[careerPath] || [];
  const progress = Math.round((completedCourses.length / courses.length) * 100) || 0;

  return (
    <div className="animate-in fade-in duration-500">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Learning Path</h1>
        <p className="text-slate-600">Complete these courses to unlock your capstone projects.</p>
      </div>

      {/* Progress Bar */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 mb-8 shadow-sm">
        <div className="flex justify-between items-end mb-2">
          <h2 className="font-bold text-slate-800">Overall Progress</h2>
          <span className="text-indigo-600 font-bold">{progress}%</span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-3">
          <div className="bg-indigo-600 h-3 rounded-full transition-all duration-1000" style={{ width: `${progress}%` }}></div>
        </div>
      </div>

      {/* Course List */}
      <div className="space-y-4">
        {courses.map((course, index) => {
          const isCompleted = completedCourses.includes(course.id);
          
          return (
            <div key={course.id} className={`p-6 rounded-2xl border-2 flex items-start gap-4 transition-all ${
              isCompleted ? 'bg-indigo-50/50 border-indigo-200' : 'bg-white border-slate-200 hover:border-indigo-300'
            }`}>
              <button 
                onClick={() => completeCourse(course.id)}
                className="mt-1 flex-shrink-0"
              >
                {isCompleted ? (
                  <CheckCircle2 className="w-8 h-8 text-indigo-600" />
                ) : (
                  <Circle className="w-8 h-8 text-slate-300 hover:text-indigo-400 transition-colors" />
                )}
              </button>
              
              <div className="flex-1">
                <h3 className={`text-lg font-bold ${isCompleted ? 'text-indigo-900' : 'text-slate-900'}`}>
                  Module {index + 1}: {course.title}
                </h3>
                <p className="text-slate-600 text-sm mt-1 mb-3">{course.why}</p>
                <div className="bg-slate-50 text-xs font-semibold text-slate-500 p-2 rounded-lg inline-block">
                  Output: {course.output}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
