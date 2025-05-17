import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          sx={{
            flexGrow: 1,
            textDecoration: 'none',
            color: 'inherit',
          }}
        >
          EliteBuilders
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            color="inherit"
            component={RouterLink}
            to="/challenges"
          >
            Challenges
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/auth"
          >
            Sign In
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 