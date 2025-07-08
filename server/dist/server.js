"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const database_1 = require("./config/database");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
// Middleware
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true
}));
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Health check
app.get('/health', async (req, res) => {
    try {
        await database_1.prisma.$queryRaw `SELECT 1`;
        res.json({
            success: true,
            message: 'E-commerce Demo API is running!',
            timestamp: new Date().toISOString(),
            database: 'Connected to Neon PostgreSQL',
            mode: 'Portfolio Demo Mode'
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Database connection failed',
            error: error.message || 'Unknown error'
        });
    }
});
// Get all products (public access)
app.get('/api/products', async (req, res) => {
    try {
        const { category, search, page = 1, limit = 12 } = req.query;
        const skip = (Number(page) - 1) * Number(limit);
        const where = { isActive: true };
        if (category) {
            where.category = { slug: category };
        }
        if (search) {
            where.OR = [
                { name: { contains: search, mode: 'insensitive' } },
                { description: { contains: search, mode: 'insensitive' } },
            ];
        }
        const [products, totalCount] = await Promise.all([
            database_1.prisma.product.findMany({
                where,
                include: { category: true },
                skip,
                take: Number(limit),
                orderBy: { createdAt: 'desc' }
            }),
            database_1.prisma.product.count({ where })
        ]);
        res.json({
            success: true,
            products,
            pagination: {
                currentPage: Number(page),
                totalPages: Math.ceil(totalCount / Number(limit)),
                totalCount,
                hasNextPage: Number(page) < Math.ceil(totalCount / Number(limit)),
            }
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch products',
            error: error.message || 'Unknown error'
        });
    }
});
// Get single product (public access)
app.get('/api/products/:id', async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await database_1.prisma.product.findUnique({
            where: { id: productId, isActive: true },
            include: {
                category: true,
                reviews: {
                    include: {
                        user: {
                            select: { firstName: true, lastName: true }
                        }
                    },
                    orderBy: { createdAt: 'desc' },
                    take: 10
                }
            }
        });
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }
        res.json({
            success: true,
            product
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch product',
            error: error.message || 'Unknown error'
        });
    }
});
// Get categories (public access)
app.get('/api/categories', async (req, res) => {
    try {
        const categories = await database_1.prisma.category.findMany({
            where: { isActive: true },
            orderBy: { name: 'asc' }
        });
        res.json({
            success: true,
            categories
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch categories',
            error: error.message || 'Unknown error'
        });
    }
});
// Create order (guest checkout)
app.post('/api/orders', async (req, res) => {
    try {
        const { items, customerInfo, shippingAddress, paymentIntentId } = req.body;
        // Validate required fields
        if (!items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Items are required'
            });
        }
        if (!customerInfo || !customerInfo.email) {
            return res.status(400).json({
                success: false,
                message: 'Customer info with email is required'
            });
        }
        // Calculate total
        const productIds = items.map((item) => item.productId);
        const products = await database_1.prisma.product.findMany({
            where: { id: { in: productIds } }
        });
        let totalAmount = 0;
        const orderItems = items.map((item) => {
            const product = products.find(p => p.id === item.productId);
            if (!product)
                throw new Error(`Product ${item.productId} not found`);
            const itemTotal = Number(product.price) * item.quantity;
            totalAmount += itemTotal;
            return {
                productId: item.productId,
                name: product.name,
                price: product.price,
                quantity: item.quantity,
                image: product.images[0] || ''
            };
        });
        // For demo purposes, create a simple order record
        const order = await database_1.prisma.order.create({
            data: {
                userId: 'demo-user',
                status: 'PENDING',
                totalAmount,
                shippingCost: 10.00,
                taxAmount: totalAmount * 0.1,
                paymentIntentId,
                paymentStatus: 'PENDING',
                shippingAddressId: 'demo-address',
                notes: `Guest order - ${customerInfo.email}`,
                items: {
                    create: orderItems
                }
            },
            include: {
                items: true
            }
        });
        res.status(201).json({
            success: true,
            message: 'Order created successfully',
            order,
            orderNumber: order.id.slice(-8).toUpperCase()
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to create order',
            error: error.message || 'Unknown error'
        });
    }
});
// Simple admin login (for portfolio demo)
app.post('/api/admin/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (email === 'admin@demo.com' && password === 'demo123') {
            res.json({
                success: true,
                message: 'Admin logged in',
                token: 'demo-admin-token',
                user: { role: 'ADMIN', email: 'admin@demo.com' }
            });
        }
        else {
            res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Login failed',
            error: error.message || 'Unknown error'
        });
    }
});
// Demo stats
app.get('/api/stats', async (req, res) => {
    try {
        const [userCount, productCount, orderCount, categoryCount] = await Promise.all([
            database_1.prisma.user.count(),
            database_1.prisma.product.count(),
            database_1.prisma.order.count(),
            database_1.prisma.category.count(),
        ]);
        res.json({
            success: true,
            stats: {
                users: userCount,
                products: productCount,
                orders: orderCount,
                categories: categoryCount,
                lastUpdated: new Date().toISOString()
            }
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch stats',
            error: error.message || 'Unknown error'
        });
    }
});
// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: `Route ${req.originalUrl} not found`,
        availableRoutes: [
            'GET /health',
            'GET /api/products',
            'GET /api/products/:id',
            'GET /api/categories',
            'POST /api/orders',
            'GET /api/stats'
        ]
    });
});
// Error handler
app.use((err, req, res, next) => {
    console.error('Error:', err.message);
    res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
    });
});
// Start server
async function startServer() {
    try {
        await (0, database_1.connectDB)();
        app.listen(PORT, () => {
            console.log(`🚀 E-commerce Demo API running on http://localhost:${PORT}`);
            console.log(`📊 Portfolio Mode: Easy demo access`);
            console.log(`🛒 Products: http://localhost:${PORT}/api/products`);
            console.log(`📈 Stats: http://localhost:${PORT}/api/stats`);
        });
    }
    catch (error) {
        console.error('❌ Failed to start server:', error);
        process.exit(1);
    }
}
startServer();
exports.default = app;
//# sourceMappingURL=server.js.map