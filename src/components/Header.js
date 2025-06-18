import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Box display="flex" alignItems="center" sx={{ flexGrow: 1 }}>

          <Typography variant="h6" component={Link} to="/" sx={{ textDecoration: 'none', color: 'white' }}>
            2SAN Business Case Assessment
          </Typography>
        </Box>
        <Button 
          color="inherit" 
          component={Link} 
          to="/" 
          startIcon={<DashboardIcon />}
        >
          Dashboard
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
