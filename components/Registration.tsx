import React, { useState } from 'react';
import { OfferedCourse } from '../types';
import { CalendarPlus, Search, Plus, Trash2, CheckCircle, AlertCircle } from 'lucide-react';

const Registration: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedCourses, setSelectedCourses] = useState<OfferedCourse[]>([]);
  
  const offeredCourses: OfferedCourse[] = [
    { id: '1', code: 'CSE321', title: 'System Analysis and Design', section: 'A', credits: 3, instructor: 'Dr. Mizanur', schedule: 'Sun 10:00 - 11:30', seats: 40, taken: 32 },
    { id: '2', code: 'CSE321', title: 'System Analysis and Design', section: 'B', credits: 3, instructor: 'Ms. Sadia', schedule: 'Mon 02:00 - 03:30', seats: 40, taken: 12 },
    { id: '3', code: 'SWE331', title: 'Software Testing and QA', section: 'A', credits: 3, instructor: 'Mr. Feroz', schedule: 'Tue 11:30 - 01:00', seats: 35, taken: 30 },
    { id: '4', code: 'GED111', title: 'Art of Living', section: 'C', credits: 3, instructor: 'Mr. Syed', schedule: 'Wed 08:30 - 10:00', seats: 50, taken: 45 },
    { id: '5', code: 'CSE412', title: 'Artificial Intelligence', section: 'A', credits: 3, instructor: 'Dr. Sheak', schedule: 'Sun 02:00 - 03:30', seats: 40, taken: 38 },
    { id: '6', code: 'CSE412', title: 'Artificial Intelligence', section: 'B', credits: 3, instructor: 'Dr. Sheak', schedule: 'Thu 11:30 - 01:00', seats: 40, taken: 15 },
  ];

  const totalCredits = selectedCourses.reduce((acc, curr) => acc + curr.credits, 0);
  const maxCredits = 15;

  const handleAdd = (course: OfferedCourse) => {
    if (selectedCourses.find(c => c.code === course.code)) {
      alert("You have already selected a section for this course.");
      return;
    }
    if (totalCredits + course.credits > maxCredits) {
      alert("Credit limit exceeded!");
      return;
    }
    setSelectedCourses([...selectedCourses, course]);
  };

  const handleRemove = (id: string) => {
    setSelectedCourses(selectedCourses.filter(c => c.id !== id));
  };

  const filteredCourses = offeredCourses.filter(c => 
    c.title.toLowerCase().includes(search.toLowerCase()) || 
    c.code.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in h-[calc(100vh-140px)] flex flex-col">
      <div className="flex justify-between items-center flex-shrink-0">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <CalendarPlus className="mr-3 text-emerald-600" size={28} />
            Course Pre-Registration
          </h2>
          <p className="text-sm text-gray-500 mt-1">Spring 2026 Advising Panel</p>
        </div>
        <div className="bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm flex items-center space-x-4">
           <div>
              <p className="text-xs text-gray-500 uppercase font-bold">Total Credits</p>
              <p className={`text-lg font-bold ${totalCredits > maxCredits ? 'text-red-600' : 'text-emerald-600'}`}>
                {totalCredits} / {maxCredits}
              </p>
           </div>
           <button 
             className={`px-4 py-2 rounded-lg text-sm font-bold text-white transition-colors ${totalCredits > 0 ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-gray-300 cursor-not-allowed'}`}
             disabled={totalCredits === 0}
           >
             Confirm Registration
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 overflow-hidden">
        {/* Course Search List */}
        <div className="lg:col-span-2 flex flex-col bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
           <div className="p-4 border-b border-gray-100 bg-gray-50">
             <div className="relative">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
               <input 
                 type="text" 
                 placeholder="Search by course code or title..." 
                 value={search}
                 onChange={(e) => setSearch(e.target.value)}
                 className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none text-sm"
               />
             </div>
           </div>
           <div className="flex-1 overflow-y-auto p-4 space-y-3">
             {filteredCourses.map(course => {
               const isSelected = selectedCourses.some(c => c.id === course.id);
               const isCourseAdded = selectedCourses.some(c => c.code === course.code && c.id !== course.id);
               
               return (
                 <div key={course.id} className={`p-4 rounded-lg border flex justify-between items-center transition-all ${isSelected ? 'bg-emerald-50 border-emerald-200' : 'bg-white border-gray-200 hover:border-emerald-300'}`}>
                   <div>
                     <div className="flex items-center space-x-2">
                       <span className="font-bold text-emerald-700 text-sm">{course.code}</span>
                       <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded font-bold">Sec: {course.section}</span>
                     </div>
                     <h4 className="font-bold text-gray-900">{course.title}</h4>
                     <p className="text-xs text-gray-500 mt-1">{course.instructor} • {course.schedule}</p>
                   </div>
                   <div className="flex flex-col items-end space-y-2">
                     <span className="text-xs font-bold text-gray-400">{course.credits} Credits</span>
                     {isSelected ? (
                       <span className="text-emerald-600 flex items-center text-sm font-bold"><CheckCircle size={16} className="mr-1"/> Added</span>
                     ) : isCourseAdded ? (
                        <span className="text-orange-500 text-xs font-bold flex items-center"><AlertCircle size={14} className="mr-1"/> Conflict</span>
                     ) : (
                       <button 
                         onClick={() => handleAdd(course)}
                         className="bg-emerald-600 hover:bg-emerald-700 text-white p-1.5 rounded transition-colors"
                         title="Add Course"
                       >
                         <Plus size={18} />
                       </button>
                     )}
                   </div>
                 </div>
               );
             })}
           </div>
        </div>

        {/* Selected Cart */}
        <div className="bg-slate-50 rounded-xl shadow-sm border border-gray-200 flex flex-col overflow-hidden">
           <div className="p-4 border-b border-gray-200 bg-white">
             <h3 className="font-bold text-gray-800 flex items-center">
               <CheckCircle className="w-5 h-5 mr-2 text-emerald-600" />
               Selected Courses
             </h3>
           </div>
           <div className="flex-1 overflow-y-auto p-4 space-y-3">
             {selectedCourses.length > 0 ? (
               selectedCourses.map(course => (
                 <div key={course.id} className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm group">
                    <div className="flex justify-between items-start">
                       <div>
                          <p className="font-bold text-gray-800 text-sm">{course.code}</p>
                          <p className="text-xs text-gray-500 truncate w-32">{course.title}</p>
                       </div>
                       <button 
                         onClick={() => handleRemove(course.id)}
                         className="text-gray-400 hover:text-red-500 transition-colors"
                       >
                         <Trash2 size={16} />
                       </button>
                    </div>
                    <div className="mt-2 flex justify-between items-center text-xs">
                       <span className="bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded font-medium">Sec: {course.section}</span>
                       <span className="font-mono text-gray-400">{course.credits} Cr.</span>
                    </div>
                 </div>
               ))
             ) : (
               <div className="text-center py-10 text-gray-400">
                  <CalendarPlus className="w-12 h-12 mx-auto mb-2 opacity-20" />
                  <p className="text-sm">No courses selected yet.</p>
               </div>
             )}
           </div>
           
           <div className="p-4 bg-white border-t border-gray-200">
              <div className="text-xs text-gray-500 mb-2 text-center">
                 Advising for Spring 2026 closes on <span className="font-bold text-gray-700">Dec 15, 2025</span>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;