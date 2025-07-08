import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Badge,
  Box,
  Container,
} from '@mui/material';
import {
  ShoppingCart,
  Search,
  Menu as MenuIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const [cartItemCount] = useState(0);

  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        backgroundColor: 'white',
        color: 'black',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        width: '100%',
      }}
    >
      <Container 
        maxWidth={false}
        sx={{ 
          maxWidth: '1200px !important',
          mx: 'auto',
          px: { xs: 3, md: '100px' },
        }}
      >
        <Toolbar sx={{ 
          justifyContent: 'space-between', 
          py: 1,
          px: '0 !important',
        }}>
          {/* Logo */}
          <Typography
            variant="h6"
            component="div"
            onClick={() => navigate('/')}
            sx={{
              fontWeight: 700,
              cursor: 'pointer',
              background: 'linear-gradient(45deg, #1976d2 30%, #dc004e 90%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            E-Commerce
          </Typography>

          {/* Navigation */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
            <Button 
              color="inherit" 
              onClick={() => navigate('/')}
              sx={{ textTransform: 'none' }}
            >
              Home
            </Button>
            <Button 
              color="inherit" 
              onClick={() => navigate('/products')}
              sx={{ textTransform: 'none' }}
            >
              Products
            </Button>
          </Box>

          {/* Right side actions */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton color="inherit">
              <Search />
            </IconButton>
            
            <IconButton 
              color="inherit" 
              onClick={() => navigate('/cart')}
            >
              <Badge badgeContent={cartItemCount} color="error">
                <ShoppingCart />
              </Badge>
            </IconButton>

            {/* Mobile menu button */}
            <IconButton 
              color="inherit" 
              sx={{ display: { md: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;