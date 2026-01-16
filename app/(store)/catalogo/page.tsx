import { Cursor } from '@/components/editorial/Cursor';
import VinylCarousel from '@/components/store/VinylCarousel';
import { CatalogGrid } from '@/components/store/CatalogGrid';
import CategoryFilter from '@/components/store/CategoryFilter';
import { Footer } from '@/components/editorial/Footer';
import { Product } from '@/types/product';

interface NextFetchRequestConfig {
  revalidate?: number | false;
  tags?: string[];
}

interface NextRequestInit extends RequestInit {
  next?: NextFetchRequestConfig;
}

async function getProducts(category?: string): Promise<Product[]> {
  try {
    const url = new URL(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/products`);
    url.searchParams.append('limit', '24');
    if (category) {
      // Map frontend categories to backend categories if needed, or pass directly
      // Assuming backend handles 'category' param
      url.searchParams.append('category', category);
    }

    const res = await fetch(url.toString(), {
      next: { revalidate: 0 },
      cache: 'no-store'
    } as NextRequestInit);

    if (!res.ok) return [];

    const data = await res.json();
    return data.products || [];
  } catch (error) {
    console.error("Failed to fetch products", error);
    return [];
  }
}

interface CatalogPageProps {
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function CatalogPage({ searchParams }: CatalogPageProps) {
  const category = typeof searchParams.category === 'string' ? searchParams.category : undefined;
  const products = await getProducts(category);

  return (
    <div className="min-h-screen bg-neutral-50 text-black font-sans selection:bg-gray-200 selection:text-black">
      <Cursor />
      <main>
        <VinylCarousel />
        <CategoryFilter />
        <CatalogGrid products={products} />
      </main>
      <Footer />
    </div>
  );
}
