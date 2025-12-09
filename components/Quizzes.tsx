import React, { useState, useEffect } from 'react';
import { Quiz } from '../types';
import { Clock, CheckCircle, AlertTriangle, ChevronRight, Trophy, X, Timer, PlayCircle, Loader2 } from 'lucide-react';

interface QuizzesProps {
  quizzes: Quiz[];
  onQuizComplete: (id: string, score: number) => void;
}

const Quizzes: React.FC<QuizzesProps> = ({ quizzes, onQuizComplete }) => {
  const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null);
  const [quizState, setQuizState] = useState<'intro' | 'active' | 'submitting'>('intro');
  const [timeLeft, setTimeLeft] = useState(0);

  const upcomingQuizzes = quizzes.filter(q => q.status === 'Upcoming');
  const pastQuizzes = quizzes.filter(q => q.status !== 'Upcoming');

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (activeQuiz && quizState === 'active' && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && quizState === 'active') {
       handleSubmitQuiz();
    }
    return () => clearInterval(timer);
  }, [activeQuiz, quizState, timeLeft]);

  const handleStartQuiz = (quiz: Quiz) => {
    setActiveQuiz(quiz);
    setQuizState('intro');
  };

  const handleEnterQuiz = () => {
    // Parse duration "20 mins" -> 1200 seconds
    const minutes = parseInt(activeQuiz?.duration.split(' ')[0] || '10');
    setTimeLeft(minutes * 60);
    setQuizState('active');
  };

  const handleSubmitQuiz = async () => {
    setQuizState('submitting');
    // Simulate grading delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    if (activeQuiz) {
      // Random score logic for demo
      const max = activeQuiz.totalMarks;
      const min = Math.floor(max * 0.6); // Minimum 60% score
      const score = Math.floor(Math.random() * (max - min + 1)) + min;
      
      onQuizComplete(activeQuiz.id, score);
      closeModal();
    }
  };

  const closeModal = () => {
    setActiveQuiz(null);
    setQuizState('intro');
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

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
                  
                  <button 
                    onClick={() => handleStartQuiz(quiz)}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-lg transition-colors flex items-center justify-center space-x-2 shadow-sm"
                  >
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

      {/* Quiz Modal */}
      {activeQuiz && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-80 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full overflow-hidden flex flex-col max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-gray-900 text-lg flex items-center">
                   <span className="bg-emerald-600 text-white text-xs px-2 py-1 rounded mr-2">{activeQuiz.courseCode}</span>
                   {activeQuiz.title}
                </h3>
              </div>
              {quizState === 'intro' && (
                <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-200 rounded-full transition-colors">
                  <X size={20} />
                </button>
              )}
              {quizState === 'active' && (
                <div className="flex items-center text-red-600 bg-red-50 px-3 py-1.5 rounded-lg font-mono font-bold">
                  <Timer size={18} className="mr-2" />
                  {formatTime(timeLeft)}
                </div>
              )}
            </div>

            {/* Modal Body */}
            <div className="p-8 overflow-y-auto">
               {quizState === 'intro' && (
                 <div className="text-center space-y-6">
                    <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600">
                      <PlayCircle size={40} />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-900">Ready to start?</h4>
                      <p className="text-gray-500 mt-2 max-w-sm mx-auto">
                        You are about to start <strong>{activeQuiz.title}</strong>. 
                        You will have <strong>{activeQuiz.duration}</strong> to answer all questions. 
                        Once started, the timer cannot be paused.
                      </p>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-center max-w-md mx-auto bg-gray-50 p-4 rounded-xl border border-gray-100">
                       <div>
                          <p className="text-xs text-gray-400 uppercase font-bold">Questions</p>
                          <p className="font-bold text-lg text-gray-800">10</p>
                       </div>
                       <div>
                          <p className="text-xs text-gray-400 uppercase font-bold">Time</p>
                          <p className="font-bold text-lg text-gray-800">{activeQuiz.duration}</p>
                       </div>
                       <div>
                          <p className="text-xs text-gray-400 uppercase font-bold">Marks</p>
                          <p className="font-bold text-lg text-gray-800">{activeQuiz.totalMarks}</p>
                       </div>
                    </div>
                 </div>
               )}

               {quizState === 'active' && (
                 <div className="space-y-6">
                    {/* Simulated Questions */}
                    <div className="space-y-4">
                      <div className="p-4 border border-gray-200 rounded-lg">
                        <p className="font-bold text-gray-800 mb-3">1. What is the primary purpose of a foreign key?</p>
                        <div className="space-y-2">
                          {['To uniquely identify a record', 'To link two tables together', 'To index a table', 'To store large text'].map((opt, i) => (
                            <label key={i} className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded cursor-pointer">
                              <input type="radio" name="q1" className="text-emerald-600 focus:ring-emerald-500" />
                              <span className="text-sm text-gray-700">{opt}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                      
                      <div className="p-4 border border-gray-200 rounded-lg opacity-50">
                        <p className="font-bold text-gray-800 mb-3">2. Which normal form deals with partial dependency?</p>
                        <div className="space-y-2">
                           <div className="h-4 bg-gray-100 rounded w-3/4"></div>
                           <div className="h-4 bg-gray-100 rounded w-1/2"></div>
                           <div className="h-4 bg-gray-100 rounded w-2/3"></div>
                        </div>
                      </div>
                      
                      <p className="text-center text-sm text-gray-400 italic">... 8 more questions ...</p>
                    </div>
                 </div>
               )}

               {quizState === 'submitting' && (
                 <div className="flex flex-col items-center justify-center py-12 space-y-4">
                    <Loader2 size={48} className="text-emerald-600 animate-spin" />
                    <p className="font-bold text-gray-600">Submitting your answers...</p>
                 </div>
               )}
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end">
              {quizState === 'intro' ? (
                <button 
                  onClick={handleEnterQuiz}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-8 rounded-lg transition-colors shadow-lg shadow-emerald-600/20"
                >
                  Start Quiz Now
                </button>
              ) : quizState === 'active' ? (
                <button 
                  onClick={handleSubmitQuiz}
                  className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-2 px-8 rounded-lg transition-colors"
                >
                  Submit Answers
                </button>
              ) : null}
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default Quizzes;