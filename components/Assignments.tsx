import React, { useState } from 'react';
import { Assignment } from '../types';
import { FileText, Calendar, Upload, CheckCircle, Clock, AlertCircle, X, File, UploadCloud, Loader2 } from 'lucide-react';

interface AssignmentsProps {
  assignments: Assignment[];
  onSubmit: (id: string, file: File) => void;
}

const Assignments: React.FC<AssignmentsProps> = ({ assignments, onSubmit }) => {
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const pendingAssignments = assignments.filter(a => a.status === 'Pending' || a.status === 'Late');
  const submittedAssignments = assignments.filter(a => a.status === 'Submitted');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Submitted': return 'bg-emerald-100 text-emerald-700';
      case 'Pending': return 'bg-orange-100 text-orange-700';
      case 'Late': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!selectedAssignment || !file) return;
    
    setIsSubmitting(true);
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    onSubmit(selectedAssignment.id, file);
    setIsSubmitting(false);
    closeModal();
  };

  const openModal = (assignment: Assignment) => {
    setSelectedAssignment(assignment);
    setFile(null);
  };

  const closeModal = () => {
    setSelectedAssignment(null);
    setFile(null);
    setIsSubmitting(false);
  };

  return (
    <div className="space-y-8 animate-fade-in relative">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-orange-50 border border-orange-100 p-5 rounded-xl flex items-center space-x-4">
          <div className="p-3 bg-orange-100 rounded-lg text-orange-600">
            <Clock size={24} />
          </div>
          <div>
            <p className="text-2xl font-bold text-orange-900">{pendingAssignments.length}</p>
            <p className="text-xs font-bold uppercase tracking-wide text-orange-700/70">Pending Due</p>
          </div>
        </div>
        <div className="bg-emerald-50 border border-emerald-100 p-5 rounded-xl flex items-center space-x-4">
          <div className="p-3 bg-emerald-100 rounded-lg text-emerald-600">
            <CheckCircle size={24} />
          </div>
          <div>
            <p className="text-2xl font-bold text-emerald-900">{submittedAssignments.length}</p>
            <p className="text-xs font-bold uppercase tracking-wide text-emerald-700/70">Submitted</p>
          </div>
        </div>
      </div>

      {/* Pending Assignments */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-gray-800 flex items-center">
          <AlertCircle className="w-5 h-5 mr-2 text-orange-500" />
          Pending Assignments
        </h2>
        {pendingAssignments.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {pendingAssignments.map(assignment => (
              <div key={assignment.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow relative overflow-hidden">
                <div className={`absolute left-0 top-0 bottom-0 w-1 ${assignment.status === 'Late' ? 'bg-red-500' : 'bg-orange-400'}`}></div>
                <div className="flex flex-col md:flex-row justify-between md:items-start gap-4 pl-2">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="bg-gray-100 text-gray-600 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wide border border-gray-200">
                        {assignment.courseCode}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wide ${getStatusColor(assignment.status)}`}>
                        {assignment.status}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{assignment.title}</h3>
                    <p className="text-sm text-gray-500 mb-4">{assignment.description}</p>
                    <div className="flex items-center text-sm text-gray-500 bg-gray-50 w-fit px-3 py-1.5 rounded-lg">
                      <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                      Due Date: <span className="font-semibold ml-1 text-gray-700">{assignment.dueDate}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end space-y-3 w-full md:w-auto">
                    <div className="text-sm font-semibold text-gray-500">Total Marks: {assignment.totalMarks}</div>
                    <button 
                      onClick={() => openModal(assignment)}
                      className="w-full md:w-auto flex items-center justify-center space-x-2 bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-lg transition-colors text-sm font-bold shadow-sm"
                    >
                      <Upload size={16} />
                      <span>Submit Work</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
             <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-3">
               <CheckCircle className="text-gray-300" size={32} />
             </div>
            <p className="text-gray-500 font-medium">No pending assignments.</p>
          </div>
        )}
      </div>

      {/* Submitted History */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-gray-800">Submission History</h2>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-500 text-xs uppercase border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 font-semibold">Course</th>
                <th className="px-6 py-4 font-semibold">Assignment</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Submission Date</th>
                <th className="px-6 py-4 font-semibold text-right">Marks</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
              {submittedAssignments.map((assignment) => (
                <tr key={assignment.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium font-mono text-emerald-700">{assignment.courseCode}</td>
                  <td className="px-6 py-4">
                    <div className="font-bold text-gray-900">{assignment.title}</div>
                    {assignment.submittedFile && (
                      <div className="flex items-center text-xs text-gray-400 mt-1">
                        <File size={10} className="mr-1"/> {assignment.submittedFile}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide ${getStatusColor(assignment.status)}`}>
                      {assignment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {assignment.submissionDate || '-'}
                  </td>
                  <td className="px-6 py-4 text-right">
                    {assignment.obtainedMarks !== undefined ? (
                      <span className="font-bold text-gray-900">{assignment.obtainedMarks} <span className="text-gray-400 font-normal">/ {assignment.totalMarks}</span></span>
                    ) : (
                      <span className="text-gray-400 italic text-xs">Pending</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Submission Modal */}
      {selectedAssignment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <div>
                 <h3 className="font-bold text-gray-900 text-lg">Submit Assignment</h3>
                 <p className="text-xs text-gray-500 mt-1">{selectedAssignment.title} • {selectedAssignment.courseCode}</p>
              </div>
              <button 
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-200 rounded-full transition-colors"
                disabled={isSubmitting}
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
               <div 
                 className={`
                   border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center transition-colors
                   ${dragActive ? 'border-emerald-500 bg-emerald-50' : 'border-gray-300 hover:bg-gray-50'}
                 `}
                 onDragEnter={handleDrag} 
                 onDragLeave={handleDrag} 
                 onDragOver={handleDrag} 
                 onDrop={handleDrop}
               >
                 {!file ? (
                   <>
                     <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4">
                       <UploadCloud size={24} />
                     </div>
                     <p className="text-sm font-semibold text-gray-800">Click to upload or drag and drop</p>
                     <p className="text-xs text-gray-500 mt-1">PDF, DOCX, ZIP up to 10MB</p>
                     <input 
                        type="file" 
                        className="hidden" 
                        id="file-upload"
                        onChange={handleChange}
                     />
                     <label htmlFor="file-upload" className="absolute inset-0 cursor-pointer w-full h-full opacity-0"></label>
                   </>
                 ) : (
                    <div className="flex items-center space-x-3 bg-emerald-50 p-3 rounded-lg border border-emerald-200">
                       <File size={24} className="text-emerald-600" />
                       <div className="text-left">
                          <p className="text-sm font-bold text-gray-800">{file.name}</p>
                          <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                       </div>
                       <button onClick={() => setFile(null)} className="p-1 hover:bg-emerald-200 rounded text-emerald-700">
                          <X size={16} />
                       </button>
                    </div>
                 )}
               </div>

               <div className="space-y-2">
                 <label className="text-xs font-bold text-gray-600 uppercase">Comments (Optional)</label>
                 <textarea 
                   className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none resize-none"
                   rows={3}
                   placeholder="Add any additional notes for the instructor..."
                 />
               </div>
            </div>

            <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end space-x-3">
              <button 
                onClick={closeModal}
                className="px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-bold text-sm hover:bg-gray-100 transition-colors"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button 
                onClick={handleSubmit}
                disabled={!file || isSubmitting}
                className={`
                  px-5 py-2.5 rounded-lg text-white font-bold text-sm flex items-center space-x-2 transition-colors shadow-sm
                  ${!file || isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-700'}
                `}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Assignment</span>
                    <CheckCircle size={16} />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Assignments;