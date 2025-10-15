'use client';

import { BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { SkeletonWrapper } from '../../components/ui/LoadingWrapper';

const stats = [
  { label: 'Leads', value: '128', change: '+12%' },
  { label: 'Appointments', value: '42', change: '+8%' },
  { label: 'Conversions', value: '28', change: '+24%' }
];

export function DashboardPreview() {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <SkeletonWrapper loading={isLoading} type="dashboard">
      <motion.div 
        className="bg-white p-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-slate-800">Campaign Performance</h3>
          <div className="flex items-center text-sm text-slate-500">
            <span className="w-2 h-2 rounded-full bg-indigo-500 mr-1"></span>
            This Month
          </div>
        </div>
        
        <div className="h-40 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 mb-4">
          <BarChart3 className="w-12 h-12" />
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          {stats.map((item, index) => (
            <motion.div 
              key={index} 
              className="text-center p-3 bg-slate-50 rounded-lg"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <div className="text-2xl font-bold text-slate-900">{item.value}</div>
              <div className="text-xs text-slate-500">{item.label}</div>
              <div className="text-xs text-green-500 font-medium">{item.change}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </SkeletonWrapper>
  );
}
