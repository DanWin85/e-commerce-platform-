import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Link,
  Divider,
} from '@mui/material';
import { GitHub, LinkedIn } from '@mui/icons-material';

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#f5f5f5',
        py: 6,
        mt: 'auto',
        width: '100%',
      }}
    >
      <Box sx={{ 
        px: { xs: 2, sm: 3, md: '100px' },
        maxWidth: '1200px',
        mx: 'auto',
      }}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              E-Commerce Demo
            </Typography>
            <Typography variant="body2" color="text.secondary">
              A full-stack e-commerce platform built with React, Node.js, PostgreSQL, and Stripe.
            </Typography>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Quick Links
            </Typography>
            <Link href="/" color="inherit" display="block" sx={{ mb: 1 }}>
              Home
            </Link>
            <Link href="/products" color="inherit" display="block" sx={{ mb: 1 }}>
              Products
            </Link>
            <Link href="/cart" color="inherit" display="block">
              Cart
            </Link>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Technologies
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              React & TypeScript
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Node.js & Express
            </Typography>
            <Typography variant="body2" color="text.secondary">
              PostgreSQL & Prisma
            </Typography>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Connect
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Link 
                href="https://github.com/DanWin85" 
                color="inherit"
                target="_blank"
                rel="noopener noreferrer"
              >
                <GitHub />
              </Link>
              <Link 
                href="https://linkedin.com/in/danwin85" 
                color="inherit"
                target="_blank"
                rel="noopener noreferrer"
              >
                <LinkedIn />
              </Link>
            </Box>
          </Grid>
        </Grid>
        
        <Divider sx={{ my: 3 }} />
        
        <Typography variant="body2" color="text.secondary" align="center">
          © 2025 Dan Win. Built for portfolio demonstration.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;