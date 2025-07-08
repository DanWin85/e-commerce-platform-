import React from 'react';
import { Box, Container, Typography } from '@mui/material';

const CheckoutPage: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Checkout
      </Typography>
      <Typography variant="body1">
        Checkout page coming soon!
      </Typography>
    </Container>
  );
};

export default CheckoutPage;