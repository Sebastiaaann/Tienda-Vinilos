import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { z } from 'zod';

const updateOrderSchema = z.object({
  status: z.enum(['PENDING', 'CONFIRMED', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED']),
});

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const orderId = params.id;
    const body = await request.json();

    // Validate request body
    const validatedData = updateOrderSchema.parse(body);

    // Update order status
    const order = await prisma.order.update({
      where: {
        orderNumber: orderId,
      },
      data: {
        status: validatedData.status,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Estado de orden actualizado',
      order,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        success: false,
        message: 'Datos inválidos',
        errors: error.issues,
      }, { status: 400 });
    }

    console.error('Error updating order:', error);
    return NextResponse.json({
      success: false,
      message: 'Error al actualizar orden',
    }, { status: 500 });
  }
}
