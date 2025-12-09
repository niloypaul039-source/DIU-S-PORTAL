import React from 'react';
import { Quiz } from '../types';
import { Clock, CheckCircle, AlertTriangle, ChevronRight, Trophy } from 'lucide-react';

interface QuizzesProps {
  quizzes: Quiz[];
}

const Quizzes: React.FC<QuizzesProps> = ({ quizzes }) => {
  const upcomingQuizzes = quizzes.filter(q => q.status === 'Upcoming');
  const pastQuizzes = quizzes.filter(q => q.status !== 'Upcoming');

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Upcoming Quizzes Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-900 flex items-center">
          <Clock className="w-6 h-6 mr-2 text-emerald-600" />
          Upcoming Quizzes
        </h2>
        
        {upcomingQuizzes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {upcomingQuizzes.map(quiz => (
              <div key={quiz.id} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Clock size={80} className="text-emerald-600" />
                </div>
                
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-4">
                    <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-2 py-1 rounded uppercase tracking-wide border border-emerald-100">
                      {quiz.courseCode}
                    </span>
                    <span className="text-xs font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded">{quiz.totalMarks} Marks</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{quiz.title}</h3>
                  <div className="flex items-center space-x-4 mb-6 text-sm text-gray-600">
                     <div className="flex flex-col">
                        <span className="text-[10px] text-gray-400 uppercase tracking-wide font-bold">Date</span>
                        <span className="font-semibold">{quiz.date}</span>
                     </div>
                     <div className="w-px h-8 bg-gray-100"></div>
                     <div className="flex flex-col">
                        <span className="text-[10px] text-gray-400 uppercase tracking-wide font-bold">Duration</span>
                        <span className="font-semibold">{quiz.duration}</span>
                     </div>
                  </div>
                  
                  <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-lg transition-colors flex items-center justify-center space-x-2 shadow-sm">
                    <span>Enter Quiz Room</span>
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 bg-white rounded-xl border border-gray-200 text-center">
            <p className="text-gray-500">No upcoming quizzes scheduled at this time.</p>
          </div>
        )}
      </div>

      {/* Past Quizzes / Results */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-900 flex items-center">
          <Trophy className="w-6 h-6 mr-2 text-yellow-500" />
          Quiz Results
        </h2>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-gray-500 text-xs uppercase border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4 font-semibold">Course</th>
                  <th className="px-6 py-4 font-semibold">Quiz Title</th>
                  <th className="px-6 py-4 font-semibold">Date</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold text-right">Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
                {pastQuizzes.map((quiz) => (
                  <tr key={quiz.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-medium font-mono text-emerald-700">{quiz.courseCode}</td>
                    <td className="px-6 py-4 font-medium text-gray-800">{quiz.title}</td>
                    <td className="px-6 py-4 text-gray-500">{quiz.date}</td>
                    <td className="px-6 py-4">
                      {quiz.status === 'Completed' ? (
                        <span className="inline-flex items-center text-emerald-700 bg-emerald-50 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wide">
                          <CheckCircle size={12} className="mr-1" /> Completed
                        </span>
                      ) : (
                        <span className="inline-flex items-center text-red-700 bg-red-50 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wide">
                          <AlertTriangle size={12} className="mr-1" /> Missed
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right font-mono">
                      {quiz.obtainedMarks !== undefined ? (
                        <span className="font-bold text-gray-900">
                          {quiz.obtainedMarks} <span className="text-gray-400 font-normal">/ {quiz.totalMarks}</span>
                        </span>
                      ) : (
                        <span className="text-gray-400 font-bold">-</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Quizzes;