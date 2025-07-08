import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Button,
  Chip,
  Rating,
} from '@mui/material';
import { ShoppingCart, Visibility } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import type { Product } from '../../types';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (productId: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const navigate = useNavigate();

  const handleViewProduct = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/products/${product.id}`);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart(product.id);
    }
  };

  return (
    <Card
      sx={{
        height: 500, // Slightly taller for buttons
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        borderRadius: 2,
        overflow: 'hidden',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: '0 12px 30px rgba(0,0,0,0.15)',
        },
      }}
      onClick={handleViewProduct}
    >
      {/* Product Image - Fixed height */}
      <CardMedia
        component="img"
        height="240"
        image={product.images[0] || 'https://via.placeholder.com/400x240?text=No+Image'}
        alt={product.name}
        sx={{
          objectFit: 'cover',
          backgroundColor: '#f5f5f5',
        }}
      />

      <CardContent sx={{ 
        flexGrow: 1, 
        display: 'flex', 
        flexDirection: 'column',
        p: 2.5,
        '&:last-child': { pb: 2.5 }
      }}>
        {/* Category Chip */}
        <Box sx={{ mb: 1.5 }}>
          <Chip
            label={product.category.name}
            size="small"
            variant="outlined"
            sx={{ 
              fontSize: '0.75rem', 
              height: 22,
              fontWeight: 500,
            }}
          />
        </Box>

        {/* Product Name - Fixed height */}
        <Typography
          variant="h6"
          component="h3"
          sx={{
            fontWeight: 600,
            fontSize: '1.15rem',
            lineHeight: 1.3,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            height: '3rem', // Slightly more height
            mb: 1,
          }}
        >
          {product.name}
        </Typography>

        {/* Brand - Fixed height */}
        <Box sx={{ height: '1.5rem', mb: 1 }}>
          {product.brand && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ 
                fontSize: '0.9rem',
                fontWeight: 500,
              }}
            >
              {product.brand}
            </Typography>
          )}
        </Box>

        {/* Rating - Fixed height */}
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 1, 
          mb: 1.5,
          height: '1.5rem'
        }}>
          <Rating
            value={Number(product.averageRating)}
            readOnly
            size="small"
            precision={0.5}
          />
          <Typography variant="caption" color="text.secondary">
            ({product.totalReviews})
          </Typography>
        </Box>

        {/* Description - Fixed height with ellipsis */}
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            fontSize: '0.9rem',
            lineHeight: 1.4,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            height: '3.8rem', // Fixed height for 3 lines
            mb: 2,
          }}
        >
          {product.description}
        </Typography>

        {/* Price and Actions - Pushed to bottom */}
        <Box sx={{ mt: 'auto' }}>
          <Typography
            variant="h6"
            color="primary"
            fontWeight={700}
            sx={{ mb: 2, fontSize: '1.3rem' }}
          >
            ${Number(product.price).toFixed(2)}
          </Typography>

          {/* Action Buttons */}
          <Box sx={{ display: 'flex', gap: 1.5 }}>
            <Button
              variant="outlined"
              size="medium"
              startIcon={<Visibility />}
              onClick={handleViewProduct}
              sx={{ 
                flex: 1, 
                textTransform: 'none',
                fontSize: '0.875rem',
                py: 1,
                fontWeight: 500,
                borderRadius: 1.5,
              }}
            >
              View
            </Button>
            <Button
              variant="contained"
              size="medium"
              startIcon={<ShoppingCart />}
              onClick={handleAddToCart}
              disabled={product.inventory === 0}
              sx={{ 
                flex: 1, 
                textTransform: 'none',
                fontSize: '0.875rem',
                py: 1,
                fontWeight: 500,
                borderRadius: 1.5,
              }}
            >
              {product.inventory === 0 ? 'Out of Stock' : 'Add to Cart'}
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductCard;