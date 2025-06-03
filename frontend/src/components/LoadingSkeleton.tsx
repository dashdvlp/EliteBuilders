import React from 'react';
import { Skeleton, Box, Paper } from '@mui/material';

interface LoadingSkeletonProps {
  type?: 'card' | 'list' | 'profile' | 'form';
  count?: number;
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({ 
  type = 'card',
  count = 1 
}) => {
  const renderCardSkeleton = () => (
    <Paper sx={{ p: 3, mb: 2 }}>
      <Skeleton variant="rectangular" height={32} width="60%" sx={{ mb: 2 }} />
      <Skeleton variant="text" sx={{ mb: 1 }} />
      <Skeleton variant="text" sx={{ mb: 1 }} />
      <Skeleton variant="text" width="80%" />
      <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
        <Skeleton variant="rectangular" width={80} height={24} />
        <Skeleton variant="rectangular" width={80} height={24} />
      </Box>
    </Paper>
  );

  const renderListSkeleton = () => (
    <Box sx={{ display: 'flex', alignItems: 'center', p: 2, mb: 1 }}>
      <Skeleton variant="circular" width={40} height={40} sx={{ mr: 2 }} />
      <Box sx={{ flex: 1 }}>
        <Skeleton variant="text" width="40%" sx={{ mb: 1 }} />
        <Skeleton variant="text" width="20%" />
      </Box>
      <Skeleton variant="rectangular" width={60} height={24} />
    </Box>
  );

  const renderProfileSkeleton = () => (
    <Paper sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', gap: 3, mb: 4 }}>
        <Skeleton variant="circular" width={100} height={100} />
        <Box sx={{ flex: 1 }}>
          <Skeleton variant="rectangular" height={32} width="40%" sx={{ mb: 2 }} />
          <Skeleton variant="text" width="60%" sx={{ mb: 1 }} />
          <Skeleton variant="text" width="40%" />
        </Box>
      </Box>
      <Box sx={{ mb: 3 }}>
        <Skeleton variant="rectangular" height={24} width="30%" sx={{ mb: 2 }} />
        <Skeleton variant="text" sx={{ mb: 1 }} />
        <Skeleton variant="text" sx={{ mb: 1 }} />
        <Skeleton variant="text" width="80%" />
      </Box>
    </Paper>
  );

  const renderFormSkeleton = () => (
    <Paper sx={{ p: 3 }}>
      <Skeleton variant="rectangular" height={32} width="40%" sx={{ mb: 4 }} />
      <Box sx={{ mb: 3 }}>
        <Skeleton variant="rectangular" height={56} sx={{ mb: 2 }} />
        <Skeleton variant="rectangular" height={56} sx={{ mb: 2 }} />
        <Skeleton variant="rectangular" height={56} sx={{ mb: 2 }} />
      </Box>
      <Skeleton variant="rectangular" height={42} width="100%" />
    </Paper>
  );

  const renderSkeleton = () => {
    switch (type) {
      case 'card':
        return renderCardSkeleton();
      case 'list':
        return renderListSkeleton();
      case 'profile':
        return renderProfileSkeleton();
      case 'form':
        return renderFormSkeleton();
      default:
        return renderCardSkeleton();
    }
  };

  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <Box key={index}>{renderSkeleton()}</Box>
      ))}
    </>
  );
}; 