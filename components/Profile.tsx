import React, { useState, useEffect } from 'react';
import { Student } from '../types';
import { User, Mail, Phone, MapPin, Save, Edit2, X, Camera, CreditCard, Shield } from 'lucide-react';

interface ProfileProps {
  student: Student;
  onUpdate: (updatedStudent: Student) => void;
}

const Profile: React.FC<ProfileProps> = ({ student, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Student>(student);

  // Sync formData if student prop changes
  useEffect(() => {
    setFormData(student);
  }, [student]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    onUpdate(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(student);
    setIsEditing(false);
  };

  const InputField = ({ label, name, value, disabled = false, type = "text" }: { label: string, name: string, value: string | undefined, disabled?: boolean, type?: string }) => (
    <div className="space-y-1">
      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">{label}</label>
      {isEditing && !disabled ? (
        <input
          type={type}
          name={name}
          value={value || ''}
          onChange={handleChange}
          className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-sm"
        />
      ) : (
        <div className={`p-2.5 border rounded-lg text-gray-800 font-medium text-sm ${disabled ? 'bg-gray-50 border-gray-200' : 'bg-white border-gray-200'}`}>
          {value || <span className="text-gray-400 italic">Not set</span>}
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-6 animate-fade-in max-w-5xl mx-auto">
      
      {/* Header / Cover */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="h-32 bg-slate-900 relative overflow-hidden">
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        </div>
        <div className="px-8 pb-8">
          <div className="flex flex-col md:flex-row items-end -mt-12 space-y-4 md:space-y-0 md:space-x-6">
            <div className="relative">
              <img 
                src={formData.avatarUrl} 
                alt="Profile" 
                className="w-32 h-32 rounded-lg border-4 border-white shadow-lg object-cover bg-white"
              />
              {isEditing && (
                <button className="absolute bottom-2 right-2 bg-slate-800 text-white p-2 rounded-full shadow-lg hover:bg-slate-700 transition-colors">
                  <Camera size={14} />
                </button>
              )}
            </div>
            <div className="flex-1 pb-2">
              <h1 className="text-3xl font-bold text-gray-900">{formData.name}</h1>
              <p className="text-emerald-600 font-mono font-medium">{formData.id}</p>
            </div>
            <div className="pb-2">
              {isEditing ? (
                <div className="flex space-x-2">
                  <button 
                    onClick={handleCancel}
                    className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                  >
                    <X size={16} />
                    <span>Cancel</span>
                  </button>
                  <button 
                    onClick={handleSave}
                    className="flex items-center space-x-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors shadow-sm text-sm font-medium"
                  >
                    <Save size={16} />
                    <span>Save</span>
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => setIsEditing(true)}
                  className="flex items-center space-x-2 px-5 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors shadow-sm text-sm font-medium"
                >
                  <Edit2 size={16} />
                  <span>Edit Info</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Col - Badges */}
        <div className="space-y-6">
           <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="font-bold text-gray-800 mb-4 text-sm uppercase tracking-wide">Academic Status</h3>
              <div className="space-y-4">
                <div>
                   <span className="text-xs text-gray-500">Program</span>
                   <p className="font-semibold text-gray-800">{formData.program}</p>
                </div>
                <div>
                   <span className="text-xs text-gray-500">Current Semester</span>
                   <p className="font-semibold text-gray-800">Fall 2024</p>
                </div>
                <div>
                   <span className="text-xs text-gray-500">Batch</span>
                   <span className="inline-block bg-emerald-100 text-emerald-800 text-xs px-2 py-1 rounded font-bold mt-1">
                     {formData.batch}
                   </span>
                </div>
              </div>
           </div>

           <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="font-bold text-gray-800 mb-4 text-sm uppercase tracking-wide">Information</h3>
              <div className="space-y-3">
                 <div className="flex items-center text-sm text-gray-600">
                    <Shield size={16} className="mr-3 text-emerald-600" />
                    <span>Regular Student</span>
                 </div>
                 <div className="flex items-center text-sm text-gray-600">
                    <CreditCard size={16} className="mr-3 text-emerald-600" />
                    <span>Accounts Clear</span>
                 </div>
              </div>
           </div>
        </div>

        {/* Right Col - Forms */}
        <div className="lg:col-span-2 space-y-6">
           {/* Personal Info */}
           <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
             <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
               <div className="flex items-center space-x-2">
                 <User size={18} className="text-emerald-600" />
                 <h2 className="font-bold text-gray-800">Personal Information</h2>
               </div>
             </div>
             <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="md:col-span-2">
                 <InputField label="Full Name" name="name" value={formData.name} />
               </div>
               <InputField label="Father's Name" name="fatherName" value={formData.fatherName} />
               <InputField label="Mother's Name" name="motherName" value={formData.motherName} />
               <InputField label="Student ID" name="id" value={formData.id} disabled />
               <InputField label="Date of Birth" name="dob" value="01 Jan 2002" disabled />
             </div>
           </div>

           {/* Contact Info */}
           <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
             <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
               <div className="flex items-center space-x-2">
                 <MapPin size={18} className="text-emerald-600" />
                 <h2 className="font-bold text-gray-800">Contact Details</h2>
               </div>
             </div>
             <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="md:col-span-2">
                  <InputField label="Address" name="address" value={formData.address} />
               </div>
               <InputField label="Email" name="email" value={formData.email} type="email" />
               <InputField label="Phone" name="phone" value={formData.phone} type="tel" />
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;