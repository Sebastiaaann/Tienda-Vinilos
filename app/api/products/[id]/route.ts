import { NextResponse } from 'next/server';

// Local images pool (duplicated from main route for consistency without complex import/export refactors)
const localImages = [
    "/images/blue-velvet-md-web.jpg", "/images/eraserhead-md-web.jpg", "/images/chungking-express-md-web.jpg",
    "/images/fallen-angels-md-web.jpg", "/images/suspiria-md-web.jpg", "/images/paris-texas-md-web.jpg",
    "/images/fantastic-planet-md-web.jpg", "/images/pierrot-le-fou-md-web.jpg", "/images/mulholland-drive-md-web.jpg",
    "/images/naked-lunch-md-web.jpg", "/images/happy-together-md-web.jpg", "/images/la-chimera-md-web.jpg",
    "/images/0886445151930_600.jpg", "/images/1900x1900-000000-80-0-0.jpg", "/images/Eraserhead-1200x675.jpeg",
    "/images/VEXZT7ZZIFAPFPGY3Q7O44UWYE.jpg", "/images/a-clockwork-orange-md-web.jpg", "/images/cure-md-web.jpg",
];

// Determine a consistent image based on product ID
const getImageForId = (id: string) => {
    // Simple hash sum of char codes to pick an image index
    const sum = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return localImages[sum % localImages.length];
};

export const GET = async (_request: Request, { params }: { params: { id: string } }) => {
    const id = params.id;

    // Simulate finding the product
    // ensure we handle "prod-X" or just IDs
    const numericPart = parseInt(id.replace(/\D/g, '')) || 1;

    // Names rotation
    const names = ["Dark Side of the Moon", "Abbey Road", "Random Access Memories", "Unknown Pleasures", "In Rainbows", "Blonde"];
    const artists = ["Pink Floyd", "The Beatles", "Daft Punk", "Joy Division", "Radiohead", "Frank Ocean"];

    const product = {
        id: id,
        sku: `SKU-${String(numericPart).padStart(6, '0')}`,
        slug: `product-${id}`,
        name: names[numericPart % names.length] || "Classic Album",
        artist: artists[numericPart % artists.length] || "Legendary Artist",
        description: "This is a masterpiece of modern music. A must-have for any serious collector. The pressing is high quality and the packaging is pristine.",
        price: (Math.floor(Math.random() * 50) + 20) * 1000 + 990, // Random price roughly 20k - 70k CLP
        image: getImageForId(id),
        category: "Rock",
        format: Math.random() > 0.3 ? 'VINYL_LP' : 'CD_ALBUM',
        condition: Math.random() > 0.5 ? 'SEALED' : 'NEAR_MINT',
        stock: Math.floor(Math.random() * 10) + 1,
        releaseYear: 1970 + Math.floor(Math.random() * 50),
        country: "USA",
        catalogNumber: `CAT-${Math.floor(Math.random() * 1000)}`,
        createdAt: new Date().toISOString()
    };

    return NextResponse.json(product);
}
