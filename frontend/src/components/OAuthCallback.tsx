import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CircularProgress, Container, Box, Typography } from '@mui/material';
import { useUser } from '../context/UserContext';

const OAuthCallback: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { loginWithOAuth } = useUser();

  useEffect(() => {
    const handleOAuthCallback = async () => {
      try {
        const params = new URLSearchParams(location.search);
        const code = params.get('code');
        const provider = location.pathname.includes('google') ? 'google' : 'github';

        if (!code) {
          throw new Error('No authorization code received');
        }

        await loginWithOAuth(provider, code);
        navigate('/challenges');
      } catch (error) {
        console.error('OAuth callback error:', error);
        navigate('/auth', { state: { error: 'Authentication failed. Please try again.' } });
      }
    };

    handleOAuthCallback();
  }, [location, loginWithOAuth, navigate]);

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          mt: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <CircularProgress />
        <Typography>Completing authentication...</Typography>
      </Box>
    </Container>
  );
};

export default OAuthCallback; 