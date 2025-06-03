import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Typography,
  Paper,
  Box,
  Grid,
  Avatar,
  Tooltip,
  Divider,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkIcon from '@mui/icons-material/Link';

interface UserProfile {
  id: string;
  email: string;
  githubUrl?: string;
  portfolioUrl?: string;
  badges: Badge[];
  stats: {
    challengesCompleted: number;
    averageScore: number;
    rank: number;
  };
}

interface Badge {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  earnedAt: string;
}

const UserProfilePage: React.FC = () => {
  const { id: userId } = useParams<{ id: string }>();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        // Mock API call
        await new Promise(resolve => setTimeout(resolve, 800));

        // Mock user data
        const mockProfile: UserProfile = {
          id: userId || '',
          email: 'alice@example.com',
          githubUrl: 'https://github.com/alice',
          portfolioUrl: 'https://alice-portfolio.dev',
          badges: [
            {
              id: '1',
              name: 'Early Adopter',
              description: 'One of the first 100 users on EliteBuilders',
              imageUrl: 'https://placehold.co/80x80?text=🌟',
              earnedAt: '2024-01-15',
            },
            {
              id: '2',
              name: 'AI Expert',
              description: 'Completed 5 AI challenges with score > 90',
              imageUrl: 'https://placehold.co/80x80?text=🤖',
              earnedAt: '2024-02-20',
            },
            {
              id: '3',
              name: 'Top Contributor',
              description: 'Ranked in top 10 for 3 consecutive challenges',
              imageUrl: 'https://placehold.co/80x80?text=🏆',
              earnedAt: '2024-03-10',
            },
          ],
          stats: {
            challengesCompleted: 8,
            averageScore: 92.5,
            rank: 5,
          },
        };

        setProfile(mockProfile);
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [userId]);

  if (loading || !profile) {
    return (
      <Container>
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography>Loading profile...</Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container>
      <Box sx={{ mt: 4, mb: 6 }}>
        {/* Profile Header */}
        <Paper sx={{ p: 4, mb: 4 }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item>
              <Avatar
                sx={{
                  width: 100,
                  height: 100,
                  bgcolor: 'primary.main',
                  fontSize: '2rem',
                }}
              >
                {profile.email[0].toUpperCase()}
              </Avatar>
            </Grid>
            <Grid item xs>
              <Typography variant="h4" gutterBottom>
                Developer Profile
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                <EmailIcon />
                <Typography>{profile.email}</Typography>
              </Box>
              {profile.githubUrl && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                  <GitHubIcon />
                  <Typography component="a" href={profile.githubUrl} target="_blank">
                    GitHub Profile
                  </Typography>
                </Box>
              )}
              {profile.portfolioUrl && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <LinkIcon />
                  <Typography component="a" href={profile.portfolioUrl} target="_blank">
                    Portfolio
                  </Typography>
                </Box>
              )}
            </Grid>
            <Grid item>
              <Paper elevation={2} sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="h6" gutterBottom>
                  Developer Stats
                </Typography>
                <Typography variant="body1">
                  Challenges Completed: {profile.stats.challengesCompleted}
                </Typography>
                <Typography variant="body1">
                  Average Score: {profile.stats.averageScore}
                </Typography>
                <Typography variant="body1">
                  Current Rank: #{profile.stats.rank}
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Paper>

        {/* Badges Section */}
        <Typography variant="h5" gutterBottom>
          Achievement Badges
        </Typography>
        <Divider sx={{ mb: 3 }} />
        <Grid container spacing={3}>
          {profile.badges.map((badge) => (
            <Grid item xs={12} sm={6} md={4} key={badge.id}>
              <Tooltip title={badge.description} arrow>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    cursor: 'help',
                  }}
                >
                  <Box
                    component="img"
                    src={badge.imageUrl}
                    alt={badge.name}
                    sx={{ width: 80, height: 80 }}
                  />
                  <Box>
                    <Typography variant="h6">{badge.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Earned {new Date(badge.earnedAt).toLocaleDateString()}
                    </Typography>
                  </Box>
                </Paper>
              </Tooltip>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default UserProfilePage; 