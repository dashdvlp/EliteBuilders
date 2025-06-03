import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Box } from '@mui/material';
import SubmissionForm from '../components/SubmissionForm';

interface Challenge {
  id: string;
  title: string;
  description: string;
}

const SubmitChallengePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [challenge, setChallenge] = useState<Challenge | null>(null);

  useEffect(() => {
    // Mock fetch challenge details
    const mockChallenge = {
      id: id || '',
      title: 'AI-Powered Code Review Assistant',
      description: 'Build an AI assistant that helps developers review code by providing intelligent suggestions and identifying potential issues.',
    };
    setChallenge(mockChallenge);
  }, [id]);

  if (!challenge) {
    return (
      <Container>
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography>Loading challenge details...</Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {challenge.title}
        </Typography>
        <Typography variant="body1" paragraph>
          {challenge.description}
        </Typography>
        
        <SubmissionForm challengeId={challenge.id} />
      </Box>
    </Container>
  );
};

export default SubmitChallengePage; 