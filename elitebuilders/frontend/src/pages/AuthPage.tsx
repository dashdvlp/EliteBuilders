import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Button,
  TextField,
  Box,
  Paper,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import GoogleIcon from '@mui/icons-material/Google';
import { useUser } from '../context/UserContext';

const AuthPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, updateProfile } = useUser();
  const [showEmailDialog, setShowEmailDialog] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<'Google' | 'GitHub' | null>(null);
  const [email, setEmail] = useState('');
  const [links, setLinks] = useState({
    github: '',
    portfolio: '',
    cv: '',
  });

  const handleMockOAuth = (provider: 'Google' | 'GitHub') => {
    setSelectedProvider(provider);
    setShowEmailDialog(true);
  };

  const handleEmailSubmit = () => {
    if (email) {
      login(email);
      setShowEmailDialog(false);
    }
  };

  const handleLinksSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      githubUrl: links.github,
      portfolioUrl: links.portfolio,
      cvUrl: links.cv,
    });
    navigate('/challenges');
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, mb: 4 }}>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Sign In to EliteBuilders
        </Typography>
        
        <Paper sx={{ p: 4, mt: 4 }}>
          {/* OAuth Buttons */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 4 }}>
            <Button
              variant="contained"
              startIcon={<GitHubIcon />}
              onClick={() => handleMockOAuth('GitHub')}
              fullWidth
            >
              Continue with GitHub
            </Button>
            <Button
              variant="contained"
              startIcon={<GoogleIcon />}
              onClick={() => handleMockOAuth('Google')}
              fullWidth
            >
              Continue with Google
            </Button>
          </Box>

          <Divider sx={{ my: 4 }}>Profile Links</Divider>

          {/* Profile Links Form */}
          <Box component="form" onSubmit={handleLinksSubmit}>
            <TextField
              fullWidth
              label="GitHub Profile URL"
              variant="outlined"
              margin="normal"
              value={links.github}
              onChange={(e) => setLinks({ ...links, github: e.target.value })}
            />
            <TextField
              fullWidth
              label="Portfolio URL"
              variant="outlined"
              margin="normal"
              value={links.portfolio}
              onChange={(e) => setLinks({ ...links, portfolio: e.target.value })}
            />
            <TextField
              fullWidth
              label="CV/Resume URL"
              variant="outlined"
              margin="normal"
              value={links.cv}
              onChange={(e) => setLinks({ ...links, cv: e.target.value })}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 3 }}
            >
              Save Profile Links
            </Button>
          </Box>
        </Paper>
      </Box>

      {/* Email Dialog */}
      <Dialog open={showEmailDialog} onClose={() => setShowEmailDialog(false)}>
        <DialogTitle>
          Enter your email for {selectedProvider} sign-in
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Email Address"
            type="email"
            fullWidth
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowEmailDialog(false)}>Cancel</Button>
          <Button onClick={handleEmailSubmit} variant="contained" color="primary">
            Continue
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AuthPage; 