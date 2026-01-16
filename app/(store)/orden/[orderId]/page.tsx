"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, Package, ArrowRight, Home, Loader2, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn, formatPrice } from "@/lib/utils";

interface OrderItem {
  id: string;
  productName: string;
  artist?: string;
  quantity: number;
  price: number;
  imageUrl?: string;
}

interface Order {
  orderNumber: string;
  status: string;
  customerName: string;
  customerEmail: string;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  createdAt: string;
  items: OrderItem[];
  address: {
    street: string;
    number: string;
    apartment?: string;
    comuna: string;
    city: string;
    region: string;
  };
}

export default function OrderConfirmationPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = params.orderId as string;
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch(`/api/orders/${orderId}`);
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.message || 'Error al cargar la orden');
        }

        setOrder(data.order);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
      } finally {
        setLoading(false);
      }
    };

    if (orderId) {
      fetchOrder();
    }
  }, [orderId]);

  if (loading) {
    return (
      <div className="container max-w-2xl mx-auto px-4 py-16 md:py-24">
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
          <p className="text-muted-foreground">Cargando orden...</p>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="container max-w-2xl mx-auto px-4 py-16 md:py-24">
        <Card className="border-destructive/20">
          <CardHeader className="text-center">
            <AlertTriangle className="h-12 w-12 text-destructive mx-auto mb-4" />
            <CardTitle>Orden no encontrada</CardTitle>
            <CardDescription>{error || 'No se pudo cargar la orden'}</CardDescription>
          </CardHeader>
          <CardFooter className="justify-center">
            <Link href="/catalogo">
              <Button>Volver al Catálogo</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="container max-w-4xl mx-auto px-4 py-8 md:py-12">
      <Card className="border-primary/20 shadow-lg overflow-hidden">
        <div className="bg-primary/5 p-2 h-2 w-full animate-in slide-in-from-left duration-1000" />
        
        <CardHeader className="text-center pb-6 pt-10">
          <div className="mx-auto bg-green-100 text-green-600 rounded-full p-4 mb-4 w-20 h-20 flex items-center justify-center animate-in zoom-in duration-500">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <CardTitle className="text-3xl font-bold text-gray-900 mb-2">
            ¡Gracias por tu compra, {order.customerName.split(' ')[0]}!
          </CardTitle>
          <CardDescription className="text-lg text-gray-600 max-w-md mx-auto">
            Tu orden ha sido recibida exitosamente y está siendo procesada.
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6 px-6">
          {/* Order Number */}
          <div className="bg-secondary/30 rounded-lg p-6 border border-secondary flex flex-col items-center justify-center space-y-2">
            <span className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">
              Número de Orden
            </span>
            <div className="font-mono text-2xl font-bold text-primary flex items-center gap-2">
              <Package className="w-5 h-5 text-muted-foreground" />
              {order.orderNumber}
            </div>
          </div>

          {/* Order Items */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Artículos del Pedido</h3>
            <div className="space-y-3">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-start gap-4 pb-3 border-b last:border-0">
                  {item.imageUrl && (
                    <Image
                      src={item.imageUrl}
                      alt={item.productName}
                      width={64}
                      height={64}
                      className="w-16 h-16 object-cover rounded border"
                    />
                  )}
                  <div className="flex-1">
                    <p className="font-medium">{item.productName}</p>
                    {item.artist && (
                      <p className="text-sm text-muted-foreground">{item.artist}</p>
                    )}
                    <p className="text-sm text-muted-foreground">Cantidad: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{formatPrice(item.price)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-gray-50 rounded-lg p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span>{formatPrice(order.subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Envío</span>
              <span>{formatPrice(order.shipping)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">IVA (19%)</span>
              <span>{formatPrice(order.tax)}</span>
            </div>
            <div className="border-t pt-2 flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>{formatPrice(order.total)}</span>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="space-y-2">
            <h3 className="font-semibold text-lg">Dirección de Envío</h3>
            <div className="bg-gray-50 rounded-lg p-4 text-sm">
              <p>{order.address.street} {order.address.number}</p>
              {order.address.apartment && <p>Depto/Casa: {order.address.apartment}</p>}
              <p>{order.address.comuna}, {order.address.city}</p>
              <p>{order.address.region}</p>
            </div>
          </div>
          
          <div className="text-center space-y-2 text-sm text-muted-foreground px-4">
            <p>
              Hemos enviado un correo de confirmación a <strong>{order.customerEmail}</strong> con los detalles de tu pedido.
            </p>
            <p>
              Te notificaremos cuando tus vinilos vayan en camino.
            </p>
          </div>
        </CardContent>
        
        <CardFooter className="flex flex-col sm:flex-row gap-4 justify-center pt-6 pb-10">
          <Link href="/" className="w-full sm:w-auto">
            <Button variant="outline" size="lg" className="w-full gap-2 group">
              <Home className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
              Volver al inicio
            </Button>
          </Link>
          <Link href="/catalogo" className="w-full sm:w-auto">
            <Button size="lg" className="w-full gap-2 group shadow-md shadow-primary/20">
              Seguir comprando
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Button>
          </Link>
        </CardFooter>
      </Card>
      
      {/* Decorative background elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-secondary/20 rounded-full blur-3xl opacity-50" />
      </div>
    </div>
  );
}
