import React, { useState } from 'react';
import { Lock, User, ArrowRight, GraduationCap, Globe } from 'lucide-react';

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
    <div className="min-h-screen bg-emerald-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-emerald-600 z-0"></div>
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}>
      </div>

      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden animate-fade-in z-10 flex flex-col md:flex-row">
        
        {/* Left Side - Branding */}
        <div className="md:w-1/2 bg-slate-900 p-12 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500 rounded-full opacity-10 -mr-16 -mt-16 blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500 rounded-full opacity-10 -ml-10 -mb-10 blur-2xl"></div>
          
          <div className="relative z-10">
            <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-emerald-900/50">
              <span className="font-bold text-3xl">D</span>
            </div>
            <h1 className="text-3xl font-bold mb-2">Student Portal</h1>
            <p className="text-slate-400">Daffodil International University</p>
          </div>

          <div className="relative z-10 space-y-4">
             <div className="flex items-center space-x-3 text-sm text-slate-300">
               <div className="p-2 bg-slate-800 rounded-lg"><Globe size={16}/></div>
               <span>Access your academic records anywhere.</span>
             </div>
             <div className="flex items-center space-x-3 text-sm text-slate-300">
               <div className="p-2 bg-slate-800 rounded-lg"><GraduationCap size={16}/></div>
               <span>Manage courses and financial accounts.</span>
             </div>
          </div>

          <div className="relative z-10 pt-12">
            <p className="text-xs text-slate-500">© 2024 Daffodil International University</p>
          </div>
        </div>
        
        {/* Right Side - Form */}
        <div className="md:w-1/2 p-8 md:p-12 bg-white">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Sign In</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm rounded-r flex items-center">
                <span className="mr-2 font-bold">Error:</span> {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Student ID</label>
              <div className="relative group">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-500 transition-colors w-5 h-5" />
                <input 
                  type="text" 
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                  placeholder="e.g. 241-35-536"
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all font-mono text-sm"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Password</label>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-500 transition-colors w-5 h-5" />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="•••••"
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input type="checkbox" className="rounded text-emerald-600 focus:ring-emerald-500" />
                <span className="text-gray-600">Remember me</span>
              </label>
              <a href="#" className="text-emerald-600 hover:text-emerald-700 font-medium hover:underline">Forgot password?</a>
            </div>

            <button 
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-lg transition-all flex items-center justify-center space-x-2 shadow-lg shadow-emerald-600/20 transform active:scale-[0.98]"
            >
              <span>Login to Portal</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            
            <p className="text-center text-xs text-gray-400 mt-6 border-t pt-4">
              Use ID: <strong>241-35-536</strong> and Password: <strong>12345</strong>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;