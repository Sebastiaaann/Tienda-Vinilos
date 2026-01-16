import { Cursor } from '@/components/editorial/Cursor';
import { Hero } from '@/components/editorial/Hero';
import { Intro } from '@/components/editorial/Intro';
import { ArtistGrid } from '@/components/editorial/ArtistGrid';
import { Marquee } from '@/components/editorial/Marquee';
import { TextTicker } from '@/components/editorial/TextTicker';
import { VinylGrid } from '@/components/editorial/VinylGrid';
import { StaffPicks } from '@/components/editorial/StaffPicks';
import { Footer } from '@/components/editorial/Footer';
import { Product } from '@/types/product';

interface NextFetchRequestConfig {
  revalidate?: number | false;
  tags?: string[];
}

interface NextRequestInit extends RequestInit {
  next?: NextFetchRequestConfig;
}

async function getFeaturedProducts(): Promise<Product[]> {
  try {
    // INCREASED LIMIT TO 12 AND REMOVED CACHING TO FIX IMAGE UPDATES
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/products?limit=12`, {
      next: { revalidate: 0 },
      cache: 'no-store'
    } as NextRequestInit);

    if (!res.ok) return [];

    const data = await res.json();
    return data.products || [];
  } catch (error) {
    console.error("Failed to fetch featured products", error);
    return [];
  }
}

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts();

  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white cursor-none">
      <Cursor />
      <main>
        <Hero />
        <Marquee />
        <TextTicker />
        <ArtistGrid />
        <Intro />
        <VinylGrid products={featuredProducts} />
        <StaffPicks />
      </main>
      <Footer />
    </div>
  );
}
