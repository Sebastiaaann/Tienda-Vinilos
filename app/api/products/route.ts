import { NextResponse } from 'next/server';
import { Product, ProductsResponse } from '@/types/product';

// Local images pool
const localImages = [
  "/images/blue-velvet-md-web.jpg", "/images/eraserhead-md-web.jpg", "/images/chungking-express-md-web.jpg",
  "/images/fallen-angels-md-web.jpg", "/images/suspiria-md-web.jpg", "/images/paris-texas-md-web.jpg",
  "/images/fantastic-planet-md-web.jpg", "/images/pierrot-le-fou-md-web.jpg", "/images/mulholland-drive-md-web.jpg",
  "/images/naked-lunch-md-web.jpg", "/images/happy-together-md-web.jpg", "/images/la-chimera-md-web.jpg",
  "/images/0886445151930_600.jpg", "/images/1900x1900-000000-80-0-0.jpg", "/images/1977-e28093-the-year-punk-broke-box-set-inner3.jpg",
  "/images/50699-solo-sunny-0-2000-0-3000-crop.jpg", "/images/5cca5f12-6c06-46d6-9edb-e844220a315d.jpg",
  "/images/9a13b9dd-2561-418d-91d6-fca3d5b65af1.webp", "/images/Eraserhead-1200x675.jpeg", "/images/G4Xt2OSasAEr8ZX.jpeg",
  "/images/G6FDFDraoAAe2BF.jpeg", "/images/GYRvpqFWwAAYLEQ.jpg", "/images/GjrnJNIXEAAWIP5.jpg", "/images/Gt0T92CXIAAUr_B.jpg",
  "/images/Lilya_4-ever_poster.jpg", "/images/Russell_Young_Mick_Rock_Lou_Reed_vbawgv.jpg", "/images/VEXZT7ZZIFAPFPGY3Q7O44UWYE.jpg",
  "/images/a-clockwork-orange-md-web.jpg", "/images/blue-velvet-md-web (1).jpg", "/images/blue-velvet-md-web (2).jpg",
  "/images/blue-velvet-md-web (3).jpg", "/images/blue-velvet-md-web (4).jpg", "/images/blue-velvet-md-web (5).jpg",
  "/images/chungking-express-md-web (1).jpg", "/images/chungking-express-md-web (2).jpg", "/images/chungking-express-md-web (3).jpg",
  "/images/chungking-express-md-web (4).jpg", "/images/chungking-express-md-web (5).jpg", "/images/cure-md-web.jpg",
  "/images/eraserhead-md-web (1).jpg", "/images/eraserhead-md-web (2).jpg", "/images/eraserhead-md-web (3).jpg",
  "/images/fallen-angels-md-web (1).jpg", "/images/fallen-angels-md-web (2).jpg", "/images/fantastic-planet-md-web (1).jpg",
  "/images/fantastic-planet-md-web (2).jpg", "/images/fantastic-planet-md-web (3).jpg", "/images/fantastic-planet-md-web (4).jpg",
  "/images/fantastic-planet-md-web (5).jpg", "/images/inland-empire-md-web.jpg", "/images/la-chimera-md-web (1).jpg",
  "/images/lilya-4ever-md-web.jpg", "/images/masculin-feminin-md-web (1).jpg", "/images/masculin-feminin-md-web (2).jpg",
  "/images/masculin-feminin-md-web (3).jpg", "/images/masculin-feminin-md-web (4).jpg", "/images/masculin-feminin-md-web.jpg",
  "/images/memories-of-murder-md-web.jpg", "/images/mulholland-drive-md-web (1).jpg", "/images/naked-lunch-md-web (1).jpg",
  "/images/naked-lunch-md-web (2).jpg", "/images/paris-texas-md-web (1).jpg", "/images/pierrot-le-fou-md-web (1).jpg",
  "/images/pierrot-le-fou-md-web (2).jpg", "/images/pierrot-le-fou-md-web (3).jpg", "/images/pierrot-le-fou-md-web (4).jpg",
  "/images/pierrot-le-fou-md-web (5).jpg", "/images/pierrot-le-fou-md-web (6).jpg", "/images/possession-md-web (1).jpg",
  "/images/possession-md-web.jpg", "/images/suspiria-md-web (1).jpg", "/images/the-elephant-man-md-web (1).jpg",
  "/images/the-elephant-man-md-web (2).jpg", "/images/the-elephant-man-md-web.jpg", "/images/the-lighthouse-md-web (1).jpg",
  "/images/the-lighthouse-md-web.jpg", "/images/the-thing-md-web.jpg", "/images/twin-peaks-fire-walk-with-me-md-web.jpg",
  "/images/twin-peaks-md-web (1).jpg", "/images/twin-peaks-md-web.jpg", "/images/wild-at-heart-md-web.jpg"
];

// Mock data generator
const generateProducts = (count: number): Product[] => {
  return Array.from({ length: count }).map((_, i) => {
    const name = i % 3 === 0 ? "Dark Side of the Moon" : i % 3 === 1 ? "Abbey Road" : "Random Access Memories";
    const slug = name.toLowerCase().replace(/\s+/g, '-') + `-${i + 1}`;
    const randomImage = localImages[Math.floor(Math.random() * localImages.length)];

    return {
      id: `prod-${i + 1}`,
      sku: `SKU-${String(i + 1).padStart(6, '0')}`,
      slug: slug,
      name: name,
      artist: i % 3 === 0 ? "Pink Floyd" : i % 3 === 1 ? "The Beatles" : "Daft Punk",
      description: "Classic album in excellent condition. Must have for any collector.",
      price: (Math.floor(Math.random() * 50) + 10) * 1000 + 990,
      image: randomImage,
      category: "Rock",
      format: Math.random() > 0.3 ? 'VINYL_LP' : 'CD_ALBUM',
      condition: Math.random() > 0.5 ? 'SEALED' : 'NEAR_MINT',
      stock: Math.floor(Math.random() * 10),
      releaseYear: 1970 + Math.floor(Math.random() * 50),
      createdAt: new Date().toISOString()
    };
  });
};

const allProducts = generateProducts(50);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  // Extract query params
  const search = searchParams.get('search')?.toLowerCase();
  const format = searchParams.get('format');
  const condition = searchParams.get('condition');
  const minPrice = searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined;
  const maxPrice = searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined;
  const sort = searchParams.get('sort') || 'newest';

  const page = Number(searchParams.get('page')) || 1;
  const limit = Number(searchParams.get('limit')) || 12;

  // Filter products
  let filtered = [...allProducts];

  if (search) {
    filtered = filtered.filter(p =>
      p.name.toLowerCase().includes(search) ||
      (p.artist?.toLowerCase().includes(search) ?? false)
    );
  }

  if (format) {
    filtered = filtered.filter(p => p.format === format);
  }

  if (condition) {
    filtered = filtered.filter(p => p.condition === condition);
  }

  if (minPrice !== undefined) {
    filtered = filtered.filter(p => p.price >= minPrice);
  }

  if (maxPrice !== undefined) {
    filtered = filtered.filter(p => p.price <= maxPrice);
  }

  // Sorting
  filtered.sort((a, b) => {
    switch (sort) {
      case 'price_asc': return a.price - b.price;
      case 'price_desc': return b.price - a.price;
      case 'name_asc': return a.name.localeCompare(b.name);
      case 'name_desc': return b.name.localeCompare(a.name);
      case 'newest':
      default: return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
  });

  // Pagination
  const total = filtered.length;
  const totalPages = Math.ceil(total / limit);
  const start = (page - 1) * limit;
  const paginated = filtered.slice(start, start + limit);

  const response: ProductsResponse = {
    products: paginated,
    pagination: {
      page,
      limit,
      total,
      totalPages
    }
  };

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));

  return NextResponse.json(response);
}
