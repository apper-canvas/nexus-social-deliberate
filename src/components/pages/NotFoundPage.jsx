import React from 'react';
import { useNavigate } from 'react-router-dom';
import NotFoundDisplay from '@/components/organisms/NotFoundDisplay';

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <NotFoundDisplay 
      onGoHome={() => navigate('/')}
      onGoBack={() => navigate(-1)}
    />
  );
}

export default NotFoundPage;