"use client";

import * as React from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Minus, Plus, Disc, Loader2 } from "lucide-react"; // Loader2 for loading state
import { useCartStore } from "@/stores";
import { useProduct, useProducts } from "@/hooks/queries/product-queries";
import { Cursor } from "@/components/editorial/Cursor";
import { motion } from "framer-motion";

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { addItem } = useCartStore();

  const [quantity, setQuantity] = React.useState(1);
  const [isAddingToCart, setIsAddingToCart] = React.useState(false);

  // Fetch product data
  const {
    data: product,
    isLoading: loading,
    isError: error
  } = useProduct(slug);

  const handleAddToCart = () => {
    if (!product) return;

    setIsAddingToCart(true);
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      image: product.image
    });

    setTimeout(() => {
      setIsAddingToCart(false);
    }, 500);
  };

  const handleQuantityChange = (delta: number) => {
    setQuantity(prev => {
      const newVal = prev + delta;
      if (newVal < 1) return 1;
      if (product?.stock && newVal > product.stock) return product.stock;
      if (newVal > 10) return 10;
      return newVal;
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(price / 1000); // Mocking conversion for aesthetic matching reference $34.00 style
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#EAEAEA] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-neutral-400" />
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-[#EAEAEA] flex items-center justify-center text-neutral-500 font-serif">
        Product not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#EAEAEA] text-black font-sans selection:bg-black selection:text-white cursor-none flex flex-col relative pt-32 pb-12">
      <Cursor />

      {/* Background Decor (Optional specific minimalist feel) */}

      <main className="container mx-auto px-6 md:px-12 w-full max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-48 items-center">

          {/* Visual: Vinyl Peek Effect */}
          <div className="relative w-full max-w-lg mx-auto lg:mx-0 aspect-square flex items-center justify-center">
            {/* Vinyl Record (Behind Cover) */}
            <motion.div
              initial={{ x: 0 }}
              animate={{ x: "25%" }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
              className="absolute w-[95%] h-[95%] rounded-full bg-black flex items-center justify-center shadow-xl z-0"
            >
              {/* Vinyl Grooves & Label */}
              <div className="w-[98%] h-[98%] rounded-full border border-neutral-800 opacity-50 absolute" />
              <div className="w-[60%] h-[60%] rounded-full border-[20px] border-neutral-900 opacity-40 absolute" />
              <div className="w-1/3 h-1/3 bg-red-700 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-black rounded-full" />
              </div>
            </motion.div>

            {/* Album Cover */}
            <div className="relative z-10 w-full h-full shadow-[0_20px_50px_rgba(0,0,0,0.3)] bg-zinc-900">
              {product.image ? (
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-neutral-200">
                  <Disc className="w-24 h-24 text-neutral-400" />
                </div>
              )}
            </div>
          </div>

          {/* Details: Minimalist Column */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-8 font-serif">

            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl text-black">
                {product.name} - {product.artist}
              </h1>

              {/* Mock Review Count Style */}
              <div className="text-sm underline decoration-1 text-neutral-600 font-sans tracking-wide cursor-pointer hover:text-black">
                {Math.floor(Math.random() * 500) + 50} Store Reviews
              </div>
            </div>

            <div className="space-y-4 text-lg md:text-xl text-neutral-800">
              <p>{new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP" }).format(product.price)}</p>
              <p className="font-sans text-base text-neutral-600">{product.format || 'Vinyl LP'}</p>
              <p className="font-sans text-base text-neutral-600">{product.condition === 'SEALED' ? 'Sealed and Mint' : 'Near Mint'}</p>

              {/* Pre-order / Ship Date Mock */}
              <p className="font-sans text-sm text-neutral-500 italic">
                Ships in 2-3 business days
              </p>
            </div>

            {/* Interaction */}
            <div className="w-full max-w-xs space-y-6 pt-4">
              <div className="space-y-2">
                <label className="text-sm font-sans tracking-wide text-neutral-500 uppercase">Quantity:</label>
                <div className="flex items-center justify-center lg:justify-start">
                  <div className="border border-neutral-300 w-24 h-12 flex items-center justify-between px-3 bg-transparent">
                    <span className="font-sans text-lg">{quantity}</span>
                    <div className="flex flex-col">
                      <button onClick={() => handleQuantityChange(1)} className="hover:text-black text-neutral-400"><Plus className="w-3 h-3" /></button>
                      <button onClick={() => handleQuantityChange(-1)} className="hover:text-black text-neutral-400"><Minus className="w-3 h-3" /></button>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={isAddingToCart}
                className="w-full bg-black text-white h-14 text-sm font-serif tracking-widest uppercase hover:bg-neutral-800 transition-colors disabled:opacity-50"
              >
                {isAddingToCart ? 'Adding...' : 'Add To Cart'}
              </button>
            </div>

          </div>
        </div>
      </main>

      {/* Visual Separator */}
      <div className="w-full h-px bg-neutral-300 max-w-7xl mx-auto my-24" />

      {/* Related Products Section */}
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 pb-24">
        <RelatedProducts currentProductId={product.id} />
      </div>
    </div>
  );
}

function RelatedProducts({ currentProductId }: { currentProductId: string }) {
  // Fetch related products (mock logic: just fetch some products)
  const { data } = useProducts({ limit: 4 });

  const related = React.useMemo(() => {
    if (!data?.products) return [];
    return data.products.filter(p => p.id !== currentProductId).slice(0, 4);
  }, [data, currentProductId]);

  if (!related.length) return null;

  return (
    <section className="w-full">
      <h2 className="text-3xl md:text-4xl font-serif mb-16 text-center md:text-left">You Might Also Like</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
        {related.map((prod) => (
          <a key={prod.id} href={`/productos/${prod.id}`} className="group block cursor-pointer">
            {/* Card Visual */}
            <div className="relative aspect-square mb-6 flex items-center justify-center">
              {/* Vinyl Peek (Smaller / Static HOVER effect) */}
              <div className="absolute w-[90%] h-[90%] rounded-full bg-black shadow-lg right-2 group-hover:right-[-15%] transition-all duration-500 ease-out z-0 flex items-center justify-center">
                <div className="w-[40%] h-[40%] rounded-full border-[10px] border-neutral-800 opacity-50" />
                <div className="absolute w-[20%] h-[20%] bg-red-600 rounded-full" />
              </div>

              {/* Cover */}
              <div className="relative z-10 w-full h-full shadow-lg bg-neutral-200">
                {prod.image ? (
                  <Image src={prod.image} alt={prod.name} fill className="object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center"><Disc className="text-neutral-400" /></div>
                )}
              </div>
            </div>

            {/* Card Details */}
            <div className="text-center space-y-1">
              <h3 className="font-serif text-lg leading-tight group-hover:underline decoration-1 underline-offset-4 transition-all">
                {prod.name}
              </h3>
              <p className="font-sans text-sm text-neutral-500 uppercase tracking-wide">
                {prod.artist}
              </p>
              <p className="font-sans text-sm font-medium pt-2">
                {new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP" }).format(prod.price)}
              </p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
