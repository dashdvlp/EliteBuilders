import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
  Box,
  Link,
} from '@mui/material';
import { Challenge } from '../types/challenge';
import LinkIcon from '@mui/icons-material/Link';

interface ChallengeCardProps {
  challenge: Challenge;
}

const ChallengeCard: React.FC<ChallengeCardProps> = ({ challenge }) => {
  return (
    <Card elevation={2}>
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom>
          {challenge.title}
        </Typography>
        
        {challenge.category && (
          <Chip
            label={challenge.category}
            color="primary"
            size="small"
            sx={{ mb: 2 }}
          />
        )}

        <Typography variant="body2" color="text.secondary" paragraph>
          {challenge.description}
        </Typography>

        <Box sx={{ mt: 2 }}>
          <Typography variant="caption" display="block" color="text.secondary">
            Deadline: {challenge.mock_deadline}
          </Typography>

          {challenge.mock_data_pack_url && (
            <Link
              href={challenge.mock_data_pack_url}
              target="_blank"
              rel="noopener noreferrer"
              sx={{ display: 'flex', alignItems: 'center', mt: 1, gap: 0.5 }}
            >
              <LinkIcon fontSize="small" />
              <Typography variant="caption">Data Pack</Typography>
            </Link>
          )}

          {challenge.mock_rubric_url && (
            <Link
              href={challenge.mock_rubric_url}
              target="_blank"
              rel="noopener noreferrer"
              sx={{ display: 'flex', alignItems: 'center', mt: 1, gap: 0.5 }}
            >
              <LinkIcon fontSize="small" />
              <Typography variant="caption">Evaluation Rubric</Typography>
            </Link>
          )}
        </Box>
      </CardContent>
      
      <CardActions>
        <Button
          size="small"
          component={RouterLink}
          to={`/challenges/${challenge.id}`}
        >
          View Details
        </Button>
        <Button
          size="small"
          component={RouterLink}
          to={`/submit/${challenge.id}`}
          color="primary"
        >
          Submit Solution
        </Button>
      </CardActions>
    </Card>
  );
};

export default ChallengeCard; 