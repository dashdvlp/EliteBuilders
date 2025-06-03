import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Paper,
  Box,
  Button,
  Grid,
  Chip,
  Divider,
} from '@mui/material';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import SendIcon from '@mui/icons-material/Send';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import CodeIcon from '@mui/icons-material/Code';

interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  deadline: string;
  prize: string;
  requirements: string[];
  submissionCount: number;
}

const ChallengeDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChallenge = async () => {
      try {
        // Mock API call
        await new Promise(resolve => setTimeout(resolve, 800));

        // Mock challenge data
        const mockChallenge: Challenge = {
          id: id || '',
          title: 'AI-Powered Code Review Assistant',
          description: 'Build an AI assistant that helps developers review code by providing intelligent suggestions and identifying potential issues. The assistant should be able to analyze code quality, suggest improvements, and detect common programming mistakes.',
          difficulty: 'Intermediate',
          deadline: '2024-04-15T23:59:59Z',
          prize: '$5,000',
          requirements: [
            'Must use a modern LLM API (e.g., OpenAI, Anthropic)',
            'Support for multiple programming languages',
            'Real-time code analysis',
            'Integration with common IDEs or Git platforms',
            'Clear explanation of suggestions',
          ],
          submissionCount: 42,
        };

        setChallenge(mockChallenge);
      } catch (error) {
        console.error('Failed to fetch challenge:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchChallenge();
  }, [id]);

  const getDifficultyColor = (difficulty: Challenge['difficulty']) => {
    switch (difficulty) {
      case 'Beginner':
        return 'success';
      case 'Intermediate':
        return 'warning';
      case 'Advanced':
        return 'error';
      default:
        return 'default';
    }
  };

  const formatTimeRemaining = (deadline: string) => {
    const now = new Date();
    const deadlineDate = new Date(deadline);
    const diff = deadlineDate.getTime() - now.getTime();
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    return `${days}d ${hours}h remaining`;
  };

  if (loading || !challenge) {
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
      <Box sx={{ mt: 4, mb: 6 }}>
        {/* Header Section */}
        <Grid container spacing={2} alignItems="center" sx={{ mb: 4 }}>
          <Grid item xs>
            <Typography variant="h4" component="h1" gutterBottom>
              {challenge.title}
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 2 }}>
              <Chip
                label={challenge.difficulty}
                color={getDifficultyColor(challenge.difficulty)}
                size="small"
              />
              <Chip
                icon={<AccessTimeIcon />}
                label={formatTimeRemaining(challenge.deadline)}
                variant="outlined"
                size="small"
              />
              <Chip
                icon={<CodeIcon />}
                label={`${challenge.submissionCount} submissions`}
                variant="outlined"
                size="small"
              />
            </Box>
          </Grid>
          <Grid item>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                variant="outlined"
                startIcon={<LeaderboardIcon />}
                onClick={() => navigate(`/leaderboard/${challenge.id}`)}
              >
                Leaderboard
              </Button>
              <Button
                variant="contained"
                startIcon={<SendIcon />}
                onClick={() => navigate(`/submit/${challenge.id}`)}
              >
                Submit Solution
              </Button>
            </Box>
          </Grid>
        </Grid>

        {/* Main Content */}
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Challenge Description
              </Typography>
              <Typography paragraph>
                {challenge.description}
              </Typography>
            </Paper>

            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Requirements
              </Typography>
              <Box component="ul" sx={{ mt: 0, pl: 2 }}>
                {challenge.requirements.map((req, index) => (
                  <Typography component="li" key={index} paragraph>
                    {req}
                  </Typography>
                ))}
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <EmojiEventsIcon color="primary" />
                <Typography variant="h6">
                  Prize
                </Typography>
              </Box>
              <Typography variant="h4" color="primary" gutterBottom>
                {challenge.prize}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="body2" color="text.secondary">
                Winner will be announced within 7 days after the deadline
              </Typography>
            </Paper>

            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Important Dates
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Submission Deadline
              </Typography>
              <Typography variant="body1" gutterBottom>
                {new Date(challenge.deadline).toLocaleDateString(undefined, {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default ChallengeDetailPage; 