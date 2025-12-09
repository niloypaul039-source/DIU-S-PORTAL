import React from 'react';
import { Transaction } from '../types';
import { CreditCard, AlertTriangle, CheckCircle, FileText } from 'lucide-react';

const Financials: React.FC = () => {
  const transactions: Transaction[] = [
    { id: 'TXN-1001', date: '2025-10-15', description: 'Semester Fee (Fall 2025) - Installment 1', amount: 15000, status: 'Paid' },
    { id: 'TXN-1002', date: '2025-09-01', description: 'Library Fine', amount: 150, status: 'Paid' },
    { id: 'TXN-1003', date: '2025-11-01', description: 'Semester Fee (Fall 2025) - Installment 2', amount: 15000, status: 'Pending' },
  ];

  const totalPaid = transactions.filter(t => t.status === 'Paid').reduce((acc, curr) => acc + curr.amount, 0);
  const totalDue = transactions.filter(t => t.status === 'Pending').reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
         <h2 className="text-2xl font-bold text-gray-900">Financial Accounts</h2>
         <button className="text-emerald-600 font-bold text-sm hover:underline">Fee Structure Guidelines</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-slate-900 rounded-xl p-6 text-white shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
             <CheckCircle size={80} />
          </div>
          <div className="relative z-10">
            <div className="flex items-center space-x-3 mb-4">
               <div className="p-2 bg-emerald-500 rounded-lg">
                  <CreditCard className="text-white" size={20}/>
               </div>
               <span className="text-sm font-medium text-gray-300 uppercase tracking-wide">Total Paid</span>
            </div>
            <p className="text-3xl font-bold">BDT {totalPaid.toLocaleString()}</p>
            <p className="text-xs text-gray-400 mt-2">Last payment updated on Oct 15, 2025</p>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5 text-red-500">
             <AlertTriangle size={80} />
          </div>
          <div className="relative z-10">
            <div className="flex items-center space-x-3 mb-4">
               <div className="p-2 bg-red-100 rounded-lg">
                  <AlertTriangle className="text-red-600" size={20}/>
               </div>
               <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">Outstanding Due</span>
            </div>
            <p className="text-3xl font-bold text-gray-900">BDT {totalDue.toLocaleString()}</p>
            <div className="mt-4 flex space-x-3">
              <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-xs font-bold transition-colors">
                Pay Online
              </button>
              <p className="text-xs text-red-500 font-medium self-center">Due by Nov 01, 2025</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <h3 className="font-bold text-gray-800">Payment History</h3>
          <button className="flex items-center space-x-1 text-gray-500 text-xs font-bold hover:text-emerald-600 uppercase tracking-wide transition-colors">
             <FileText size={14} />
             <span>Statement</span>
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-white text-gray-500 text-xs uppercase border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 font-semibold">Date</th>
                <th className="px-6 py-4 font-semibold">Trx ID</th>
                <th className="px-6 py-4 font-semibold">Description</th>
                <th className="px-6 py-4 font-semibold text-right">Amount</th>
                <th className="px-6 py-4 font-semibold text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
              {transactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-gray-500">{tx.date}</td>
                  <td className="px-6 py-4 font-mono text-xs text-gray-400">{tx.id}</td>
                  <td className="px-6 py-4 font-medium text-gray-800">{tx.description}</td>
                  <td className="px-6 py-4 text-right font-bold">BDT {tx.amount.toLocaleString()}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`
                      inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide
                      ${tx.status === 'Paid' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}
                    `}>
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Financials;