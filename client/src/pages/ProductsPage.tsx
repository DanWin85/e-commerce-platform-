import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  CircularProgress,
  Alert,
  Pagination,
  Button,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { productsApi } from '../services/api';
import ProductCard from '../components/products/ProductCard';
import ProductFilters from '../components/products/ProductFilters';
import type { Product } from '../types';

const ProductsPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const limit = 12;

  // Fetch products
  const {
    data: productsResponse,
    isLoading: productsLoading,
    error: productsError,
    refetch: refetchProducts
  } = useQuery({
    queryKey: ['products', page, selectedCategory, searchQuery, sortBy],
    queryFn: () => productsApi.getAll({
      page,
      limit,
      category: selectedCategory || undefined,
      search: searchQuery || undefined,
    }),
  });

  // Fetch categories
  const {
    data: categoriesResponse,
    isLoading: categoriesLoading,
  } = useQuery({
    queryKey: ['categories'],
    queryFn: () => productsApi.getCategories(),
  });

  const products = productsResponse?.data?.products || [];
  const pagination = productsResponse?.data?.pagination;
  const categories = categoriesResponse?.data?.categories || [];

  // Reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [selectedCategory, searchQuery, sortBy]);

  const handleAddToCart = (productId: string) => {
    // For now, just show a toast - we'll implement cart functionality later
    const product = products.find((p: Product) => p.id === productId);
    toast.success(`${product?.name} added to cart!`);
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (productsError) {
    return (
      <Container maxWidth={false} sx={{ maxWidth: '1200px !important', mx: 'auto', px: { xs: 3, md: '100px' }, py: 4 }}>
        <Alert 
          severity="error" 
          action={
            <Button color="inherit" size="small" onClick={() => refetchProducts()}>
              Retry
            </Button>
          }
        >
          Failed to load products. Please try again.
        </Alert>
      </Container>
    );
  }

  return (
    <Container 
      maxWidth={false} 
      sx={{ 
        maxWidth: '1200px !important', 
        mx: 'auto', 
        px: { xs: 3, md: '100px' }, 
        py: 4 
      }}
    >
      {/* Page Header */}
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography 
          variant="h3" 
          component="h1" 
          gutterBottom 
          fontWeight={600}
          sx={{ fontSize: { xs: '2rem', md: '3rem' } }}
        >
          Products
        </Typography>
        <Typography 
          variant="h6" 
          color="text.secondary"
          sx={{ maxWidth: 600, mx: 'auto' }}
        >
          Discover our amazing collection of products
        </Typography>
      </Box>

      {/* Filters */}
      {!categoriesLoading && (
        <ProductFilters
          categories={categories}
          selectedCategory={selectedCategory}
          searchQuery={searchQuery}
          sortBy={sortBy}
          onCategoryChange={setSelectedCategory}
          onSearchChange={setSearchQuery}
          onSortChange={setSortBy}
        />
      )}

      {/* Loading State */}
      {productsLoading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress size={48} />
        </Box>
      )}

      {/* Products Grid */}
      {!productsLoading && products.length > 0 && (
  <>
    <Grid container spacing={4} sx={{ justifyContent: 'center' }}>
      {products.map((product: Product) => (
        <Grid 
          item 
          xs={12} 
          sm={6} 
          md={4} 
          xl={3} 
          key={product.id}
          sx={{ 
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Box sx={{ width: '100%', maxWidth: 380 }}> {/* Wider max width */}
            <ProductCard
              product={product}
              onAddToCart={handleAddToCart}
            />
          </Box>
        </Grid>
      ))}
    </Grid>

          {/* Pagination */}
          {pagination && pagination.totalPages > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
              <Pagination
                count={pagination.totalPages}
                page={page}
                onChange={handlePageChange}
                color="primary"
                size="large"
                showFirstButton
                showLastButton
              />
            </Box>
          )}
        </>
      )}

      {/* No Products Found */}
      {!productsLoading && products.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h5" gutterBottom>
            No products found
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Try adjusting your filters or search terms
          </Typography>
          <Button
            variant="outlined"
            onClick={() => {
              setSelectedCategory('');
              setSearchQuery('');
              setSortBy('newest');
            }}
          >
            Clear Filters
          </Button>
        </Box>
      )}

      {/* Results Summary */}
      {!productsLoading && pagination && (
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            Showing {products.length} of {pagination.totalCount} products
            {searchQuery && ` for "${searchQuery}"`}
            {selectedCategory && ` in ${categories.find((c: { slug: string; }) => c.slug === selectedCategory)?.name}`}
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default ProductsPage;