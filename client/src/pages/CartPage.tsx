import React from 'react';
import { Box, Container, Typography } from '@mui/material';

const CartPage: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Shopping Cart
      </Typography>
      <Typography variant="body1">
        Cart page coming soon!
      </Typography>
    </Container>
  );
};

export default CartPage;