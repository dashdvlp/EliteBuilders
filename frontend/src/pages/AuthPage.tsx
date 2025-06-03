import React, { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Container,
  Typography,
  Button,
  TextField,
  Box,
  Paper,
  Divider,
  Alert,
  CircularProgress,
  InputAdornment,
  Link,
} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import GoogleIcon from '@mui/icons-material/Google';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import LanguageIcon from '@mui/icons-material/Language';
import { useUser } from '../context/UserContext';
import { getOAuthUrl } from '../config/oauth';

const AuthPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isLoading } = useUser();
  const [email, setEmail] = useState('');
  const [portfolioUrl, setPortfolioUrl] = useState('');
  const [githubUsername, setGithubUsername] = useState('');
  const [error, setError] = useState<string | null>(
    (location.state as any)?.error || null
  );
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [suggestedChallenge, setSuggestedChallenge] = useState<string | null>(null);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      // Create profile data object
      const profileData = {
        ...(githubUsername && { githubUsername }),
        ...(portfolioUrl && { portfolioUrl }),
        ...(selectedFile && { cv: selectedFile }),
      };

      // Only pass profile data if any field is filled
      const hasProfileData = Object.keys(profileData).length > 0;
      await login(email, hasProfileData ? profileData : undefined);
      
      navigate('/challenges');
    } catch (error) {
      setError('Login failed. Please try again.');
    }
  };

  const handleOAuthLogin = (provider: 'google' | 'github') => {
    // Set a suggested first challenge after OAuth sign-in
    setSuggestedChallenge("Complete your first challenge: Build a simple to-do app");
    window.location.href = getOAuthUrl(provider);
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type === 'application/pdf' && file.size <= 5 * 1024 * 1024) { // 5MB limit
        setSelectedFile(file);
        setError(null);
      } else {
        setError('Please upload a PDF file under 5MB');
        setSelectedFile(null);
      }
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, mb: 4 }}>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Sign In to EliteBuilders
        </Typography>
        
        <Paper sx={{ p: 4, mt: 4 }}>
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {/* OAuth Buttons */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 4 }}>
            <Button
              variant="contained"
              startIcon={<GitHubIcon />}
              onClick={() => handleOAuthLogin('github')}
              fullWidth
              disabled={isLoading}
            >
              Continue with GitHub
            </Button>
            <Button
              variant="contained"
              startIcon={<GoogleIcon />}
              onClick={() => handleOAuthLogin('google')}
              fullWidth
              disabled={isLoading}
              sx={{ bgcolor: '#DB4437', '&:hover': { bgcolor: '#C53929' } }}
            >
              Continue with Google
            </Button>
          </Box>

          <Divider sx={{ my: 4 }}>OR</Divider>

          {/* Email Form */}
          <form onSubmit={handleEmailSubmit}>
            <TextField
              fullWidth
              label="Email Address"
              variant="outlined"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              required
              sx={{ mb: 2 }}
            />

            {/* GitHub Username */}
            <TextField
              fullWidth
              label="GitHub Username (Optional)"
              variant="outlined"
              value={githubUsername}
              onChange={(e) => setGithubUsername(e.target.value)}
              disabled={isLoading}
              sx={{ mb: 2 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <GitHubIcon />
                  </InputAdornment>
                ),
              }}
            />

            {/* Portfolio URL */}
            <TextField
              fullWidth
              label="Portfolio URL (Optional)"
              variant="outlined"
              type="url"
              value={portfolioUrl}
              onChange={(e) => setPortfolioUrl(e.target.value)}
              disabled={isLoading}
              sx={{ mb: 2 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LanguageIcon />
                  </InputAdornment>
                ),
              }}
            />

            {/* CV Upload */}
            <Box sx={{ mb: 2 }}>
              <input
                type="file"
                accept=".pdf"
                style={{ display: 'none' }}
                ref={fileInputRef}
                onChange={handleFileSelect}
              />
              <Button
                variant="outlined"
                startIcon={<UploadFileIcon />}
                onClick={() => fileInputRef.current?.click()}
                fullWidth
                disabled={isLoading}
              >
                {selectedFile ? selectedFile.name : 'Upload CV (Optional, PDF, max 5MB)'}
              </Button>
            </Box>

            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={isLoading}
            >
              {isLoading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                'Continue'
              )}
            </Button>

            <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 2 }}>
              By continuing, you agree to our{' '}
              <Link href="/terms" color="primary">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="/privacy" color="primary">
                Privacy Policy
              </Link>
            </Typography>
          </form>

          {/* Suggested First Challenge Section */}
          {suggestedChallenge && (
            <Box sx={{ mt: 3, p: 2, bgcolor: 'info.light', borderRadius: 1 }}>
              <Typography variant="body1" color="info.contrastText">
                {suggestedChallenge}
              </Typography>
            </Box>
          )}
        </Paper>
      </Box>
    </Container>
  );
};

export default AuthPage; 