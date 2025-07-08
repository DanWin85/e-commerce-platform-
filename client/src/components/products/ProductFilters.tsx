import React from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Chip,
  Typography,
} from '@mui/material';
import { Search } from '@mui/icons-material';
import type { Category } from '../../types';

interface ProductFiltersProps {
  categories: Category[];
  selectedCategory: string;
  searchQuery: string;
  sortBy: string;
  onCategoryChange: (category: string) => void;
  onSearchChange: (search: string) => void;
  onSortChange: (sort: string) => void;
}

const ProductFilters: React.FC<ProductFiltersProps> = ({
  categories,
  selectedCategory,
  searchQuery,
  sortBy,
  onCategoryChange,
  onSearchChange,
  onSortChange,
}) => {
  return (
    <Box sx={{ mb: 4 }}>
      {/* Search and Filters Row */}
      <Box sx={{ 
        display: 'flex', 
        flexDirection: { xs: 'column', md: 'row' },
        gap: 2, 
        mb: 3,
        alignItems: { md: 'center' }
      }}>
        {/* Search */}
        <TextField
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          InputProps={{
            startAdornment: <Search sx={{ color: 'text.secondary', mr: 1 }} />,
          }}
          sx={{ flex: 1, maxWidth: { md: 400 } }}
        />

        {/* Category Filter */}
        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>Category</InputLabel>
          <Select
            value={selectedCategory}
            label="Category"
            onChange={(e) => onCategoryChange(e.target.value)}
          >
            <MenuItem value="">All Categories</MenuItem>
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.slug}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Sort By */}
        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>Sort By</InputLabel>
          <Select
            value={sortBy}
            label="Sort By"
            onChange={(e) => onSortChange(e.target.value)}
          >
            <MenuItem value="newest">Newest First</MenuItem>
            <MenuItem value="price-low">Price: Low to High</MenuItem>
            <MenuItem value="price-high">Price: High to Low</MenuItem>
            <MenuItem value="name">Name A-Z</MenuItem>
            <MenuItem value="rating">Highest Rated</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Active Filters */}
      {(selectedCategory || searchQuery) && (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, alignItems: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            Active filters:
          </Typography>
          {selectedCategory && (
            <Chip
              label={`Category: ${categories.find(c => c.slug === selectedCategory)?.name}`}
              onDelete={() => onCategoryChange('')}
              size="small"
              variant="outlined"
            />
          )}
          {searchQuery && (
            <Chip
              label={`Search: "${searchQuery}"`}
              onDelete={() => onSearchChange('')}
              size="small"
              variant="outlined"
            />
          )}
        </Box>
      )}
    </Box>
  );
};

export default ProductFilters;