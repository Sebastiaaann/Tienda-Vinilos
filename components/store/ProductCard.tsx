"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product";
import { useCartStore } from "@/stores";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Disc, Music2 } from "lucide-react";
import { formatPrice } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation
    e.stopPropagation();
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image
    });
  };

  const conditionColor = {
    SEALED: "bg-emerald-500",
    NEAR_MINT: "bg-emerald-400",
    VERY_GOOD: "bg-yellow-500",
    GOOD: "bg-orange-500",
    FAIR: "bg-red-500",
  }[product.condition] || "bg-gray-500";

  return (
    <Link href={`/productos/${product.slug || product.id}`} className="block h-full">
      <Card className="group relative h-full flex flex-col overflow-hidden transition-[transform,shadow,background-color] duration-200 bg-white border-4 border-text-dark rounded-sm hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[4px_4px_0px_0px_rgba(44,44,44,1)]">
        <div className="aspect-square relative overflow-hidden bg-warm-beige border-b-4 border-text-dark">

          <div className="absolute top-2 left-2 z-10">
            <Badge variant="secondary" className="bg-text-dark text-white border-2 border-transparent rounded-sm text-xs font-bold uppercase tracking-wider">
              {product.format === 'VINYL_LP' ? <Disc className="w-3 h-3 mr-1" /> : <Music2 className="w-3 h-3 mr-1" />}
              {product.format.replace('_', ' ')}
            </Badge>
          </div>


          <div className="absolute top-2 right-2 z-10">
            <Badge className={`${conditionColor} text-white border-2 border-text-dark rounded-sm text-[10px] px-1.5 py-0.5 font-bold shadow-sm`}>
              {product.condition.replace('_', ' ')}
            </Badge>
          </div>


          <div className="relative w-full h-full">
            {product.image ? (
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            ) : (
              <div className="size-full bg-warm-beige flex items-center justify-center text-text-dark/20">
                <Disc className="size-24" />
              </div>
            )}
            <div className="absolute inset-0 bg-vintage-blue/10 opacity-0 group-hover:opacity-100 transition-opacity mix-blend-multiply"></div>
          </div>


          <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 translate-y-full group-hover:opacity-100 group-hover:translate-y-0 transition-[opacity,transform] duration-300 flex justify-center pb-6 bg-gradient-to-t from-text-dark/90 to-transparent">
            <Button
              onClick={handleAddToCart}
              size="sm"
              className="w-full bg-sunny-yellow text-text-dark hover:bg-white font-bold border-2 border-text-dark shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              aria-label={`Agregar ${product.name} al carrito`}
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Agregar
            </Button>
          </div>
        </div>

        <CardContent className="p-4 flex-grow bg-white">
          <div className="space-y-1 mb-2">
            <h3 className="font-bold font-heading text-lg leading-tight text-text-dark line-clamp-1 group-hover:text-retro-red transition-colors uppercase">
              {product.name}
            </h3>
            <p className="text-sm text-gray-500 font-medium line-clamp-1 font-sans">
              {product.artist}
            </p>
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0 flex items-center justify-between mt-auto bg-white">
          <div className="flex flex-col">
            <span className="text-xs text-gray-400 uppercase tracking-wider font-bold">Precio</span>
            <span className="text-xl font-black text-text-dark tracking-tight font-heading">
              {formatPrice(product.price)}
            </span>
          </div>


          <Button
            onClick={handleAddToCart}
            variant="ghost"
            size="icon"
            className="size-10 rounded-sm bg-warm-beige text-text-dark hover:bg-retro-red hover:text-white border-2 border-text-dark md:hidden"
            aria-label={`Agregar ${product.name} al carrito`}
          >
            <ShoppingCart className="w-5 h-5" />
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
