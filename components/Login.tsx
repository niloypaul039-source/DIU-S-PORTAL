import React, { useState } from 'react';
import { Lock, User, ArrowRight, GraduationCap, Globe, BookOpen } from 'lucide-react';

interface LoginProps {
  onLogin: (id: string, pass: string) => void;
  error?: string;
}

const Login: React.FC<LoginProps> = ({ onLogin, error }) => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(id, password);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Abstract University Background Pattern */}
      <div className="absolute inset-0 z-0">
         <div className="absolute inset-0 bg-emerald-900 opacity-95"></div>
         <div className="absolute inset-0 opacity-10" style={{ 
             backgroundImage: 'url("https://www.transparenttextures.com/patterns/school.png")' 
         }}></div>
         <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-500 rounded-full blur-3xl opacity-20"></div>
         <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-20"></div>
      </div>

      <div className="max-w-md w-full bg-white rounded-xl shadow-2xl overflow-hidden animate-fade-in z-10 border border-gray-200">
        
        {/* Branding Header */}
        <div className="bg-white p-8 pb-0 text-center">
           <div className="w-16 h-16 bg-emerald-900 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg border-4 border-emerald-50">
              <span className="font-serif font-bold text-3xl text-white pt-1">D</span>
           </div>
           <h1 className="text-xl font-bold text-gray-900 uppercase tracking-tight">Daffodil International University</h1>
           <div className="h-1 w-16 bg-emerald-600 mx-auto mt-3 rounded-full"></div>
           <p className="text-sm font-medium text-emerald-700 mt-2 uppercase tracking-widest">Student Portal</p>
        </div>
        
        {/* Login Form */}
        <div className="p-8 pt-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded flex items-center">
                <span className="font-bold mr-1">Error:</span> {error}
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wide ml-1">Student ID</label>
              <div className="relative group">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-700 transition-colors w-5 h-5" />
                <input 
                  type="text" 
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                  placeholder="ID (e.g. 241-35-536)"
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:border-transparent outline-none transition-all font-mono text-sm text-gray-800"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wide ml-1">Password</label>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-700 transition-colors w-5 h-5" />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:border-transparent outline-none transition-all text-gray-800"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center space-x-2 cursor-pointer text-gray-600 hover:text-gray-800">
                <input type="checkbox" className="rounded text-emerald-600 focus:ring-emerald-500 border-gray-300" />
                <span>Keep me signed in</span>
              </label>
              <a href="#" className="text-emerald-700 hover:underline font-semibold">Reset Password?</a>
            </div>

            <button 
              type="submit"
              className="w-full bg-emerald-800 hover:bg-emerald-900 text-white font-bold py-3 rounded-lg transition-all flex items-center justify-center space-x-2 shadow-lg shadow-emerald-900/20 mt-2"
            >
              <span>Sign In</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-8 text-center space-y-4">
             <div className="flex justify-center space-x-4 text-gray-400">
                <a href="#" className="hover:text-emerald-700 transition-colors flex flex-col items-center gap-1">
                   <Globe size={18} />
                   <span className="text-[10px]">Website</span>
                </a>
                <div className="w-px bg-gray-200 h-8"></div>
                <a href="#" className="hover:text-emerald-700 transition-colors flex flex-col items-center gap-1">
                   <BookOpen size={18} />
                   <span className="text-[10px]">Library</span>
                </a>
                <div className="w-px bg-gray-200 h-8"></div>
                <a href="#" className="hover:text-emerald-700 transition-colors flex flex-col items-center gap-1">
                   <GraduationCap size={18} />
                   <span className="text-[10px]">Alumni</span>
                </a>
             </div>
             
             <div className="bg-blue-50 p-3 rounded text-center border border-blue-100">
               <p className="text-xs text-blue-800">
                 <strong>Demo Access:</strong> ID: 241-35-536 | Pass: 12345
               </p>
             </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-4 text-center text-white/40 text-xs">
        &copy; 2024 Daffodil International University. All rights reserved.
      </div>
    </div>
  );
};

export default Login;