export interface Product {
  id: string;
  sku: string;
  name: string;
  slug: string;
  artist?: string;
  album?: string;
  description?: string;
  price: number;
  image: string;
  images?: string[];
  category: string;
  format: 'VINYL_LP' | 'VINYL_EP' | 'CD_ALBUM' | 'TURNTABLE' | 'OTHER';
  condition: 'SEALED' | 'NEAR_MINT' | 'VERY_GOOD' | 'GOOD' | 'FAIR';
  stock: number;
  genre?: string;
  releaseYear?: number;
  label?: string;
  catalogNumber?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface ExtendedProduct extends Product {
  label?: string;
  catalogNumber?: string;
  country?: string;
  tracks?: { position: string; title: string; duration: string }[];
  reviews?: {
    id: string;
    rating: number;
    comment: string;
    userName: string;
    createdAt: string;
    isApproved: boolean
  }[];
  compareAtPrice?: number;
  images?: string[];
  genre?: string;
  releaseYear?: number;
}

export interface ProductsResponse {
  products: Product[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ProductFilters {
  search?: string;
  categoryId?: string;
  format?: string;
  condition?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: string;
  order?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}
