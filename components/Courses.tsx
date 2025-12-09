import React from 'react';
import { Course } from '../types';
import { BookOpen, User, Clock, MapPin } from 'lucide-react';

interface CoursesProps {
  courses: Course[];
}

const Courses: React.FC<CoursesProps> = ({ courses }) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Enrolled Courses</h2>
        <span className="text-sm bg-emerald-100 text-emerald-800 py-1 px-3 rounded-full font-medium">
          Fall 2024
        </span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200 overflow-hidden group flex flex-col h-full">
            <div className={`h-1.5 ${course.color}`} />
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-3">
                <span className="bg-gray-100 text-gray-700 text-xs font-bold px-2 py-1 rounded uppercase tracking-wide border border-gray-200">
                  {course.code}
                </span>
                <span className="text-xs font-medium text-gray-500 bg-gray-50 px-2 py-1 rounded">{course.credits} Credits</span>
              </div>
              
              <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-emerald-700 transition-colors line-clamp-2">
                {course.title}
              </h3>
              
              <div className="space-y-3 mt-4 flex-1">
                <div className="flex items-center text-sm text-gray-600">
                  <User className="w-4 h-4 mr-3 text-gray-400" />
                  <span className="truncate">{course.instructor}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="w-4 h-4 mr-3 text-gray-400" />
                  {course.schedule}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mr-3 text-gray-400" />
                  {course.room}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100 flex gap-2">
                <button className="flex-1 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 text-sm font-bold py-2 rounded transition-colors">
                  Outline
                </button>
                <button className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold py-2 rounded transition-colors shadow-sm">
                  Classroom
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;