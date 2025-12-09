import React, { useState } from 'react';
import { Menu, Bell, Search, LogOut } from 'lucide-react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Courses from './components/Courses';
import Results from './components/Results';
import Financials from './components/Financials';
import AiAdvisor from './components/AiAdvisor';
import Assignments from './components/Assignments';
import Quizzes from './components/Quizzes';
import Login from './components/Login';
import Profile from './components/Profile';
import { Student, Notice, Course, Assignment, Quiz } from './types';

// Mock Data
const initialStudentData: Student = {
  id: '241-35-536',
  name: 'Amiya kishor Paul Niloy',
  program: 'B.Sc. in SWE',
  batch: '42nd',
  cgpa: 3.82,
  completedCredits: 85,
  avatarUrl: 'https://picsum.photos/200/200',
  fatherName: 'Mr. Paul',
  motherName: 'Mrs. Paul',
  email: 'amiya.swe@diu.edu.bd',
  phone: '+8801700000000',
  address: 'Dhaka, Bangladesh'
};

const mockNotices: Notice[] = [
  { id: '1', title: 'Mid-term Exam Schedule Published', date: 'Oct 24', type: 'academic' },
  { id: '2', title: 'Registration for Spring 2025 Open', date: 'Oct 22', type: 'admin' },
  { id: '3', title: 'Tech Fest 2024 - Call for Papers', date: 'Oct 20', type: 'event' },
];

const mockCourses: Course[] = [
  { code: 'CSE311', title: 'Database Systems', credits: 3, schedule: 'Sun 10:00 AM', instructor: 'Dr. Kabir', room: 'AB4-602', color: 'bg-emerald-500' },
  { code: 'SWE321', title: 'Software Engineering', credits: 3, schedule: 'Mon 02:00 PM', instructor: 'Ms. Farhana', room: 'AB4-501', color: 'bg-blue-500' },
  { code: 'MAT201', title: 'Linear Algebra', credits: 3, schedule: 'Tue 11:30 AM', instructor: 'Mr. Rafiq', room: 'AB4-405', color: 'bg-purple-500' },
  { code: 'ENG201', title: 'Business Communication', credits: 3, schedule: 'Wed 08:30 AM', instructor: 'Ms. Naila', room: 'AB4-301', color: 'bg-orange-500' },
];

const mockGpaHistory = [
  { semester: 'Spring 23', gpa: 3.65 },
  { semester: 'Summer 23', gpa: 3.75 },
  { semester: 'Fall 23', gpa: 3.80 },
  { semester: 'Spring 24', gpa: 3.72 },
  { semester: 'Summer 24', gpa: 3.85 },
  { semester: 'Fall 24', gpa: 3.90 },
];

const mockAssignments: Assignment[] = [
  { id: '1', courseCode: 'SWE321', title: 'Requirement Analysis Doc', description: 'Submit the SRS document for your semester project.', dueDate: 'Nov 10, 2024', status: 'Pending', totalMarks: 20 },
  { id: '2', courseCode: 'CSE311', title: 'SQL Practice Lab', description: 'Complete the complex join queries from Lab Sheet 4.', dueDate: 'Nov 05, 2024', status: 'Submitted', totalMarks: 10, obtainedMarks: 9.5 },
  { id: '3', courseCode: 'MAT201', title: 'Matrix Transformation', description: 'Solve problems 1-15 from Chapter 4.', dueDate: 'Nov 12, 2024', status: 'Pending', totalMarks: 15 },
  { id: '4', courseCode: 'ENG201', title: 'Presentation Slides', description: 'Upload slides for final presentation.', dueDate: 'Oct 28, 2024', status: 'Late', totalMarks: 10 },
];

const mockQuizzes: Quiz[] = [
  { id: '1', courseCode: 'SWE321', title: 'Quiz 2: Agile Methodologies', date: 'Nov 15, 2024', duration: '20 mins', totalMarks: 15, status: 'Upcoming' },
  { id: '2', courseCode: 'CSE311', title: 'Quiz 1: ER Diagrams', date: 'Oct 10, 2024', duration: '30 mins', totalMarks: 20, status: 'Completed', obtainedMarks: 18 },
  { id: '3', courseCode: 'ENG201', title: 'Vocabulary Test', date: 'Oct 05, 2024', duration: '15 mins', totalMarks: 10, status: 'Completed', obtainedMarks: 8 },
  { id: '4', courseCode: 'MAT201', title: 'Pop Quiz: Vectors', date: 'Sep 25, 2024', duration: '15 mins', totalMarks: 10, status: 'Missed', obtainedMarks: 0 },
];

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [student, setStudent] = useState<Student>(initialStudentData);
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogin = (id: string, pass: string) => {
    if (id === initialStudentData.id && pass === '12345') {
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Invalid Student ID or Password');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setActiveTab('dashboard');
    setLoginError('');
  };

  const handleUpdateStudent = (updatedStudent: Student) => {
    setStudent(updatedStudent);
  };

  const getHeaderTitle = () => {
    switch (activeTab) {
      case 'dashboard': return 'Student Dashboard';
      case 'profile': return 'My Profile';
      case 'courses': return 'Registered Courses';
      case 'assignments': return 'Assignment Hub';
      case 'quizzes': return 'Online Quizzes';
      case 'results': return 'Academic Results';
      case 'financials': return 'Financial Accounts';
      case 'advisor': return 'AI Smart Advisor';
      default: return 'Portal';
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard 
          student={student} 
          notices={mockNotices} 
          todayClasses={mockCourses.slice(0, 2)} 
          gpaHistory={mockGpaHistory}
        />;
      case 'profile':
        return <Profile student={student} onUpdate={handleUpdateStudent} />;
      case 'courses':
        return <Courses courses={mockCourses} />;
      case 'assignments':
        return <Assignments assignments={mockAssignments} />;
      case 'quizzes':
        return <Quizzes quizzes={mockQuizzes} />;
      case 'results':
        return <Results />;
      case 'financials':
        return <Financials />;
      case 'advisor':
        return <AiAdvisor />;
      default:
        return <Dashboard 
          student={student} 
          notices={mockNotices} 
          todayClasses={mockCourses.slice(0, 2)}
          gpaHistory={mockGpaHistory}
        />;
    }
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} error={loginError} />;
  }

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden font-sans text-gray-800">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isOpen={isSidebarOpen} 
        setIsOpen={setIsSidebarOpen}
        onLogout={handleLogout}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full w-full relative overflow-hidden">
        
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 md:px-8 z-10 shrink-0 shadow-sm">
          <div className="flex items-center">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="md:hidden mr-4 p-2 text-gray-500 hover:bg-gray-100 rounded-lg"
            >
              <Menu size={24} />
            </button>
            <h1 className="text-xl font-bold text-gray-800 tracking-tight">{getHeaderTitle()}</h1>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center bg-gray-50 rounded-lg px-3 py-2 border border-gray-200 focus-within:border-emerald-500 focus-within:ring-1 focus-within:ring-emerald-500 transition-all">
              <Search size={16} className="text-gray-400 mr-2" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="bg-transparent border-none focus:ring-0 text-sm text-gray-700 w-48 placeholder-gray-400"
              />
            </div>

            <div className="flex items-center space-x-3">
              <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
                <Bell size={20} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
              </button>
              
              <div className="h-8 w-px bg-gray-200 mx-2 hidden sm:block"></div>

              <div 
                className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-1.5 rounded-lg transition-colors"
                onClick={() => setActiveTab('profile')}
              >
                <img 
                  src={student.avatarUrl} 
                  alt="Profile" 
                  className="w-8 h-8 rounded-full object-cover border border-gray-200" 
                />
                <div className="text-sm hidden sm:block">
                   <p className="font-semibold text-gray-700 leading-none">{student.name.split(' ')[0]}</p>
                   <p className="text-[10px] text-gray-500 mt-0.5">{student.id}</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 scroll-smooth bg-gray-100">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>

      </div>
    </div>
  );
}

export default App;