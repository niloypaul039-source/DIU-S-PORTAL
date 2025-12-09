import React from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
  GraduationCap, 
  CreditCard, 
  Bot, 
  LogOut,
  X,
  FileText,
  ClipboardList,
  UserCircle,
  Bus,
  CalendarPlus
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, isOpen, setIsOpen, onLogout }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'profile', label: 'Student Profile', icon: UserCircle },
    { id: 'courses', label: 'Registered Courses', icon: BookOpen },
    { id: 'registration', label: 'Course Registration', icon: CalendarPlus }, // New
    { id: 'assignments', label: 'Assignments', icon: FileText },
    { id: 'quizzes', label: 'Quizzes', icon: ClipboardList },
    { id: 'results', label: 'Transcript & Results', icon: GraduationCap },
    { id: 'financials', label: 'Payment Ledger', icon: CreditCard },
    { id: 'transport', label: 'Transport Schedule', icon: Bus }, // New
    { id: 'advisor', label: 'AI Advisor', icon: Bot },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <div className={`
        fixed md:static inset-y-0 left-0 z-30
        w-72 bg-emerald-950 text-white transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 flex flex-col h-full shadow-2xl border-r border-emerald-900
      `}>
        {/* University Branding Header */}
        <div className="p-6 flex justify-between items-center border-b border-emerald-900 bg-emerald-900/50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-emerald-600">
               {/* Simplified Logo Representation */}
               <div className="relative w-6 h-6 flex items-center justify-center">
                 <div className="absolute inset-0 bg-emerald-600 rounded-full opacity-20"></div>
                 <span className="font-serif font-bold text-emerald-800 text-lg leading-none pt-0.5">D</span>
               </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-medium text-emerald-200 uppercase tracking-wider leading-tight">Daffodil International</span>
              <span className="font-bold text-white text-sm tracking-wide">University</span>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="md:hidden text-emerald-200 hover:text-white">
            <X size={24} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto scrollbar-hide">
          <div className="mb-4 px-4 text-xs font-bold text-emerald-400 uppercase tracking-widest">
            Academic Menu
          </div>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsOpen(false);
                }}
                className={`
                  w-full flex items-center space-x-3 px-4 py-3.5 rounded-lg transition-all duration-200 group relative
                  ${isActive 
                    ? 'bg-emerald-800 text-white shadow-lg border-l-4 border-emerald-400' 
                    : 'text-emerald-100 hover:bg-emerald-900/80 hover:text-white'}
                `}
              >
                <Icon size={18} className={`transition-colors ${isActive ? 'text-emerald-400' : 'text-emerald-300/70 group-hover:text-emerald-200'}`} />
                <span className={`font-medium text-sm ${isActive ? 'font-semibold' : ''}`}>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Footer Actions */}
        <div className="p-4 border-t border-emerald-900 bg-emerald-950">
          <button 
            onClick={onLogout}
            className="w-full flex items-center justify-center space-x-2 px-4 py-3 text-red-300 hover:text-white hover:bg-red-600/20 bg-emerald-900/30 rounded-lg transition-colors group border border-transparent hover:border-red-500/30"
          >
            <LogOut size={18} />
            <span className="font-medium text-sm">Sign Out</span>
          </button>
          <div className="mt-4 text-center">
            <p className="text-[10px] text-emerald-600">© 2024 DIU Student Portal</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;