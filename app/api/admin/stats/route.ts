import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';
import { generateMockOrders, generateMockProductsWithStock, generateMockUsers } from '@/lib/mockData';
import { DashboardStats } from '@/types/order';

// Mark this route as dynamic to prevent static generation
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Check admin authentication
    await requireAdmin();

    // Generate mock data
    const orders = generateMockOrders(100);
    const products = generateMockProductsWithStock(50);
    const users = generateMockUsers(150);

    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    // Calculate today's sales (sum of paid orders from today)
    const salesToday = orders
      .filter(order => {
        if (!order.paidAt) return false;
        const paidDate = new Date(order.paidAt);
        return paidDate >= todayStart;
      })
      .reduce((sum, order) => sum + order.total, 0);

    // Count pending orders (PENDING or CONFIRMED status)
    const pendingOrders = orders.filter(
      order => order.status === 'PENDING' || order.status === 'CONFIRMED'
    ).length;

    // Count low stock products (stock <= minStock)
    const lowStockProducts = products.filter(
      product => product.stock <= product.minStock
    ).length;

    // Count new customers this month
    const newCustomers = users.filter(user => {
      const createdDate = new Date(user.createdAt);
      return createdDate >= monthStart;
    }).length;

    // Sales last 7 days
    const salesLast7Days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      const dateStart = new Date(date.getFullYear(), date.getMonth(), date.getDate());
      const dateEnd = new Date(dateStart.getTime() + 24 * 60 * 60 * 1000);

      const dailyTotal = orders
        .filter(order => {
          if (!order.paidAt) return false;
          const paidDate = new Date(order.paidAt);
          return paidDate >= dateStart && paidDate < dateEnd;
        })
        .reduce((sum, order) => sum + order.total, 0);

      salesLast7Days.push({
        date: dateStart.toISOString().split('T')[0],
        total: dailyTotal
      });
    }

    // Top 5 products (by units sold and revenue)
    const productSales = new Map<string, { 
      id: string; 
      name: string; 
      category: string; 
      unitsSold: number; 
      revenue: number 
    }>();

    // Aggregate sales from order items
    orders.forEach(order => {
      order.items.forEach(item => {
        const existing = productSales.get(item.productId);
        if (existing) {
          existing.unitsSold += item.quantity;
          existing.revenue += item.price * item.quantity;
        } else {
          productSales.set(item.productId, {
            id: item.productId,
            name: item.productName,
            category: item.category,
            unitsSold: item.quantity,
            revenue: item.price * item.quantity
          });
        }
      });
    });

    const topProducts = Array.from(productSales.values())
      .sort((a, b) => b.unitsSold - a.unitsSold)
      .slice(0, 5);

    // Recent 5 orders
    const recentOrders = orders.slice(0, 5).map(order => ({
      id: order.id,
      orderNumber: order.orderNumber,
      customerName: order.customerName,
      date: order.createdAt,
      total: order.total,
      status: order.status
    }));

    const stats: DashboardStats = {
      salesToday,
      pendingOrders,
      lowStockProducts,
      newCustomers,
      salesLast7Days,
      topProducts,
      recentOrders
    };

    return NextResponse.json(stats);

  } catch (error) {
    if (error instanceof Error) {
      if (error.message === 'Unauthorized') {
        return NextResponse.json(
          { error: 'No autorizado' },
          { status: 401 }
        );
      }
      if (error.message.includes('Forbidden')) {
        return NextResponse.json(
          { error: 'Acceso denegado - Se requiere rol de administrador' },
          { status: 403 }
        );
      }
    }

    console.error('Error fetching admin stats:', error);
    return NextResponse.json(
      { error: 'Error al obtener estadísticas' },
      { status: 500 }
    );
  }
}
