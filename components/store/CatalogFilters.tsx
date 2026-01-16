"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Search, Filter, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function CatalogFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);

  // Filter states initialized from URL
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [format, setFormat] = useState(searchParams.get("format") || "");
  const [condition, setCondition] = useState(searchParams.get("condition") || "");
  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");

  const applyFilters = () => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (format) params.set("format", format);
    if (condition) params.set("condition", condition);
    if (minPrice) params.set("minPrice", minPrice);
    if (maxPrice) params.set("maxPrice", maxPrice);
    
    // Preserve sort if exists
    const currentSort = searchParams.get("sort");
    if (currentSort) params.set("sort", currentSort);

    router.push(`/catalogo?${params.toString()}`);
    setIsOpen(false);
  };

  const clearFilters = () => {
    setSearch("");
    setFormat("");
    setCondition("");
    setMinPrice("");
    setMaxPrice("");
    router.push("/catalogo");
    setIsOpen(false);
  };

  return (
    <>
      <div className="lg:hidden mb-4">
        <Button onClick={() => setIsOpen(!isOpen)} variant="outline" className="w-full">
          <Filter className="w-4 h-4 mr-2" />
          Filtros y Búsqueda
        </Button>
      </div>

      <div className={cn(
        "lg:block space-y-8 bg-zinc-900/50 p-6 rounded-xl border border-zinc-800 backdrop-blur-sm",
        isOpen ? "block fixed inset-0 z-50 bg-black p-6 overflow-y-auto" : "hidden"
      )}>
        {isOpen && (
          <div className="flex justify-between items-center mb-6 lg:hidden">
            <h2 className="text-xl font-bold">Filtros</h2>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
              <X className="w-6 h-6" />
            </Button>
          </div>
        )}

        {/* Search */}
        <div className="space-y-3">
          <h3 className="font-semibold text-sm uppercase tracking-wider text-zinc-400">Búsqueda</h3>
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
            <Input 
              placeholder="Artista, Álbum..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 bg-zinc-900 border-zinc-700 focus:border-white transition-colors"
            />
          </div>
        </div>

        {/* Formatos */}
        <div className="space-y-3">
          <h3 className="font-semibold text-sm uppercase tracking-wider text-zinc-400">Formato</h3>
          <div className="space-y-2">
            {[
              { id: 'VINYL_LP', label: 'Vinyl LP' },
              { id: 'VINYL_EP', label: 'Vinyl EP' },
              { id: 'CD_ALBUM', label: 'CD Album' },
            ].map((f) => (
              <label key={f.id} className="flex items-center space-x-3 cursor-pointer group">
                <div className={cn(
                  "w-4 h-4 rounded-full border border-zinc-600 flex items-center justify-center transition-all group-hover:border-white",
                  format === f.id ? "border-white bg-white" : "bg-transparent"
                )}>
                  <div className={cn("w-2 h-2 rounded-full bg-black transition-transform", format === f.id ? "scale-100" : "scale-0")} />
                </div>
                <input 
                  type="radio" 
                  name="format" 
                  value={f.id}
                  checked={format === f.id}
                  onChange={(e) => setFormat(e.target.value)}
                  className="hidden"
                />
                <span className={cn("text-sm transition-colors", format === f.id ? "text-white font-medium" : "text-zinc-400 group-hover:text-zinc-300")}>
                  {f.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Estado */}
        <div className="space-y-3">
          <h3 className="font-semibold text-sm uppercase tracking-wider text-zinc-400">Condición</h3>
          <select 
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-700 rounded-md p-2 text-sm text-zinc-300 focus:outline-none focus:border-white transition-colors"
          >
            <option value="">Todas</option>
            <option value="SEALED">Sealed (Sellado)</option>
            <option value="NEAR_MINT">Near Mint (Casi Nuevo)</option>
            <option value="VERY_GOOD">Very Good (Muy Bueno)</option>
            <option value="GOOD">Good (Bueno)</option>
          </select>
        </div>

        {/* Precio */}
        <div className="space-y-3">
          <h3 className="font-semibold text-sm uppercase tracking-wider text-zinc-400">Precio (CLP)</h3>
          <div className="grid grid-cols-2 gap-2">
            <Input 
              type="number" 
              placeholder="Mín" 
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="bg-zinc-900 border-zinc-700"
            />
            <Input 
              type="number" 
              placeholder="Máx" 
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="bg-zinc-900 border-zinc-700"
            />
          </div>
        </div>

        <div className="pt-4 space-y-3">
          <Button onClick={applyFilters} className="w-full bg-white text-black hover:bg-zinc-200 font-bold">
            Aplicar Filtros
          </Button>
          {(search || format || condition || minPrice || maxPrice) && (
            <Button onClick={clearFilters} variant="ghost" className="w-full text-zinc-400 hover:text-white">
              Limpiar Todo
            </Button>
          )}
        </div>
      </div>
    </>
  );
}
