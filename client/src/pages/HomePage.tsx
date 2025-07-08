import React from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Container,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, Speed, Security } from '@mui/icons-material';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ width: '100%' }}>
      {/* Hero Section - Full width background with centered content */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          py: 12,
          width: '100%',
        }}
      >
        <Container 
          maxWidth={false}
          sx={{ 
            maxWidth: '1200px !important',
            mx: 'auto',
            px: { xs: 3, md: '100px' },
            textAlign: 'center',
          }}
        >
          <Typography 
            variant="h2" 
            component="h1" 
            gutterBottom 
            fontWeight={700}
            sx={{ 
              fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4rem' },
              mb: 3,
            }}
          >
            Welcome to E-Commerce Demo
          </Typography>
          <Typography 
            variant="h5" 
            sx={{ 
              mb: 4, 
              opacity: 0.9,
              fontSize: { xs: '1.2rem', sm: '1.5rem', md: '1.8rem' },
              lineHeight: 1.4,
              maxWidth: '800px',
              mx: 'auto',
            }}
          >
            A full-stack e-commerce platform showcasing modern web development
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/products')}
            sx={{
              backgroundColor: 'white',
              color: '#667eea',
              px: 4,
              py: 1.5,
              fontSize: '1.1rem',
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 600,
              '&:hover': {
                backgroundColor: '#f5f5f5',
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            Shop Now
          </Button>
        </Container>
      </Box>

      {/* Features Section - Centered like your portfolio */}
      <Container 
        maxWidth={false}
        sx={{ 
          maxWidth: '1200px !important',
          mx: 'auto',
          px: { xs: 3, md: '100px' },
          py: 8,
        }}
      >
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography 
            variant="h3" 
            gutterBottom 
            fontWeight={600}
            sx={{ 
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
              mb: 2,
            }}
          >
            Features
          </Typography>
          <Typography 
            variant="h6" 
            color="text.secondary" 
            sx={{ 
              fontSize: { xs: '1rem', sm: '1.2rem', md: '1.4rem' },
              maxWidth: '600px',
              mx: 'auto',
            }}
          >
            Modern e-commerce built with cutting-edge technologies
          </Typography>
        </Box>

        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ 
              height: '100%', 
              textAlign: 'center', 
              p: 3,
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'translateY(-8px)',
                boxShadow: '0 12px 30px rgba(0,0,0,0.15)',
              },
            }}>
              <CardContent>
                <ShoppingBag sx={{ 
                  fontSize: 60, 
                  color: 'primary.main', 
                  mb: 2 
                }} />
                <Typography variant="h5" gutterBottom fontWeight={600}>
                  Easy Shopping
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Browse products, add to cart, and checkout with a seamless user experience.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ 
              height: '100%', 
              textAlign: 'center', 
              p: 3,
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'translateY(-8px)',
                boxShadow: '0 12px 30px rgba(0,0,0,0.15)',
              },
            }}>
              <CardContent>
                <Speed sx={{ 
                  fontSize: 60, 
                  color: 'primary.main', 
                  mb: 2 
                }} />
                <Typography variant="h5" gutterBottom fontWeight={600}>
                  Fast Performance
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Built with React, Node.js, and PostgreSQL for optimal performance.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ 
              height: '100%', 
              textAlign: 'center', 
              p: 3,
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'translateY(-8px)',
                boxShadow: '0 12px 30px rgba(0,0,0,0.15)',
              },
            }}>
              <CardContent>
                <Security sx={{ 
                  fontSize: 60, 
                  color: 'primary.main', 
                  mb: 2 
                }} />
                <Typography variant="h5" gutterBottom fontWeight={600}>
                  Secure Payments
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Integrated with Stripe for secure and reliable payment processing.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default HomePage;