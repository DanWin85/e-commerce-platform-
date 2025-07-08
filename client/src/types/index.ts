export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    sku: string;
    inventory: number;
    images: string[];
    brand?: string;
    specifications?: Record<string, any>;
    isActive: boolean;
    categoryId: string;
    averageRating: number;
    totalReviews: number;
    createdAt: string;
    updatedAt: string;
    category: Category;
    reviews?: Review[];
  }
  
  export interface Category {
    id: string;
    name: string;
    description?: string;
    slug: string;
    isActive: boolean;
    parentId?: string;
    parent?: Category;
    children?: Category[];
    products?: Product[];
  }
  
  export interface Review {
    id: string;
    userId: string;
    productId: string;
    rating: number;
    title?: string;
    comment?: string;
    isVerified: boolean;
    createdAt: string;
    updatedAt: string;
    user: {
      firstName: string;
      lastName: string;
    };
  }
  
  export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: 'CUSTOMER' | 'ADMIN';
    phone?: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface CartItem {
    productId: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
    maxQuantity: number;
  }
  
  export interface Order {
    id: string;
    userId: string;
    status: 'PENDING' | 'CONFIRMED' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
    totalAmount: number;
    shippingCost: number;
    taxAmount: number;
    paymentIntentId?: string;
    paymentStatus: 'PENDING' | 'COMPLETED' | 'FAILED' | 'REFUNDED';
    shippingAddressId: string;
    notes?: string;
    trackingNumber?: string;
    estimatedDelivery?: string;
    createdAt: string;
    updatedAt: string;
    items: OrderItem[];
    user: User;
    shippingAddress: Address;
  }
  
  export interface OrderItem {
    id: string;
    orderId: string;
    productId: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
    product: Product;
  }
  
  export interface Address {
    id: string;
    userId: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    isDefault: boolean;
  }
  
  export interface CustomerInfo {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
  }
  
  export interface ShippingAddress {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  }
  
  // API Response Types
  export interface ApiResponse<T> {
    success: boolean;
    message?: string;
    data?: T;
    error?: string;
  }
  
  export interface PaginationInfo {
    currentPage: number;
    totalPages: number;
    totalCount: number;
    hasNextPage: boolean;
    hasPrevPage?: boolean;
  }
  
  export interface ProductsResponse {
    products: Product[];
    pagination: PaginationInfo;
  }
  
  export interface CategoriesResponse {
    categories: Category[];
  }
  
  // Form Types
  export interface ProductFilters {
    category?: string;
    search?: string;
    page?: number;
    limit?: number;
    minPrice?: number;
    maxPrice?: number;
    brand?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }