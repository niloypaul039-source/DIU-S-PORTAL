import React, { useState } from 'react';
import { BusSchedule } from '../types';
import { Bus, MapPin, Clock, ArrowRight, Info } from 'lucide-react';

const Transport: React.FC = () => {
  const [activeType, setActiveType] = useState<'To Campus' | 'From Campus'>('To Campus');

  const schedules: BusSchedule[] = [
    { id: '1', route: 'Dhanmondi - Ashulia', busNumber: 'Bus-101 (Padma)', departureTime: '07:15 AM', type: 'To Campus', stoppages: ['Sobhanbag', 'Kalabagan', 'Asad Gate', 'Technical', 'Gabtoli', 'Birulia'] },
    { id: '2', route: 'Mirpur - Ashulia', busNumber: 'Bus-205 (Meghna)', departureTime: '07:30 AM', type: 'To Campus', stoppages: ['Mirpur 10', 'Mirpur 1', 'Mazar Road', 'Diabari', 'Ashulia'] },
    { id: '3', route: 'Uttara - Ashulia', busNumber: 'Bus-302 (Jamuna)', departureTime: '07:45 AM', type: 'To Campus', stoppages: ['Abdullahpur', 'House Building', 'Diabari', 'Ashulia'] },
    { id: '4', route: 'Ashulia - Dhanmondi', busNumber: 'Bus-101 (Padma)', departureTime: '04:30 PM', type: 'From Campus', stoppages: ['Ashulia', 'Gabtoli', 'Asad Gate', 'Dhanmondi 27'] },
    { id: '5', route: 'Ashulia - Mirpur', busNumber: 'Bus-205 (Meghna)', departureTime: '04:30 PM', type: 'From Campus', stoppages: ['Ashulia', 'Diabari', 'Mirpur 1', 'Mirpur 10'] },
    { id: '6', route: 'Ashulia - Uttara', busNumber: 'Bus-302 (Jamuna)', departureTime: '02:00 PM', type: 'From Campus', stoppages: ['Ashulia', 'Diabari', 'House Building', 'Abdullahpur'] },
  ];

  const filteredSchedule = schedules.filter(s => s.type === activeType);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <Bus className="mr-3 text-emerald-600" size={28} />
            Transport Schedule
          </h2>
          <p className="text-sm text-gray-500 mt-1">Smart Transport Management System (DIU-STMS)</p>
        </div>
      </div>

      <div className="bg-white p-2 rounded-xl shadow-sm border border-gray-200 inline-flex">
        <button
          onClick={() => setActiveType('To Campus')}
          className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeType === 'To Campus' ? 'bg-emerald-600 text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}
        >
          To Campus (DSC)
        </button>
        <button
          onClick={() => setActiveType('From Campus')}
          className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeType === 'From Campus' ? 'bg-emerald-600 text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}
        >
          From Campus (DSC)
        </button>
      </div>

      <div className="bg-orange-50 border border-orange-100 p-4 rounded-lg flex items-start space-x-3">
        <Info className="text-orange-500 flex-shrink-0 mt-0.5" size={18} />
        <div className="text-sm text-orange-800">
          <p className="font-bold">Important Notice:</p>
          <p>Buses will leave exactly at the scheduled time. Students are requested to be at their respective stoppages 10 minutes prior to departure. ID Card is mandatory.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSchedule.map((bus) => (
          <div key={bus.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow group">
            <div className="bg-emerald-900 p-4 text-white flex justify-between items-center">
               <div>
                 <h3 className="font-bold text-lg">{bus.busNumber}</h3>
                 <span className="text-xs text-emerald-300 uppercase tracking-wide">Route Code: {bus.id}</span>
               </div>
               <div className="bg-emerald-800 p-2 rounded-lg border border-emerald-700">
                  <Clock size={20} className="text-emerald-100" />
               </div>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                 <div className="flex flex-col">
                    <span className="text-xs text-gray-400 font-bold uppercase">Departure</span>
                    <span className="text-2xl font-bold text-gray-900">{bus.departureTime}</span>
                 </div>
                 <ArrowRight className="text-gray-300" />
                 <div className="flex flex-col text-right">
                    <span className="text-xs text-gray-400 font-bold uppercase">Destination</span>
                    <span className="text-sm font-bold text-gray-900">{activeType === 'To Campus' ? 'DSC' : bus.route.split(' - ')[1]}</span>
                 </div>
              </div>
              
              <div className="space-y-3">
                 <div className="flex items-start space-x-2">
                    <MapPin size={16} className="text-emerald-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-xs font-bold text-gray-500 uppercase">Stoppages</p>
                      <p className="text-sm text-gray-700 leading-relaxed mt-1">
                        {bus.stoppages.join(' ➝ ')}
                      </p>
                    </div>
                 </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100">
                <button className="w-full text-center text-sm font-bold text-emerald-700 hover:text-emerald-900 hover:bg-emerald-50 py-2 rounded transition-colors">
                  View Live Location
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Transport;