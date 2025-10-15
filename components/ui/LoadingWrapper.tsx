'use client';

import { motion } from 'framer-motion';
import { ReactNode, useEffect, useState } from 'react';

// Import skeleton components
import { DashboardSkeleton, CardSkeleton, StatsSkeleton } from './loading/Skeleton';

type LoadingWrapperProps = {
  children: ReactNode;
  loading?: boolean;
  fallback?: ReactNode;
  delay?: number;
  className?: string;
};

export function LoadingWrapper({
  children,
  loading = false,
  fallback = null,
  delay = 0,
  className = '',
}: LoadingWrapperProps) {
  const [isLoading, setIsLoading] = useState(loading);

  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, delay);
      return () => clearTimeout(timer);
    }
    setIsLoading(loading);
  }, [loading, delay]);

  if (isLoading) {
    return <>{fallback}</>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

type SkeletonWrapperProps = {
  children: ReactNode;
  loading: boolean;
  type?: 'card' | 'dashboard' | 'stats';
  count?: number;
  className?: string;
};

export function SkeletonWrapper({
  children,
  loading,
  type = 'card',
  count = 1,
  className = '',
}: SkeletonWrapperProps) {
  const getSkeletonComponent = () => {
    switch (type) {
      case 'dashboard':
        return DashboardSkeleton;
      case 'card':
        return CardSkeleton;
      case 'stats':
        return StatsSkeleton;
      default:
        return CardSkeleton;
    }
  };

  const SkeletonComponent = getSkeletonComponent();

  return (
    <LoadingWrapper
      loading={loading}
      fallback={
        <div className={className}>
          {Array.from({ length: count }).map((_, i) => (
            <SkeletonComponent key={i} />
          ))}
        </div>
      }
    >
      {children}
    </LoadingWrapper>
  );
}
