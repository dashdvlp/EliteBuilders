import React from 'react';
import { Container, Typography, Button, Box, Paper } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 8, mb: 4, textAlign: 'center' }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to EliteBuilders
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph>
          The premier AI competition platform for developers
        </Typography>
        <Box sx={{ mt: 4 }}>
          <Button
            variant="contained"
            size="large"
            component={RouterLink}
            to="/challenges"
            sx={{ mr: 2 }}
          >
            View Challenges
          </Button>
          <Button
            variant="outlined"
            size="large"
            component={RouterLink}
            to="/auth"
          >
            Get Started
          </Button>
        </Box>
      </Box>

      <Box sx={{ mt: 8, display: 'grid', gap: 4, gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom>
            Compete
          </Typography>
          <Typography>
            Participate in cutting-edge AI challenges and showcase your skills to the world.
          </Typography>
        </Paper>

        <Paper sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom>
            Learn
          </Typography>
          <Typography>
            Access resources, tutorials, and best practices from top AI developers.
          </Typography>
        </Paper>

        <Paper sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom>
            Connect
          </Typography>
          <Typography>
            Join a community of passionate developers and industry experts.
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
};

export default HomePage; 