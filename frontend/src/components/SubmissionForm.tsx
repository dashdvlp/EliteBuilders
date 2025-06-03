import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  CircularProgress,
  Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface SubmissionFormProps {
  challengeId: string;
}

interface SubmissionData {
  repositoryUrl: string;
  pitchDeckUrl: string;
  demoVideoUrl: string;
}

const SubmissionForm: React.FC<SubmissionFormProps> = ({ challengeId }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<SubmissionData>({
    repositoryUrl: '',
    pitchDeckUrl: '',
    demoVideoUrl: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string>('');
  const [submissionStatus, setSubmissionStatus] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    setSubmissionStatus('Uploading deliverables...');

    try {
      // Simulate deliverable upload
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmissionStatus('Running sandboxed automated tests...');

      // Simulate sandboxed automated tests
      await new Promise(resolve => setTimeout(resolve, 3000));
      setSubmissionStatus('Performing LLM rubric evaluation...');

      // Simulate LLM rubric evaluation
      await new Promise(resolve => setTimeout(resolve, 2500));
      setSubmissionStatus('Provisional score: 85/100');

      // POST to backend
      const response = await fetch(`/api/challenges/${challengeId}/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Submission failed');
      }

      // Navigate to challenge details after successful submission
      setTimeout(() => {
        navigate(`/challenges/${challengeId}`);
      }, 2000);
    } catch (err) {
      setError('Failed to submit. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Submit Your Solution
      </Typography>

      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <TextField
          fullWidth
          label="Repository Link"
          name="repositoryUrl"
          value={formData.repositoryUrl}
          onChange={handleInputChange}
          margin="normal"
          required
          helperText="Link to your GitHub repository"
        />

        <TextField
          fullWidth
          label="Pitch Deck Link"
          name="pitchDeckUrl"
          value={formData.pitchDeckUrl}
          onChange={handleInputChange}
          margin="normal"
          required
          helperText="Link to your presentation slides"
        />

        <TextField
          fullWidth
          label="Demo Video Link"
          name="demoVideoUrl"
          value={formData.demoVideoUrl}
          onChange={handleInputChange}
          margin="normal"
          required
          helperText="Link to your demo video"
        />

        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}

        {/* Submission Status Section */}
        {submissionStatus && (
          <Alert severity="info" sx={{ mt: 2 }}>
            {submissionStatus}
          </Alert>
        )}

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          disabled={submitting}
          sx={{ mt: 3 }}
        >
          {submitting ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <CircularProgress size={24} color="inherit" />
              <span>Submitting...</span>
            </Box>
          ) : (
            'Submit Solution'
          )}
        </Button>
      </Box>
    </Paper>
  );
};

export default SubmissionForm; 