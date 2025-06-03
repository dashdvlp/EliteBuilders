import React, { useState, useEffect } from 'react';
import { Typography, List, ListItem, ListItemText, Paper, Button } from '@mui/material';

interface Notification {
  id: number;
  message: string;
  type: 'submission' | 'score' | 'badge';
  timestamp: Date;
}

const NotificationSystem: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    // Simulate fetching notifications
    const mockNotifications: Notification[] = [
      { id: 1, message: 'Your submission has been received.', type: 'submission', timestamp: new Date() },
      { id: 2, message: 'Your score has been updated to 85/100.', type: 'score', timestamp: new Date() },
      { id: 3, message: 'You have earned a new badge: Code Master!', type: 'badge', timestamp: new Date() },
    ];
    setNotifications(mockNotifications);
  }, []);

  const handleSendEmailAlert = (notification: Notification) => {
    // Simulate sending an email alert
    alert(`Email alert sent: ${notification.message}`);
  };

  return (
    <Paper sx={{ p: 3, maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Notifications
      </Typography>
      <List>
        {notifications.map((notification) => (
          <ListItem key={notification.id} divider>
            <ListItemText
              primary={notification.message}
              secondary={`Type: ${notification.type} | Time: ${notification.timestamp.toLocaleString()}`}
            />
            <Button variant="outlined" onClick={() => handleSendEmailAlert(notification)}>
              Send Email Alert
            </Button>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default NotificationSystem; 