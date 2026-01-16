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
interface VinylGridProps {
    products: any[];
}

export const VinylGrid = ({ products }: VinylGridProps) => {
    const displayProducts = products.length > 0 ? products : [
        { id: 1, name: "Loading...", artist: "Artist", price: 0, image: "", category: "Genre", year: "2024" }
    ];

    return (
        <section className="bg-white text-black py-16 px-6 md:px-12">
            {/* Grid Container - Clean Layout */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-16">
                {displayProducts.map((product) => (
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
            </div>

            {/* Pagination / Load More (Simple placeholder) */}
            <div className="py-16 text-center">
                <div className="inline-flex gap-2 justify-center">
                    <span className="w-2 h-2 rounded-full bg-black"></span>
                    <span className="w-2 h-2 rounded-full bg-gray-300"></span>
                    <span className="w-2 h-2 rounded-full bg-gray-300"></span>
                </div>
            </div>
        </section>
    );
};
