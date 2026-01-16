"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Minus, 
  Plus, 
  Trash2, 
  ShoppingBag, 
  ArrowRight, 
  ArrowLeft,
  Package,
  ShieldCheck,
  Disc
} from "lucide-react";
import { useCartStore } from "@/stores";
import { Button } from "@/components/ui/Button";
import { cn, formatPrice } from "@/lib/utils";
import { Card } from "@/components/ui/card";

export default function CartPage() {
  const router = useRouter();
  const { 
    items, 
    removeItem, 
    updateQuantity, 
    getTotalItems,
    clearCart 
  } = useCartStore();

  const [mounted, setMounted] = React.useState(false);

  // Prevent hydration mismatch
  React.useEffect(() => {
    setMounted(true);
  }, []);

  const totalItems = getTotalItems();
  
  // Calculate subtotal
  const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  
  // Shipping calculation logic
  const FREE_SHIPPING_THRESHOLD = 50000;
  const SHIPPING_COST = 5000;
  const isShippingFree = subtotal >= FREE_SHIPPING_THRESHOLD;
  const shippingTotal = isShippingFree ? 0 : SHIPPING_COST;
  const finalTotal = subtotal + shippingTotal;
  const amountLeftForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  if (!mounted) {
    return (
      <div className="container mx-auto px-4 py-20 min-h-[60vh] flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-12 bg-secondary/50 rounded-full mb-4"></div>
          <div className="h-4 w-48 bg-secondary/50 rounded mb-2"></div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center p-4 text-center animate-fade-in">
        <div className="bg-secondary/30 p-8 rounded-full mb-6">
          <ShoppingBag className="w-16 h-16 text-muted-foreground opacity-50" />
        </div>
        <h1 className="text-3xl font-bold mb-3">Tu carrito está vacío</h1>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          ¡Parece que aún no has agregado discos a tu colección! Explora nuestro catálogo y encuentra tu próxima joya.
        </p>
        <Button 
          size="lg" 
          onClick={() => router.push('/catalogo')}
          className="group"
        >
          <Disc className="mr-2 h-4 w-4 group-hover:rotate-180 transition-transform duration-500" />
          Explorar Catálogo
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20 animate-fade-in">
      {/* Page Header */}
      <div className="bg-secondary/30 border-b mb-8">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
            Carrito de Compras
          </h1>
          <p className="text-muted-foreground">
            {totalItems} {totalItems === 1 ? 'producto' : 'productos'} en tu orden
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          
          {/* Cart Items List */}
          <div className="flex-1 space-y-6">
            {/* Free shipping progress */}
            {!isShippingFree && (
              <div className="bg-secondary/20 border border-secondary p-4 rounded-xl mb-6">
                <div className="flex items-center gap-3 mb-2 text-sm font-medium">
                  <Package className="w-4 h-4 text-primary" />
                  <span>
                    Agrega <span className="text-primary">{formatPrice(amountLeftForFreeShipping)}</span> más para 
                    <span className="font-bold text-emerald-500 ml-1">ENVÍO GRATIS</span>
                  </span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary transition-all duration-500 ease-out"
                    style={{ width: `${(subtotal / FREE_SHIPPING_THRESHOLD) * 100}%` }}
                  ></div>
                </div>
              </div>
            )}

            {isShippingFree && (
              <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-xl mb-6 flex items-center gap-3 text-emerald-500 font-medium">
                <ShieldCheck className="w-5 h-5" />
                ¡Genial! Tu pedido califica para envío gratis.
              </div>
            )}

            <div className="space-y-4">
              {items.map((item) => (
                <div 
                  key={item.id} 
                  className="group relative flex flex-col sm:flex-row gap-4 sm:gap-6 p-4 bg-card hover:bg-secondary/20 border rounded-xl transition-all duration-200"
                >
                  {/* Product Image */}
                  <div className="relative w-full sm:w-28 aspect-square bg-zinc-900 rounded-lg overflow-hidden border shrink-0">
                    {item.image ? (
                      <Image 
                        src={item.image} 
                        alt={item.name} 
                        fill 
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Disc className="w-10 h-10 text-zinc-700" />
                      </div>
                    )}
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <div className="flex justify-between items-start mb-1">
                        <Link href={`/productos/${item.id}`} className="font-bold text-lg hover:text-primary transition-colors line-clamp-1">
                          {item.name}
                        </Link>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeItem(item.id)}
                          className="h-8 w-8 text-muted-foreground hover:text-red-500 -mr-2 -mt-2 sm:mr-0 sm:mt-0"
                          aria-label="Eliminar producto"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">
                        {formatPrice(item.price)} unitario
                      </p>
                    </div>

                    <div className="flex items-end justify-between gap-4">
                      {/* Quantity Controls */}
                      <div className="flex items-center border rounded-lg bg-background shadow-sm">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-9 w-9 hover:bg-secondary"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center text-sm font-semibold tabular-nums">
                          {item.quantity}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-9 w-9 hover:bg-secondary"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          disabled={item.quantity >= 10} // Hard limit if stock isn't in cart item
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>

                      {/* Item Total */}
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Subtotal</p>
                        <p className="text-lg font-bold text-primary">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Button 
              variant="outline" 
              onClick={clearCart}
              className="mt-4 text-xs text-muted-foreground hover:text-red-500 border-dashed"
              size="sm"
            >
              Vaciar carrito completo
            </Button>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:w-96 space-y-6">
            <Card className="p-6 bg-secondary/10 border-border/60 sticky top-24 shadow-sm backdrop-blur-sm">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                Resumen de Orden
              </h2>
              
              <div className="space-y-4 text-sm mb-6 pb-6 border-b border-dashed border-border/50">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Envío</span>
                  {isShippingFree ? (
                    <span className="font-bold text-emerald-500">GRATIS</span>
                  ) : (
                    <span className="font-medium">{formatPrice(SHIPPING_COST)}</span>
                  )}
                </div>
              </div>

              <div className="flex justify-between items-end mb-8">
                <span className="text-base font-bold">Total</span>
                <div className="text-right">
                  <span className="block text-2xl font-bold">{formatPrice(finalTotal)}</span>
                  <span className="text-xs text-muted-foreground">IVA Incluido</span>
                </div>
              </div>

              <div className="space-y-3">
                <Button 
                  className="w-full h-12 text-base font-bold shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all" 
                  size="lg"
                  onClick={() => router.push('/checkout')}
                >
                  Proceder al Checkout
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => router.push('/catalogo')}
                >
                  <ArrowLeft className="mr-2 w-4 h-4" />
                  Continuar Comprando
                </Button>
              </div>

              <div className="mt-8 flex items-center justify-center gap-4 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                {/* Payment Icons Placeholder */}
                <div className="h-6 w-10 bg-zinc-300 rounded"></div>
                <div className="h-6 w-10 bg-zinc-300 rounded"></div>
                <div className="h-6 w-10 bg-zinc-300 rounded"></div>
                <div className="h-6 w-10 bg-zinc-300 rounded"></div>
              </div>
            </Card>
          </div>

        </div>
      </div>
    </div>
  );
}
