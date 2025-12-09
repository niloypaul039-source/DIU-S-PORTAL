import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { Clock, Calendar, AlertCircle, Book, Wallet, GraduationCap, MapPin, QrCode, ArrowUpRight, Bot, Phone, Mail, UserCheck } from 'lucide-react';
import { Student, Notice, Course } from '../types';

interface DashboardProps {
  student: Student;
  notices: Notice[];
  todayClasses: Course[];
  gpaHistory: { semester: string; gpa: number }[];
}

const Dashboard: React.FC<DashboardProps> = ({ student, notices, todayClasses, gpaHistory }) => {
  return (
    <div className="space-y-6 animate-fade-in pb-8">
      
      {/* 3-Column Layout for Desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Student ID Card */}
        <div className="lg:col-span-4 space-y-6">
          {/* ID Card Style Profile */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden relative">
            {/* ID Card Header */}
            <div className="bg-emerald-900 p-4 flex items-center justify-between">
               <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                    <span className="font-serif font-bold text-emerald-900">D</span>
                  </div>
                  <div className="text-white">
                    <p className="text-[10px] uppercase tracking-wider leading-none opacity-80">Daffodil International</p>
                    <p className="text-xs font-bold leading-none mt-0.5">University</p>
                  </div>
               </div>
               <span className="bg-emerald-800 text-emerald-100 text-[10px] px-2 py-0.5 rounded border border-emerald-700">STUDENT</span>
            </div>

            <div className="p-6 text-center relative z-10">
              <div className="inline-block relative mb-4">
                <img 
                  src={student.avatarUrl} 
                  alt="Student" 
                  className="w-28 h-28 rounded-lg border-2 border-emerald-100 shadow-md object-cover bg-gray-100"
                />
                <div className="absolute -bottom-3 -right-3 bg-white p-1 rounded-lg border border-gray-200 shadow-sm">
                   <QrCode size={24} className="text-gray-800" />
                </div>
              </div>
              
              <h2 className="font-bold text-gray-900 text-xl">{student.name}</h2>
              <div className="inline-block bg-emerald-50 text-emerald-800 text-sm font-mono font-bold px-3 py-1 rounded-full mt-2 border border-emerald-100">
                {student.id}
              </div>
              
              <div className="mt-6 space-y-2 text-left bg-gray-50 p-4 rounded-lg border border-gray-100">
                <div className="flex justify-between text-sm border-b border-gray-200 pb-2">
                  <span className="text-gray-500">Program</span>
                  <span className="font-semibold text-gray-800">{student.program}</span>
                </div>
                <div className="flex justify-between text-sm border-b border-gray-200 pb-2 pt-2">
                  <span className="text-gray-500">Batch</span>
                  <span className="font-semibold text-gray-800">{student.batch}</span>
                </div>
                <div className="flex justify-between text-sm border-b border-gray-200 pb-2 pt-2">
                  <span className="text-gray-500">Validity</span>
                  <span className="font-semibold text-emerald-600">Dec 2026</span>
                </div>
                <div className="flex justify-between text-sm pt-2">
                  <span className="text-gray-500">Status</span>
                  <span className="font-bold text-emerald-600 flex items-center">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2 animate-pulse"></span>
                    Active
                  </span>
                </div>
              </div>
            </div>
            
            {/* Decorative Background */}
            <div className="absolute top-1/3 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/school.png')] opacity-5 pointer-events-none"></div>
          </div>

          {/* Mentor Card */}
          {student.mentor && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
              <h3 className="font-bold text-gray-800 mb-4 text-sm flex items-center uppercase tracking-wide">
                <UserCheck className="w-4 h-4 mr-2 text-emerald-600" />
                My Mentor
              </h3>
              <div className="flex items-center space-x-4">
                <img src={student.mentor.imageUrl} alt="Mentor" className="w-12 h-12 rounded-full object-cover border border-gray-200" />
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">{student.mentor.name}</h4>
                  <p className="text-xs text-gray-500">{student.mentor.designation}, {student.mentor.department}</p>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2">
                 <button className="flex items-center justify-center space-x-1 text-xs bg-gray-50 hover:bg-emerald-50 text-gray-700 hover:text-emerald-700 py-2 rounded border border-gray-200 transition-colors">
                    <Mail size={12} />
                    <span>Email</span>
                 </button>
                 <button className="flex items-center justify-center space-x-1 text-xs bg-gray-50 hover:bg-emerald-50 text-gray-700 hover:text-emerald-700 py-2 rounded border border-gray-200 transition-colors">
                    <Phone size={12} />
                    <span>Call</span>
                 </button>
              </div>
            </div>
          )}

          {/* Accounts Summary */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <h3 className="font-bold text-gray-800 mb-4 text-sm flex items-center uppercase tracking-wide">
              <Wallet className="w-4 h-4 mr-2 text-emerald-600" />
              Financial Status
            </h3>
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-emerald-50 to-white p-4 rounded-lg border border-emerald-100 flex justify-between items-center">
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">Payable (Fall '24)</p>
                  <p className="text-2xl font-bold text-gray-900">৳ 15,000</p>
                </div>
                <div className="h-10 w-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
                   <AlertCircle size={20} />
                </div>
              </div>
              <button className="w-full bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-bold py-3 rounded-lg transition-colors shadow-sm flex items-center justify-center">
                Payment Gateway <ArrowUpRight size={16} className="ml-2"/>
              </button>
              <div className="grid grid-cols-2 gap-2">
                 <button className="text-xs text-gray-600 border border-gray-200 py-2 rounded hover:bg-gray-50 font-medium">Ledger Report</button>
                 <button className="text-xs text-gray-600 border border-gray-200 py-2 rounded hover:bg-gray-50 font-medium">Waiver Info</button>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Column: Academic Stats & Schedule */}
        <div className="lg:col-span-8 space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 group hover:border-emerald-300 transition-colors">
              <p className="text-[10px] text-gray-500 font-bold uppercase mb-2 tracking-wider">CGPA</p>
              <div className="flex items-baseline">
                <span className="text-3xl font-bold text-gray-900">{student.cgpa}</span>
                <span className="text-xs font-medium text-emerald-600 ml-2">/ 4.00</span>
              </div>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 group hover:border-emerald-300 transition-colors">
              <p className="text-[10px] text-gray-500 font-bold uppercase mb-2 tracking-wider">Credits</p>
              <div className="flex items-baseline">
                <span className="text-3xl font-bold text-gray-900">{student.completedCredits}</span>
                <span className="text-xs font-medium text-gray-400 ml-2">Done</span>
              </div>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 group hover:border-emerald-300 transition-colors">
               <p className="text-[10px] text-gray-500 font-bold uppercase mb-2 tracking-wider">Classes</p>
               <div className="flex items-baseline">
                <span className="text-3xl font-bold text-gray-900">4</span>
                <span className="text-xs font-medium text-gray-400 ml-2">Today</span>
              </div>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 group hover:border-emerald-300 transition-colors">
               <p className="text-[10px] text-gray-500 font-bold uppercase mb-2 tracking-wider">Attendance</p>
               <div className="flex items-baseline">
                <span className="text-3xl font-bold text-emerald-600">92%</span>
                <span className="text-xs font-medium text-gray-400 ml-2">Avg</span>
              </div>
            </div>
          </div>

          {/* Performance Chart */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-gray-800 flex items-center">
                <GraduationCap className="w-5 h-5 mr-2 text-emerald-600" />
                Academic Performance Trend
              </h3>
              <select className="text-xs border-gray-300 border rounded-md text-gray-600 px-2 py-1 outline-none">
                 <option>All Semesters</option>
                 <option>Last 3 Semesters</option>
              </select>
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={gpaHistory}>
                  <defs>
                    <linearGradient id="colorGpa" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#059669" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#059669" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="semester" axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 11}} dy={10} />
                  <YAxis domain={[0, 4.0]} axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 11}} />
                  <Tooltip 
                    contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'}}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="gpa" 
                    stroke="#059669" 
                    strokeWidth={3} 
                    fillOpacity={1} 
                    fill="url(#colorGpa)" 
                    activeDot={{r: 6, strokeWidth: 0}}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
             {/* Class Routine */}
             <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
               <div className="px-5 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                 <h3 className="font-bold text-gray-800 text-sm flex items-center">
                   <Clock className="w-4 h-4 mr-2 text-emerald-600" />
                   Today's Routine
                 </h3>
                 <span className="text-[10px] font-bold text-emerald-600 bg-emerald-100 px-2 py-1 rounded">LIVE</span>
               </div>
               <div className="divide-y divide-gray-100 flex-1">
                 {todayClasses.length > 0 ? (
                   todayClasses.map((course, idx) => (
                     <div key={idx} className="p-4 hover:bg-gray-50 transition-colors group">
                       <div className="flex justify-between items-start mb-1">
                          <h4 className="font-bold text-gray-800 text-sm">{course.title}</h4>
                          <span className="text-[10px] font-mono text-gray-400 border border-gray-200 px-1.5 rounded">{course.code}</span>
                       </div>
                       <div className="flex items-center text-xs text-gray-500 mt-2 space-x-3">
                         <span className="flex items-center text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
                           {course.schedule.split(' ')[1]} {course.schedule.split(' ')[2]}
                         </span>
                         <span className="flex items-center"><MapPin size={10} className="mr-1"/> {course.room}</span>
                       </div>
                     </div>
                   ))
                 ) : (
                   <div className="p-8 text-center text-gray-500 text-sm">No classes scheduled today.</div>
                 )}
               </div>
               <button className="w-full py-3 text-xs text-gray-600 font-bold hover:text-emerald-600 hover:bg-gray-50 border-t border-gray-100 transition-colors">
                 View Full Week Routine
               </button>
             </div>

             {/* Notices */}
             <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
               <div className="px-5 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                 <h3 className="font-bold text-gray-800 text-sm flex items-center">
                   <AlertCircle className="w-4 h-4 mr-2 text-emerald-600" />
                   Notice Board
                 </h3>
                 <span className="text-[10px] font-bold text-gray-400">ARCHIVE</span>
               </div>
               <div className="flex-1 p-2 space-y-2">
                 {notices.map((notice) => (
                   <div key={notice.id} className="p-3 rounded-lg border border-gray-100 hover:border-emerald-200 hover:bg-emerald-50/50 transition-all cursor-pointer group">
                     <div className="flex items-start space-x-3">
                        <div className="flex flex-col items-center justify-center min-w-[40px] bg-white border border-gray-200 rounded p-1">
                           <span className="text-[10px] uppercase text-gray-400 font-bold">{notice.date.split(' ')[0]}</span>
                           <span className="text-lg font-bold text-gray-800 leading-none">{notice.date.split(' ')[1]}</span>
                        </div>
                        <div>
                           <h4 className="text-xs font-bold text-gray-800 group-hover:text-emerald-700 transition-colors line-clamp-2">{notice.title}</h4>
                           <span className="text-[10px] text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded mt-1 inline-block uppercase tracking-wide">{notice.type}</span>
                        </div>
                     </div>
                   </div>
                 ))}
               </div>
             </div>
          </div>

          {/* AI Banner */}
          <div className="bg-gradient-to-r from-emerald-900 to-emerald-700 rounded-xl p-6 text-white shadow-lg relative overflow-hidden flex items-center justify-between">
            <div className="relative z-10 max-w-lg">
              <h3 className="font-bold text-xl mb-1 flex items-center">
                 <Book className="mr-2" size={24}/>
                 Need Academic Support?
              </h3>
              <p className="text-emerald-100 text-sm mb-4 opacity-90">Our AI Smart Advisor can help you with course details, exam schedules, and study plans.</p>
              <button className="bg-white text-emerald-900 px-5 py-2 rounded-lg text-sm font-bold shadow-md hover:bg-emerald-50 transition-colors">
                Ask Advisor Now
              </button>
            </div>
            <div className="hidden md:block">
               <Bot size={80} className="text-emerald-400 opacity-20 transform rotate-12"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;