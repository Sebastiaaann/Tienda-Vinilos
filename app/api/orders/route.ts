import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/db';
import { resend } from '@/lib/resend';
import OrderConfirmationEmail from '@/emails/order-confirmation';

// Schema validation for the API
const orderSchema = z.object({
  customer: z.object({
    email: z.string().email(),
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    phone: z.string().min(1),
    createAccount: z.boolean().optional(),
  }),
  shipping: z.object({
    street: z.string().min(1),
    number: z.string().min(1),
    apartment: z.string().optional(),
    region: z.string().min(1),
    city: z.string().min(1),
    comuna: z.string().min(1),
    zipCode: z.string().optional(),
  }),
  payment: z.object({
    method: z.enum(['webpay', 'mercadopago', 'flow', 'transfer']),
  }),
  items: z.array(z.object({
    id: z.string(),
    name: z.string(),
    price: z.number(),
    quantity: z.number(),
    image: z.string().optional(),
    artist: z.string().optional(),
    category: z.string().optional(),
  })),
  total: z.number(),
  subtotal: z.number().optional(),
  shippingCost: z.number().optional(),
});

// Generate unique order number
async function generateOrderNumber(): Promise<string> {
  const date = new Date();
  const dateStr = date.toISOString().slice(0, 10).replace(/-/g, '');
  
  // Get count of orders today
  const startOfDay = new Date(date.setHours(0, 0, 0, 0));
  const endOfDay = new Date(date.setHours(23, 59, 59, 999));
  
  const todayCount = await prisma.order.count({
    where: {
      createdAt: {
        gte: startOfDay,
        lte: endOfDay,
      },
    },
  });

  const sequential = String(todayCount + 1).padStart(5, '0');
  return `ORD-${dateStr}-${sequential}`;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate request body
    const validatedData = orderSchema.parse(body);

    // Calculate totals
    const subtotal = validatedData.subtotal || validatedData.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const shippingCost = validatedData.shippingCost || (subtotal >= 50000 ? 0 : 5000);
    const tax = Math.round(subtotal * 0.19); // 19% IVA
    const total = subtotal + shippingCost;

    // Generate unique order number
    const orderNumber = await generateOrderNumber();

    // Create address
    const address = await prisma.address.create({
      data: {
        street: validatedData.shipping.street,
        number: validatedData.shipping.number,
        apartment: validatedData.shipping.apartment,
        region: validatedData.shipping.region,
        city: validatedData.shipping.city,
        comuna: validatedData.shipping.comuna,
        zipCode: validatedData.shipping.zipCode,
      },
    });

    // Create order with items
    const order = await prisma.order.create({
      data: {
        orderNumber,
        customerEmail: validatedData.customer.email,
        customerName: `${validatedData.customer.firstName} ${validatedData.customer.lastName}`,
        customerPhone: validatedData.customer.phone,
        addressId: address.id,
        paymentMethod: validatedData.payment.method,
        subtotal,
        shipping: shippingCost,
        tax,
        total,
        status: 'PENDING',
        items: {
          create: validatedData.items.map(item => ({
            productId: item.id,
            productName: item.name,
            quantity: item.quantity,
            price: item.price,
            imageUrl: item.image,
            artist: item.artist,
            category: item.category,
          })),
        },
      },
      include: {
        items: true,
        address: true,
      },
    });

    // Send confirmation email
    if (resend) {
      try {
        await resend.emails.send({
          from: 'Tienda de Vinilos <no-reply@tiendavinilos.cl>',
          to: [validatedData.customer.email],
          subject: `Orden confirmada #${orderNumber}`,
          react: OrderConfirmationEmail({
            customerName: validatedData.customer.firstName,
            orderNumber,
            orderDate: new Date().toLocaleDateString('es-CL', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            }),
            items: order.items.map(item => ({
              id: item.id,
              productName: item.productName,
              artist: item.artist || undefined,
              quantity: item.quantity,
              price: item.price,
              imageUrl: item.imageUrl || undefined,
            })),
            subtotal,
            shipping: shippingCost,
            tax,
            total,
            shippingAddress: {
              street: address.street,
              number: address.number,
              apartment: address.apartment || undefined,
              region: address.region,
              city: address.city,
              comuna: address.comuna,
              zipCode: address.zipCode || undefined,
            },
          }),
        });
      } catch (emailError) {
        console.error('Error sending confirmation email:', emailError);
        // Don't fail the order if email fails
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Orden creada exitosamente',
      orderId: orderNumber,
      orderNumber,
    }, { status: 201 });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        success: false,
        message: 'Datos de orden inválidos',
        errors: error.issues,
      }, { status: 400 });
    }

    console.error('Error creating order:', error);
    return NextResponse.json({
      success: false,
      message: 'Error al procesar la orden',
    }, { status: 500 });
  }
}
