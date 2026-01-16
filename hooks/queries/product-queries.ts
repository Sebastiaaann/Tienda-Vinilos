import { useQuery } from "@tanstack/react-query";
import { getProduct, getProducts } from "@/lib/api/products";
import { ProductFilters } from "@/types/product";

export const productKeys = {
    all: ["products"] as const,
    lists: () => [...productKeys.all, "list"] as const,
    list: (filters: ProductFilters) => [...productKeys.lists(), filters] as const,
    details: () => [...productKeys.all, "detail"] as const,
    detail: (id: string) => [...productKeys.details(), id] as const,
};

export function useProducts(filters: ProductFilters) {
    return useQuery({
        queryKey: productKeys.list(filters),
        queryFn: () => getProducts(filters),
        // Keep data fresh for 1 minute
        staleTime: 60 * 1000,
        // Avoid refetching when window gains focus to save bandwidth
        refetchOnWindowFocus: false,
    });
}

export function useProduct(slugOrId: string) {
    return useQuery({
        queryKey: productKeys.detail(slugOrId),
        queryFn: () => getProduct(slugOrId),
        enabled: !!slugOrId,
        // Keep detail data fresh for a bit longer
        staleTime: 5 * 60 * 1000,
    });
}
