export type OrderStatus = 'PENDING' | 'CONFIRMED' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';

export interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  total: number;
  status: OrderStatus;
  createdAt: string;
  paidAt?: string;
  items: OrderItem[];
  shipping: ShippingAddress;
}

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  category: string;
}

export interface ShippingAddress {
  street: string;
  number: string;
  apartment?: string;
  region: string;
  city: string;
  comuna: string;
  zipCode?: string;
}

export interface DashboardStats {
  salesToday: number;
  pendingOrders: number;
  lowStockProducts: number;
  newCustomers: number;
  salesLast7Days: {
    date: string;
    total: number;
  }[];
  topProducts: {
    id: string;
    name: string;
    category: string;
    unitsSold: number;
    revenue: number;
  }[];
  recentOrders: {
    id: string;
    orderNumber: string;
    customerName: string;
    date: string;
    total: number;
    status: OrderStatus;
  }[];
}
