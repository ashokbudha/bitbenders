import { useStudent } from '../context/StudentContext';
import { ROLES, ROADMAPS } from '../data/mockData';
import { CheckCircle2, Circle } from 'lucide-react';

export default function LearningPage() {
  const { careerPath, completedCourses, completeCourse } = useStudent();
  
  if (!careerPath) return <div className="p-8 text-center text-brand-gray">Please select a career path first.</div>;
  
  const courses = ROADMAPS[careerPath] || [];
  const progress = Math.round((completedCourses.length / courses.length) * 100) || 0;

  return (
    <div className="animate-in fade-in duration-500">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-brand-black mb-2">Learning Path</h1>
        <p className="text-brand-gray">Complete these courses to unlock your capstone projects.</p>
      </div>

      {/* Progress Bar */}
      <div className="bg-brand-white p-6 rounded-2xl border border-brand-gray/20 mb-8 shadow-sm">
        <div className="flex justify-between items-end mb-2">
          <h2 className="font-bold text-brand-black">Overall Progress</h2>
          <span className="text-brand-green font-bold">{progress}%</span>
        </div>
        <div className="w-full bg-brand-gray/10 rounded-full h-3">
          <div className="bg-brand-green h-3 rounded-full transition-all duration-1000" style={{ width: `${progress}%` }}></div>
        </div>
      </div>

      {/* Course List */}
      <div className="space-y-4">
        {courses.map((course, index) => {
          const isCompleted = completedCourses.includes(course.id);
          
          return (
            <div key={course.id} className={`p-6 rounded-2xl border-2 flex items-start gap-4 transition-all ${
              isCompleted ? 'bg-brand-green/10/50 border-indigo-200' : 'bg-brand-white border-brand-gray/20 hover:border-indigo-300'
            }`}>
              <button 
                onClick={() => completeCourse(course.id)}
                className="mt-1 flex-shrink-0"
              >
                {isCompleted ? (
                  <CheckCircle2 className="w-8 h-8 text-brand-green" />
                ) : (
                  <Circle className="w-8 h-8 text-brand-gray/40 hover:text-indigo-400 transition-colors" />
                )}
              </button>
              
              <div className="flex-1">
                <h3 className={`text-lg font-bold ${isCompleted ? 'text-indigo-900' : 'text-brand-black'}`}>
                  Module {index + 1}: {course.title}
                </h3>
                <p className="text-brand-gray text-sm mt-1 mb-3">{course.why}</p>
                <div className="bg-brand-neutral text-xs font-semibold text-brand-gray p-2 rounded-lg inline-block">
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
