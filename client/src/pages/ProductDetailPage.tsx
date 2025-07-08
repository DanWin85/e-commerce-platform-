import React from 'react';
import { Box, Container, Typography } from '@mui/material';

const ProductDetailPage: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Product Details
      </Typography>
      <Typography variant="body1">
        Product detail page coming soon!
      </Typography>
    </Container>
  );
};

export default ProductDetailPage;