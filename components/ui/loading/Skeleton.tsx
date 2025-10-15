'use client';

import { motion } from 'framer-motion';

export function DashboardSkeleton() {
  return (
    <div className="space-y-4 p-4">
      {/* Header Skeleton */}
      <div className="flex justify-between items-center">
        <div className="h-6 bg-slate-200 rounded w-1/3"></div>
        <div className="h-4 bg-slate-200 rounded w-1/4"></div>
      </div>
      
      {/* Chart Skeleton */}
      <div className="h-40 bg-slate-100 rounded-lg relative overflow-hidden">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>
      
      {/* Stats Skeleton */}
      <div className="grid grid-cols-3 gap-4 pt-2">
        {[1, 2, 3].map((item) => (
          <div key={item} className="space-y-2">
            <div className="h-6 bg-slate-200 rounded w-3/4 mx-auto"></div>
            <div className="h-4 bg-slate-100 rounded w-1/2 mx-auto"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
      <div className="flex items-center space-x-4 mb-4">
        <div className="h-12 w-12 rounded-full bg-slate-200"></div>
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-slate-200 rounded w-3/4"></div>
          <div className="h-3 bg-slate-100 rounded w-1/2"></div>
        </div>
      </div>
      <div className="space-y-2">
        <div className="h-4 bg-slate-100 rounded"></div>
        <div className="h-4 bg-slate-100 rounded w-5/6"></div>
        <div className="h-4 bg-slate-100 rounded w-2/3"></div>
      </div>
    </div>
  );
}

export function StatsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {[1, 2, 3].map((item) => (
        <div key={item} className="text-center">
          <div className="mx-auto inline-flex items-center justify-center rounded-full px-6 py-4 text-4xl font-extrabold bg-slate-100 text-transparent mb-2">
            00
          </div>
          <div className="h-4 bg-slate-200 rounded w-3/4 mx-auto"></div>
        </div>
      ))}
    </div>
  );
}
