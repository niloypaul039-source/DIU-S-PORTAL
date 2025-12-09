import React from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { Clock, Calendar, AlertCircle, Book, Wallet, GraduationCap, MapPin, Mail, Phone, User } from 'lucide-react';
import { Student, Notice, Course } from '../types';

interface DashboardProps {
  student: Student;
  notices: Notice[];
  todayClasses: Course[];
  gpaHistory: { semester: string; gpa: number }[];
}

const Dashboard: React.FC<DashboardProps> = ({ student, notices, todayClasses, gpaHistory }) => {
  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* 3-Column Layout for Desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Student Profile Card (Typical of University Portals) */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-slate-900 h-24 relative">
              <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2">
                <img 
                  src={student.avatarUrl} 
                  alt="Student" 
                  className="w-20 h-20 rounded-full border-4 border-white shadow-md bg-white object-cover"
                />
              </div>
            </div>
            <div className="pt-12 pb-6 px-4 text-center">
              <h2 className="font-bold text-gray-900 text-lg">{student.name}</h2>
              <p className="text-emerald-600 font-mono font-medium text-sm mt-1">{student.id}</p>
              
              <div className="mt-4 pt-4 border-t border-gray-100 text-left space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">Program</span>
                  <span className="font-semibold text-gray-800 text-right w-1/2 truncate">{student.program}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">Batch</span>
                  <span className="font-semibold text-gray-800">{student.batch}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">Advisor</span>
                  <span className="font-semibold text-emerald-600">M.S. Rahman</span>
                </div>
              </div>

              <div className="mt-6">
                <button className="w-full bg-slate-900 text-white text-xs font-bold py-2 rounded uppercase tracking-wider hover:bg-slate-800 transition-colors">
                  View Full Profile
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <h3 className="font-bold text-gray-800 mb-3 text-sm flex items-center">
              <Wallet className="w-4 h-4 mr-2 text-emerald-600" />
              Accounts Summary
            </h3>
            <div className="space-y-3">
              <div className="bg-emerald-50 p-3 rounded-lg border border-emerald-100">
                <p className="text-xs text-emerald-600 mb-1">Payable Amount</p>
                <p className="text-xl font-bold text-emerald-900">৳ 15,000</p>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-2 rounded transition-colors">
                  Pay Now
                </button>
                <button className="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-700 text-xs font-bold py-2 rounded transition-colors">
                  Ledger
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Column: Academic Stats & Schedule */}
        <div className="lg:col-span-6 space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
              <p className="text-xs text-gray-500 font-medium uppercase mb-1">CGPA</p>
              <div className="flex items-end">
                <span className="text-2xl font-bold text-gray-900">{student.cgpa}</span>
                <span className="text-xs text-emerald-600 font-bold ml-2 mb-1">↑ Good</span>
              </div>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
              <p className="text-xs text-gray-500 font-medium uppercase mb-1">Credits</p>
              <div className="flex items-end">
                <span className="text-2xl font-bold text-gray-900">{student.completedCredits}</span>
                <span className="text-xs text-gray-400 ml-2 mb-1">/ 140</span>
              </div>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 hidden md:block">
              <p className="text-xs text-gray-500 font-medium uppercase mb-1">Semester</p>
              <div className="flex items-end">
                <span className="text-2xl font-bold text-gray-900">Fall 24</span>
              </div>
            </div>
          </div>

          {/* Today's Schedule */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100 flex justify-between items-center">
              <h3 className="font-bold text-gray-800 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-emerald-600" />
                Class Routine (Today)
              </h3>
              <span className="text-xs font-medium text-gray-400 bg-gray-100 px-2 py-1 rounded">
                {new Date().toLocaleDateString('en-US', { weekday: 'long' })}
              </span>
            </div>
            <div className="divide-y divide-gray-100">
              {todayClasses.length > 0 ? (
                todayClasses.map((course, idx) => (
                  <div key={idx} className="p-4 hover:bg-gray-50 transition-colors flex items-center justify-between group">
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 bg-white border-2 border-gray-100 rounded-xl flex flex-col items-center justify-center text-xs shadow-sm group-hover:border-emerald-200 transition-colors`}>
                        <span className="font-bold text-gray-800">{course.schedule.split(' ')[1]}</span>
                        <span className="text-[10px] text-gray-400">{course.schedule.split(' ')[2]}</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800 text-sm group-hover:text-emerald-700 transition-colors">{course.title}</h4>
                        <p className="text-xs text-gray-500 flex items-center mt-1">
                          <span className="font-mono bg-gray-100 px-1 rounded mr-2">{course.code}</span>
                          <span className="flex items-center"><MapPin size={10} className="mr-1"/> {course.room}</span>
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                       <span className="inline-block px-2 py-1 rounded text-xs font-medium bg-emerald-50 text-emerald-700">
                        {course.instructor}
                       </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-gray-500">No classes today.</div>
              )}
            </div>
            <div className="bg-gray-50 px-5 py-3 border-t border-gray-100">
              <button className="text-sm text-emerald-600 font-semibold hover:underline w-full text-center">
                View Full Routine
              </button>
            </div>
          </div>

          {/* Performance Chart */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center">
              <GraduationCap className="w-5 h-5 mr-2 text-emerald-600" />
              Academic Progress
            </h3>
            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={gpaHistory}>
                  <defs>
                    <linearGradient id="colorGpa" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#059669" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#059669" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="semester" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 10}} dy={10} />
                  <YAxis domain={[2.0, 4.0]} axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 10}} />
                  <Tooltip 
                    contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="gpa" 
                    stroke="#059669" 
                    strokeWidth={2} 
                    fillOpacity={1} 
                    fill="url(#colorGpa)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Right Column: Notices & Info */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="px-4 py-3 border-b border-gray-100 bg-gray-50 rounded-t-xl">
              <h3 className="font-bold text-gray-800 text-sm flex items-center">
                <AlertCircle className="w-4 h-4 mr-2 text-orange-500" />
                Latest Notices
              </h3>
            </div>
            <div className="p-2">
              {notices.map((notice) => (
                <div key={notice.id} className="p-3 mb-2 rounded border-l-2 border-emerald-500 hover:bg-gray-50 transition-colors group cursor-pointer">
                  <p className="text-[10px] text-gray-400 font-bold uppercase mb-1 flex items-center">
                    <Calendar className="w-3 h-3 mr-1" />
                    {notice.date}
                  </p>
                  <h4 className="text-sm font-medium text-gray-800 leading-snug group-hover:text-emerald-700 transition-colors">
                    {notice.title}
                  </h4>
                </div>
              ))}
            </div>
            <button className="w-full py-2 text-xs text-gray-500 font-medium hover:text-emerald-600 border-t border-gray-100 transition-colors">
              View All Archive
            </button>
          </div>

          <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-xl p-5 text-white shadow-lg relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="font-bold text-lg mb-1">Need Help?</h3>
              <p className="text-indigo-100 text-sm mb-4">Chat with our AI Advisor for instant support.</p>
              <button className="bg-white text-indigo-700 px-4 py-2 rounded-lg text-sm font-bold shadow-sm hover:bg-indigo-50 transition-colors w-full">
                Ask Question
              </button>
            </div>
            <div className="absolute top-0 right-0 -mr-4 -mt-4 text-indigo-500 opacity-20">
              <Book size={100} />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;