import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  TextField,
  Box,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import ChallengeCard from '../components/ChallengeCard';
import { Challenge, ChallengeCategory } from '../types/challenge';

// Mock categories for filtering
const CATEGORIES: ChallengeCategory[] = [
  'NLP',
  'Computer Vision',
  'Robotics',
  'Generative AI',
  'Other',
];

const ChallengesListPage: React.FC = () => {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  useEffect(() => {
    fetchChallenges();
  }, []);

  const fetchChallenges = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/challenges');
      if (!response.ok) {
        throw new Error('Failed to fetch challenges');
      }
      const data = await response.json();
      setChallenges(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      // Use mock data when API fails
      setChallenges([
        {
          id: 1,
          title: 'AI-Powered Content Moderator',
          description: 'Build an AI system that can detect and moderate inappropriate content in real-time.',
          category: 'NLP',
          mock_deadline: '2025-06-01 23:59 UTC',
          mock_data_pack_url: 'https://example.com/data/content-moderation',
          mock_rubric_url: 'https://example.com/rubrics/content-moderation',
        },
        {
          id: 2,
          title: 'Computer Vision for Accessibility',
          description: 'Create a solution that helps visually impaired users navigate indoor spaces.',
          category: 'Computer Vision',
          mock_deadline: '2025-06-15 23:59 UTC',
          mock_data_pack_url: 'https://example.com/data/cv-accessibility',
          mock_rubric_url: 'https://example.com/rubrics/cv-accessibility',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (event: SelectChangeEvent) => {
    setSelectedCategory(event.target.value);
  };

  const filteredChallenges = challenges.filter(challenge => {
    const matchesSearch = 
      challenge.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      challenge.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = 
      !selectedCategory || challenge.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <Container maxWidth="lg">
        <Typography>Loading challenges...</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg">
        <Typography color="error">Error: {error}</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h2" component="h1" gutterBottom>
        AI Challenges
      </Typography>
      
      <Box sx={{ mb: 4, display: 'flex', gap: 2 }}>
        <TextField
          fullWidth
          label="Search Challenges"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel id="category-filter-label">Filter by Category</InputLabel>
          <Select
            labelId="category-filter-label"
            value={selectedCategory}
            label="Filter by Category"
            onChange={handleCategoryChange}
          >
            <MenuItem value="">
              <em>All Categories</em>
            </MenuItem>
            {CATEGORIES.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Grid container spacing={3}>
        {filteredChallenges.map((challenge) => (
          <Grid item xs={12} sm={6} md={4} key={challenge.id}>
            <ChallengeCard challenge={challenge} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ChallengesListPage; 