import React from 'react';
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Collapse,
  IconButton,
  Paper,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import RefreshIcon from '@mui/icons-material/Refresh';

interface ErrorAlertProps {
  error: string | null;
  title?: string;
  onClose?: () => void;
  onRetry?: () => void;
  severity?: 'error' | 'warning';
  variant?: 'standard' | 'filled' | 'outlined';
  showRetry?: boolean;
}

export const ErrorAlert: React.FC<ErrorAlertProps> = ({
  error,
  title = 'Error',
  onClose,
  onRetry,
  severity = 'error',
  variant = 'filled',
  showRetry = true,
}) => {
  if (!error) return null;

  return (
    <Collapse in={!!error}>
      <Paper elevation={0} sx={{ mb: 2 }}>
        <Alert
          severity={severity}
          variant={variant}
          action={
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {showRetry && onRetry && (
                <Button
                  color="inherit"
                  size="small"
                  startIcon={<RefreshIcon />}
                  onClick={onRetry}
                  sx={{ mr: 1 }}
                >
                  Retry
                </Button>
              )}
              {onClose && (
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={onClose}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              )}
            </Box>
          }
        >
          <AlertTitle>{title}</AlertTitle>
          {error}
        </Alert>
      </Paper>
    </Collapse>
  );
}; 