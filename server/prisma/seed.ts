import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 12);
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@ecommerce.com' },
    update: {},
    create: {
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@ecommerce.com',
      password: hashedPassword,
      role: 'ADMIN',
    },
  });

  // Create test customer
  const customerPassword = await bcrypt.hash('customer123', 12);
  const customer = await prisma.user.upsert({
    where: { email: 'customer@test.com' },
    update: {},
    create: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'customer@test.com',
      password: customerPassword,
      role: 'CUSTOMER',
      phone: '+1234567890',
    },
  });

  // Create categories
  const electronics = await prisma.category.upsert({
    where: { slug: 'electronics' },
    update: {},
    create: {
      name: 'Electronics',
      description: 'Electronic devices and gadgets',
      slug: 'electronics',
    },
  });

  const clothing = await prisma.category.upsert({
    where: { slug: 'clothing' },
    update: {},
    create: {
      name: 'Clothing',
      description: 'Fashion and apparel',
      slug: 'clothing',
    },
  });

  const books = await prisma.category.upsert({
    where: { slug: 'books' },
    update: {},
    create: {
      name: 'Books',
      description: 'Books and literature',
      slug: 'books',
    },
  });

  // Create sample products
  const products = [
    {
      name: 'iPhone 15 Pro',
      description: 'Latest iPhone with Pro features and amazing camera system. Experience cutting-edge technology with advanced photography capabilities.',
      price: 999.99,
      sku: 'IPHONE-15-PRO-001',
      inventory: 50,
      images: [
        'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500',
        'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500'
      ],
      brand: 'Apple',
      categoryId: electronics.id,
      averageRating: 4.8,
      totalReviews: 156,
      specifications: {
        storage: '128GB',
        color: 'Space Black',
        display: '6.1 inch Super Retina XDR',
        camera: '48MP Main + 12MP Ultra Wide + 12MP Telephoto',
        battery: 'Up to 23 hours video playback'
      },
    },
    {
      name: 'MacBook Air M2',
      description: 'Powerful and efficient laptop with M2 chip. Perfect for professionals and creatives who need portable performance.',
      price: 1199.99,
      sku: 'MACBOOK-AIR-M2-001',
      inventory: 25,
      images: [
        'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500',
        'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500'
      ],
      brand: 'Apple',
      categoryId: electronics.id,
      averageRating: 4.9,
      totalReviews: 89,
      specifications: {
        processor: 'Apple M2 chip',
        memory: '8GB unified memory',
        storage: '256GB SSD',
        display: '13.6-inch Liquid Retina',
        battery: 'Up to 18 hours'
      },
    },
    {
      name: 'Samsung Galaxy S24 Ultra',
      description: 'Premium Android smartphone with S Pen and advanced AI features. Professional photography and productivity in your pocket.',
      price: 1199.99,
      sku: 'SAMSUNG-S24-ULTRA-001',
      inventory: 30,
      images: [
        'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500',
        'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=500'
      ],
      brand: 'Samsung',
      categoryId: electronics.id,
      averageRating: 4.7,
      totalReviews: 203,
      specifications: {
        storage: '256GB',
        display: '6.8 inch Dynamic AMOLED 2X',
        camera: '200MP Main + 50MP Periscope Telephoto',
        battery: '5000mAh',
        spen: 'Built-in S Pen'
      },
    },
    {
      name: 'Classic Cotton T-Shirt',
      description: 'Comfortable 100% cotton t-shirt in various colors. Perfect for everyday wear with a soft, breathable fabric.',
      price: 29.99,
      sku: 'TSHIRT-COTTON-001',
      inventory: 100,
      images: [
        'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500',
        'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=500'
      ],
      brand: 'BasicWear',
      categoryId: clothing.id,
      averageRating: 4.4,
      totalReviews: 67,
      specifications: {
        material: '100% Cotton',
        fit: 'Regular',
        sizes: 'XS, S, M, L, XL, XXL',
        care: 'Machine wash cold'
      },
    },
    {
      name: 'Premium Denim Jeans',
      description: 'High-quality denim jeans with perfect fit and durability. Crafted from premium materials for comfort and style.',
      price: 89.99,
      sku: 'JEANS-DENIM-001',
      inventory: 75,
      images: [
        'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500',
        'https://images.unsplash.com/photo-1565084888279-aca607ecce0c?w=500'
      ],
      brand: 'DenimCo',
      categoryId: clothing.id,
      averageRating: 4.6,
      totalReviews: 124,
      specifications: {
        material: '98% Cotton, 2% Elastane',
        fit: 'Slim Fit',
        rise: 'Mid Rise',
        length: '32 inch inseam'
      },
    },
    {
      name: 'Winter Wool Sweater',
      description: 'Cozy wool sweater perfect for cold weather. Soft, warm, and stylish for any occasion.',
      price: 79.99,
      sku: 'SWEATER-WOOL-001',
      inventory: 45,
      images: [
        'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500',
        'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500'
      ],
      brand: 'CozyWear',
      categoryId: clothing.id,
      averageRating: 4.5,
      totalReviews: 89,
      specifications: {
        material: '100% Merino Wool',
        fit: 'Regular',
        care: 'Dry clean only',
        weight: 'Medium weight'
      },
    },
    {
      name: 'JavaScript: The Good Parts',
      description: 'Essential guide to JavaScript programming by Douglas Crockford. Learn the best practices and avoid common pitfalls.',
      price: 24.99,
      sku: 'BOOK-JS-GOOD-PARTS',
      inventory: 40,
      images: [
        'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500',
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500'
      ],
      brand: "O'Reilly Media",
      categoryId: books.id,
      averageRating: 4.3,
      totalReviews: 342,
      specifications: {
        author: 'Douglas Crockford',
        pages: 176,
        language: 'English',
        publisher: "O'Reilly Media",
        isbn: '978-0596517748'
      },
    },
    {
      name: 'Clean Code: A Handbook',
      description: 'A handbook of agile software craftsmanship by Robert C. Martin. Essential reading for any serious programmer.',
      price: 34.99,
      sku: 'BOOK-CLEAN-CODE',
      inventory: 35,
      images: [
        'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=500',
        'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500'
      ],
      brand: 'Prentice Hall',
      categoryId: books.id,
      averageRating: 4.7,
      totalReviews: 278,
      specifications: {
        author: 'Robert C. Martin',
        pages: 464,
        language: 'English',
        publisher: 'Prentice Hall',
        isbn: '978-0132350884'
      },
    }
  ];

  for (const productData of products) {
    await prisma.product.upsert({
      where: { sku: productData.sku },
      update: {},
      create: productData,
    });
  }

  // Create sample address for customer
  await prisma.address.upsert({
    where: { id: 'sample-address-1' },
    update: {},
    create: {
      id: 'sample-address-1',
      userId: customer.id,
      street: '123 Main Street',
      city: 'Sydney',
      state: 'NSW',
      zipCode: '2000',
      country: 'Australia',
      isDefault: true,
    },
  });

  console.log('✅ Database seeded successfully!');
  console.log(`📧 Admin login: admin@ecommerce.com / admin123`);
  console.log(`👤 Customer login: customer@test.com / customer123`);
  console.log(`📦 Created ${products.length} products`);
  console.log(`📂 Created 3 categories`);
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });