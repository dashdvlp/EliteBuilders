import React, { useState } from 'react';
import {
  Container,
  Typography,
  Button,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Alert,
} from '@mui/material';

const SponsorDashboardPage: React.FC = () => {
  const [challenges, setChallenges] = useState([
    { id: 1, title: 'AI-Powered Code Review Assistant', prize: '$5,000', submissions: 42 },
    { id: 2, title: 'Blockchain Voting System', prize: '$3,000', submissions: 28 },
  ]);

  const [newChallenge, setNewChallenge] = useState({ title: '', prize: '' });
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewChallenge((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddChallenge = () => {
    if (!newChallenge.title || !newChallenge.prize) {
      setError('Please fill in all fields');
      return;
    }
    setChallenges((prev) => [
      ...prev,
      { id: prev.length + 1, title: newChallenge.title, prize: newChallenge.prize, submissions: 0 },
    ]);
    setNewChallenge({ title: '', prize: '' });
    setError(null);
  };

  const handleDownloadPackets = (challengeId: number) => {
    // Simulate downloading candidate packets
    alert(`Downloading candidate packets for challenge ID: ${challengeId}`);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Sponsor Dashboard
      </Typography>

      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Create New Challenge
        </Typography>
        <Box component="form" sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <TextField
            label="Challenge Title"
            name="title"
            value={newChallenge.title}
            onChange={handleInputChange}
            required
          />
          <TextField
            label="Prize Amount"
            name="prize"
            value={newChallenge.prize}
            onChange={handleInputChange}
            required
          />
          <Button variant="contained" onClick={handleAddChallenge}>
            Add Challenge
          </Button>
        </Box>
        {error && <Alert severity="error">{error}</Alert>}
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Manage Challenges
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Prize</TableCell>
                <TableCell>Submissions</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {challenges.map((challenge) => (
                <TableRow key={challenge.id}>
                  <TableCell>{challenge.id}</TableCell>
                  <TableCell>{challenge.title}</TableCell>
                  <TableCell>{challenge.prize}</TableCell>
                  <TableCell>{challenge.submissions}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleDownloadPackets(challenge.id)}>
                      Download Packets
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
};

export default SponsorDashboardPage; 