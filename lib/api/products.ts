import { ExtendedProduct, ProductFilters, ProductsResponse } from "@/types/product";

export async function getProduct(slugOrId: string): Promise<ExtendedProduct> {
    const response = await fetch(`/api/products/${slugOrId}`);

    if (!response.ok) {
        throw new Error("Product not found");
    }

    return response.json();
}

export async function getProducts(filters: ProductFilters): Promise<ProductsResponse> {
    const params = new URLSearchParams();

    if (filters.search) params.append("search", filters.search);
    if (filters.categoryId) params.append("categoryId", filters.categoryId);
    if (filters.format) params.append("format", filters.format);
    if (filters.condition) params.append("condition", filters.condition);
    if (filters.minPrice) params.append("minPrice", filters.minPrice.toString());
    if (filters.maxPrice) params.append("maxPrice", filters.maxPrice.toString());
    if (filters.sort) params.append("sort", filters.sort);
    if (filters.order) params.append("order", filters.order);
    if (filters.page) params.append("page", filters.page.toString());
    if (filters.limit) params.append("limit", filters.limit.toString());

    const response = await fetch(`/api/products?${params.toString()}`);

    if (!response.ok) {
        throw new Error("Failed to fetch products");
    }

    return response.json();
}
