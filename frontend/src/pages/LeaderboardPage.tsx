import React from 'react';
import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

interface Submission {
  id: string;
  userId: string;
  userEmail: string;
  repositoryUrl: string;
  score: number;
  status: 'completed' | 'evaluating' | 'failed';
  submittedAt: string;
}

const LeaderboardPage: React.FC = () => {
  const mockSubmissions: Submission[] = [
    {
      id: '1',
      userId: 'user1',
      userEmail: 'user1@example.com',
      repositoryUrl: 'https://github.com/user1/solution',
      score: 95,
      status: 'completed',
      submittedAt: '2024-05-15T10:00:00Z',
    },
    {
      id: '2',
      userId: 'user2',
      userEmail: 'user2@example.com',
      repositoryUrl: 'https://github.com/user2/solution',
      score: 88,
      status: 'completed',
      submittedAt: '2024-05-14T15:30:00Z',
    },
    {
      id: '3',
      userId: 'user3',
      userEmail: 'user3@example.com',
      repositoryUrl: 'https://github.com/user3/solution',
      score: 92,
      status: 'completed',
      submittedAt: '2024-05-14T09:15:00Z',
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Challenge Leaderboard
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Rank</TableCell>
              <TableCell>User</TableCell>
              <TableCell>Score</TableCell>
              <TableCell>Submitted</TableCell>
              <TableCell>Repository</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mockSubmissions
              .sort((a, b) => b.score - a.score)
              .map((submission, index) => (
                <TableRow key={submission.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{submission.userEmail}</TableCell>
                  <TableCell>{submission.score}</TableCell>
                  <TableCell>
                    {new Date(submission.submittedAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <a
                      href={submission.repositoryUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Code
                    </a>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default LeaderboardPage; 