import React from 'react';
import { Trophy, Download, ChevronRight } from 'lucide-react';

const Results: React.FC = () => {
  const semesters = [
    { name: 'Fall 2025', gpa: 3.90, credits: 15, status: 'Completed' },
    { name: 'Summer 2025', gpa: 3.85, credits: 12, status: 'Completed' },
    { name: 'Spring 2025', gpa: 3.72, credits: 16, status: 'Completed' },
  ];

  const currentResults = [
    { code: 'CSE311', title: 'Database Systems', grade: 'A+', point: 4.00 },
    { code: 'CSE312', title: 'Software Engineering', grade: 'A', point: 3.75 },
    { code: 'ENG201', title: 'Business Communication', grade: 'A-', point: 3.50 },
    { code: 'MAT201', title: 'Linear Algebra', grade: 'A', point: 3.75 },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Academic Results</h2>
        <button className="flex items-center space-x-2 text-sm bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors shadow-sm">
          <Download size={16} />
          <span className="font-bold">Download Transcript</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-5 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
              <h3 className="font-bold text-gray-800">Current Semester (Fall 2025)</h3>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">Provisional</span>
            </div>
            <table className="w-full text-left">
              <thead className="bg-white text-gray-500 text-xs uppercase border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4 font-semibold">Course Code</th>
                  <th className="px-6 py-4 font-semibold">Title</th>
                  <th className="px-6 py-4 font-semibold">Grade</th>
                  <th className="px-6 py-4 font-semibold text-right">Point</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
                {currentResults.map((res, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-mono font-medium text-emerald-700">{res.code}</td>
                    <td className="px-6 py-4 font-medium">{res.title}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-block px-2 py-1 rounded text-xs font-bold w-8 text-center
                        ${res.grade === 'A+' || res.grade === 'A' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}
                      `}>
                        {res.grade}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right font-bold">{res.point.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-bold text-gray-800 pl-1">Semester History</h3>
          {semesters.map((sem, idx) => (
            <div key={idx} className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex items-center justify-between group hover:border-emerald-300 transition-colors cursor-pointer">
              <div>
                <p className="font-bold text-gray-800 group-hover:text-emerald-700 transition-colors">{sem.name}</p>
                <p className="text-xs text-gray-500 mt-1">{sem.credits} Credits Completed</p>
              </div>
              <div className="text-right">
                <div className="flex items-center text-emerald-600 font-bold text-lg">
                  <Trophy size={16} className="mr-1" />
                  {sem.gpa.toFixed(2)}
                </div>
                <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wide">{sem.status}</span>
              </div>
            </div>
          ))}
          <button className="w-full py-3 border border-dashed border-gray-300 rounded-xl text-sm font-medium text-gray-500 hover:text-emerald-600 hover:border-emerald-300 hover:bg-emerald-50 transition-all">
            View All Semesters
          </button>
        </div>
      </div>
    </div>
  );
};

export default Results;