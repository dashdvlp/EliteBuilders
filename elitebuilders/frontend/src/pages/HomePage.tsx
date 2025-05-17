import { Container, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const HomePage = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 8, textAlign: 'center' }}>
        <Typography variant="h1" component="h1" gutterBottom>
          EliteBuilders
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom color="text.secondary">
          The AI Builders Competition Platform
        </Typography>
        <Typography variant="body1" paragraph>
          Showcase your AI development skills by building real-world solutions.
          Compete in challenges, earn recognition, and connect with top companies.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          component={RouterLink}
          to="/challenges"
          sx={{ mt: 2 }}
        >
          View Challenges
        </Button>
      </Box>
    </Container>
  );
};

export default HomePage; 