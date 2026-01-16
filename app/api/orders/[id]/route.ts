import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const orderId = params.id;

    // Find order by orderNumber
    const order = await prisma.order.findUnique({
      where: {
        orderNumber: orderId,
      },
      include: {
        items: true,
        address: true,
        user: true,
      },
    });

    if (!order) {
      return NextResponse.json({
        success: false,
        message: 'Orden no encontrada',
      }, { status: 404 });
    }

    // Return order details
    return NextResponse.json({
      success: true,
      order: {
        id: order.id,
        orderNumber: order.orderNumber,
        status: order.status,
        customerName: order.customerName,
        customerEmail: order.customerEmail,
        customerPhone: order.customerPhone,
        subtotal: order.subtotal,
        shipping: order.shipping,
        tax: order.tax,
        total: order.total,
        paymentMethod: order.paymentMethod,
        createdAt: order.createdAt,
        updatedAt: order.updatedAt,
        paidAt: order.paidAt,
        items: order.items.map(item => ({
          id: item.id,
          productId: item.productId,
          productName: item.productName,
          artist: item.artist,
          category: item.category,
          quantity: item.quantity,
          price: item.price,
          imageUrl: item.imageUrl,
        })),
        address: {
          street: order.address.street,
          number: order.address.number,
          apartment: order.address.apartment,
          region: order.address.region,
          city: order.address.city,
          comuna: order.address.comuna,
          zipCode: order.address.zipCode,
        },
      },
    });
  } catch (error) {
    console.error('Error fetching order:', error);
    return NextResponse.json({
      success: false,
      message: 'Error al obtener la orden',
    }, { status: 500 });
  }
}
