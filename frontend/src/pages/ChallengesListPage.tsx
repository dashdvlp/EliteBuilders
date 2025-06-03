import React from 'react';
import { Container, Grid, Card, CardContent, Typography, Button, Box, Chip } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  participants: number;
  deadline: string;
}

const ChallengesListPage: React.FC = () => {
  const mockChallenges: Challenge[] = [
    {
      id: '1',
      title: 'Image Classification Challenge',
      description: 'Build an AI model to classify images into different categories with high accuracy.',
      difficulty: 'Medium',
      participants: 156,
      deadline: '2025-06-30',
    },
    {
      id: '2',
      title: 'Natural Language Processing Task',
      description: 'Create a sentiment analysis model for social media posts.',
      difficulty: 'Hard',
      participants: 89,
      deadline: '2025-07-15',
    },
    {
      id: '3',
      title: 'Time Series Prediction',
      description: 'Develop a model to predict future values in time series data.',
      difficulty: 'Easy',
      participants: 234,
      deadline: '2025-06-15',
    },
  ];

  const getDifficultyColor = (difficulty: Challenge['difficulty']) => {
    switch (difficulty) {
      case 'Easy':
        return 'success';
      case 'Medium':
        return 'warning';
      case 'Hard':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Active Challenges
      </Typography>
      <Grid container spacing={3}>
        {mockChallenges.map((challenge) => (
          <Grid item xs={12} md={6} lg={4} key={challenge.id}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Typography variant="h6" component="h2" gutterBottom>
                    {challenge.title}
                  </Typography>
                  <Chip
                    label={challenge.difficulty}
                    color={getDifficultyColor(challenge.difficulty)}
                    size="small"
                  />
                </Box>
                <Typography color="text.secondary" sx={{ mb: 2 }}>
                  {challenge.description}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    {challenge.participants} participants
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Deadline: {new Date(challenge.deadline).toLocaleDateString()}
                  </Typography>
                </Box>
                <Button
                  component={RouterLink}
                  to={`/challenges/${challenge.id}`}
                  variant="contained"
                  fullWidth
                  sx={{ mt: 2 }}
                >
                  View Challenge
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ChallengesListPage; 