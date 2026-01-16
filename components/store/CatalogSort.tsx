"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

export function CatalogSort() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSort = searchParams.get("sort") || "newest";

  const handleSort = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", value);
    router.push(`/catalogo?${params.toString()}`);
  };

  const options = [
    { value: "newest", label: "Más Recientes" },
    { value: "price_asc", label: "Precio: Bajo a Alto" },
    { value: "price_desc", label: "Precio: Alto a Bajo" },
    { value: "name_asc", label: "Nombre: A-Z" },
  ];

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm text-zinc-400 hidden sm:inline">Ordenar por:</span>
      <div className="flex space-x-1 bg-zinc-900 p-1 rounded-lg border border-zinc-800">
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => handleSort(option.value)}
            className={cn(
              "px-3 py-1.5 text-xs font-medium rounded-md transition-all",
              currentSort === option.value
                ? "bg-zinc-800 text-white shadow-sm"
                : "text-zinc-500 hover:text-zinc-300"
            )}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
