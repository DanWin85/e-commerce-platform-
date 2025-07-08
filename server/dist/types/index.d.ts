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
    averageRating: number;
    totalReviews: number;
    category: Category;
    createdAt: string;
    updatedAt: string;
}
export interface Category {
    id: string;
    name: string;
    description?: string;
    slug: string;
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
    status: string;
    totalAmount: number;
    shippingCost: number;
    taxAmount: number;
    items: OrderItem[];
    createdAt: string;
}
export interface OrderItem {
    id: string;
    productId: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
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
//# sourceMappingURL=index.d.ts.map