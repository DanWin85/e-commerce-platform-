import dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response, NextFunction, RequestHandler } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { connectDB, prisma } from './config/database';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:5174', // Add this for Vite
    'http://localhost:3000',  // Common React port
    process.env.CLIENT_URL || 'http://localhost:5173'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check handler
const healthHandler: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({
      success: true,
      message: 'E-commerce Demo API is running!',
      timestamp: new Date().toISOString(),
      database: 'Connected to Neon PostgreSQL',
      mode: 'Portfolio Demo Mode'
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Database connection failed',
      error: error.message || 'Unknown error'
    });
  }
};

// Products handler
const getProductsHandler: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { category, search, page = 1, limit = 12 } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const where: any = { isActive: true };
    
    if (category) {
      where.category = { slug: category as string };
    }
    
    if (search) {
      where.OR = [
        { name: { contains: search as string, mode: 'insensitive' } },
        { description: { contains: search as string, mode: 'insensitive' } },
      ];
    }

    const [products, totalCount] = await Promise.all([
      prisma.product.findMany({
        where,
        include: { category: true },
        skip,
        take: Number(limit),
        orderBy: { createdAt: 'desc' }
      }),
      prisma.product.count({ where })
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
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch products',
      error: error.message || 'Unknown error'
    });
  }
};

// Single product handler
const getProductHandler: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const productId = req.params.id;
    
    const product = await prisma.product.findUnique({
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
      res.status(404).json({
        success: false,
        message: 'Product not found'
      });
      return;
    }

    res.json({
      success: true,
      product
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch product',
      error: error.message || 'Unknown error'
    });
  }
};

// Categories handler
const getCategoriesHandler: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const categories = await prisma.category.findMany({
      where: { isActive: true },
      orderBy: { name: 'asc' }
    });

    res.json({
      success: true,
      categories
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch categories',
      error: error.message || 'Unknown error'
    });
  }
};

// Orders handler
const createOrderHandler: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { items, customerInfo, shippingAddress, paymentIntentId } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      res.status(400).json({
        success: false,
        message: 'Items are required'
      });
      return;
    }

    // Calculate total
    const productIds = items.map((item: any) => item.productId);
    const products = await prisma.product.findMany({
      where: { id: { in: productIds } }
    });

    let totalAmount = 0;
    const orderItems = items.map((item: any) => {
      const product = products.find(p => p.id === item.productId);
      if (!product) throw new Error(`Product ${item.productId} not found`);
      
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

    const order = await prisma.order.create({
      data: {
        userId: 'demo-user',
        status: 'PENDING',
        totalAmount,
        shippingCost: 10.00,
        taxAmount: totalAmount * 0.1,
        paymentIntentId,
        paymentStatus: 'PENDING',
        shippingAddressId: 'demo-address',
        notes: `Guest order - ${customerInfo?.email || 'No email'}`,
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
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to create order',
      error: error.message || 'Unknown error'
    });
  }
};

// Stats handler
const getStatsHandler: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const [userCount, productCount, orderCount, categoryCount] = await Promise.all([
      prisma.user.count(),
      prisma.product.count(),
      prisma.order.count(),
      prisma.category.count(),
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
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch stats'
    });
  }
};

// Register routes with proper handlers
app.get('/health', healthHandler);
app.get('/api/products', getProductsHandler);
app.get('/api/products/:id', getProductHandler);
app.get('/api/categories', getCategoriesHandler);
app.post('/api/orders', createOrderHandler);
app.get('/api/stats', getStatsHandler);

// 404 handler
app.use((req: Request, res: Response) => {
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
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Error:', err.message);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// Start server
async function startServer(): Promise<void> {
  try {
    await connectDB();
    
    app.listen(PORT, () => {
      console.log(`🚀 E-commerce API running on http://localhost:${PORT}`);
      console.log(`🛒 Products: http://localhost:${PORT}/api/products`);
      console.log(`📊 Stats: http://localhost:${PORT}/api/stats`);
      console.log(`✅ TypeScript compilation successful`);
    });
  } catch (error: any) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

startServer();

export default app;