"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Helper to format price
const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-CL", {
        style: "currency",
        currency: "CLP",
        minimumFractionDigits: 0,
    }).format(price);
};

// Types for the component props
interface CatalogGridProps {
    products: any[];
}

import { motion } from "framer-motion";

export const CatalogGrid = ({ products }: CatalogGridProps) => {
    // Determine products to show or loading state
    const allProducts = products.length > 0 ? products : [
        { id: 1, name: "Loading...", artist: "Artist", price: 0, image: "", category: "Genre", year: "2024" }
    ];

    // Pagination state
    const ITEMS_PER_PAGE = 8;
    const [currentPage, setCurrentPage] = useState(0);

    // Calculate pagination values
    const totalPages = Math.ceil(allProducts.length / ITEMS_PER_PAGE);
    const paginatedProducts = allProducts.slice(
        currentPage * ITEMS_PER_PAGE,
        (currentPage + 1) * ITEMS_PER_PAGE
    );

    const handlePageChange = (pageIndex: number) => {
        setCurrentPage(pageIndex);
        // Optional: Scroll to top of grid smoothly
        // document.getElementById('catalog-grid')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section className="bg-white text-black py-16 px-6 md:px-12" id="catalog-grid">
            {/* Grid Container - Clean Layout */}
            <motion.div
                key={currentPage} // Add key to force re-animation on page change
                className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-16"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
            >
                {paginatedProducts.map((product) => (
                    <Link
                        href={`/productos/${product.id}`}
                        key={product.id}
                        className="group block"
                    >
                        {/* Image Container */}
                        <div className="aspect-square relative mb-6 shadow-sm group-hover:shadow-md transition-shadow">
                            {product.image ? (
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    sizes="(min-width: 1024px) 20vw, (min-width: 768px) 30vw, 45vw"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full bg-neutral-100 flex items-center justify-center text-neutral-300">
                                    No Image
                                </div>
                            )}

                            {/* Vinyl peaking out effect on hover (optional, keep simple for now) */}
                        </div>

                        {/* Product Info - Centered & Clean */}
                        <div className="text-center space-y-2">
                            <h3 className="font-serif text-lg leading-tight text-gray-900 group-hover:text-black transition-colors">
                                {product.name}
                            </h3>
                            <p className="font-sans text-sm tracking-wide text-gray-500 uppercase">
                                {product.artist || 'Unknown Artist'}
                            </p>
                            <p className="font-sans text-sm font-medium text-gray-900 pt-1">
                                {formatPrice(product.price)}
                            </p>
                        </div>
                    </Link>
                ))}
            </motion.div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="py-16 text-center">
                    <div className="inline-flex gap-3 justify-center items-center">
                        {Array.from({ length: totalPages }).map((_, index) => (
                            <button
                                key={index}
                                onClick={() => handlePageChange(index)}
                                className={`
                                    w-3 h-3 rounded-full transition-all duration-300
                                    ${currentPage === index
                                        ? 'bg-black scale-110'
                                        : 'bg-gray-300 hover:bg-gray-400'
                                    }
                                `}
                                aria-label={`Go to page ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            )}
        </section>
    );
};
