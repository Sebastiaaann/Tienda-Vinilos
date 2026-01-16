import { Order, OrderStatus } from '@/types/order';
import { Product } from '@/types/product';

// Generate mock orders with realistic data
export function generateMockOrders(count: number): Order[] {
  const statuses: OrderStatus[] = ['PENDING', 'CONFIRMED', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'];
  const names = [
    'Juan Pérez', 'María González', 'Carlos Silva', 'Ana Martínez',
    'Pedro Rodríguez', 'Sofía López', 'Diego Fernández', 'Valentina Muñoz',
    'Matías Torres', 'Isidora Castro'
  ];
  const products = [
    { name: 'Dark Side of the Moon', category: 'Rock', price: 25990 },
    { name: 'Abbey Road', category: 'Rock', price: 29990 },
    { name: 'Random Access Memories', category: 'Electrónica', price: 32990 },
    { name: 'Nevermind', category: 'Rock', price: 24990 },
    { name: 'OK Computer', category: 'Alternative', price: 27990 },
    { name: 'Kind of Blue', category: 'Jazz', price: 22990 },
    { name: 'Thriller', category: 'Pop', price: 31990 },
    { name: 'The Velvet Underground & Nico', category: 'Rock', price: 26990 }
  ];

  const orders: Order[] = [];
  const now = new Date();

  for (let i = 0; i < count; i++) {
    const daysAgo = Math.floor(Math.random() * 30); // Random day in last 30 days
    const createdAt = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000);
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    
    // Only paid orders have paidAt date
    const isPaid = status !== 'PENDING' && status !== 'CANCELLED';
    const paidAt = isPaid ? new Date(createdAt.getTime() + Math.random() * 2 * 60 * 60 * 1000).toISOString() : undefined;

    // Generate order items (1-3 items per order)
    const itemCount = Math.floor(Math.random() * 3) + 1;
    const items = Array.from({ length: itemCount }).map((_, j) => {
      const product = products[Math.floor(Math.random() * products.length)];
      return {
        id: `item-${i}-${j}`,
        productId: `prod-${Math.floor(Math.random() * 50) + 1}`,
        productName: product.name,
        quantity: Math.floor(Math.random() * 2) + 1,
        price: product.price,
        category: product.category
      };
    });

    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const customerName = names[Math.floor(Math.random() * names.length)];

    orders.push({
      id: `order-${i + 1}`,
      orderNumber: `ORD-${String(i + 1).padStart(5, '0')}`,
      customerId: `cust-${Math.floor(Math.random() * 100) + 1}`,
      customerName,
      customerEmail: `${customerName.toLowerCase().replace(' ', '.')}@ejemplo.cl`,
      total,
      status,
      createdAt: createdAt.toISOString(),
      paidAt,
      items,
      shipping: {
        street: 'Av. Libertador Bernardo O\'Higgins',
        number: String(Math.floor(Math.random() * 1000) + 1),
        region: 'Metropolitana',
        city: 'Santiago',
        comuna: 'Santiago Centro'
      }
    });
  }

  // Sort by date descending (newest first)
  return orders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

// Generate mock products with stock and minStock
export function generateMockProductsWithStock(count: number): (Product & { minStock: number })[] {
  const categories = ['Rock', 'Jazz', 'Pop', 'Electrónica', 'Alternative', 'Clásica'];
  const artists = ['Pink Floyd', 'The Beatles', 'Daft Punk', 'Miles Davis', 'Radiohead', 'Nirvana'];
  const albums = [
    'Dark Side of the Moon', 'Abbey Road', 'Random Access Memories',
    'Kind of Blue', 'OK Computer', 'Nevermind'
  ];

  return Array.from({ length: count }).map((_, i) => {
    const stock = Math.floor(Math.random() * 25);
    const minStock = 5;
    const name = albums[i % albums.length];
    const slug = name.toLowerCase().replace(/\s+/g, '-') + `-${i + 1}`;
    
    return {
      id: `prod-${i + 1}`,
      sku: `SKU-${String(i + 1).padStart(6, '0')}`,
      slug: slug,
      name: name,
      artist: artists[i % artists.length],
      description: 'Classic album in excellent condition',
      price: (Math.floor(Math.random() * 40) + 15) * 1000 + 990,
      image: '/placeholder-vinyl.jpg',
      category: categories[i % categories.length],
      format: Math.random() > 0.3 ? 'VINYL_LP' : 'CD_ALBUM',
      condition: Math.random() > 0.5 ? 'SEALED' : 'NEAR_MINT',
      stock,
      minStock,
      releaseYear: 1970 + Math.floor(Math.random() * 50),
      createdAt: new Date().toISOString()
    };
  });
}

// Generate mock users
export function generateMockUsers(count: number) {
  const now = new Date();
  return Array.from({ length: count }).map((_, i) => {
    const daysAgo = Math.floor(Math.random() * 90); // Last 90 days
    return {
      id: `user-${i + 1}`,
      email: `user${i + 1}@ejemplo.cl`,
      name: `Usuario ${i + 1}`,
      createdAt: new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000).toISOString()
    };
  });
}
