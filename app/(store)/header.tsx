"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Disc, Menu, Search, ShoppingCart, User, X } from "lucide-react";
import { useCartStore } from "@/stores";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { cn } from "@/lib/utils";

export function StoreHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const totalItems = useCartStore((state) => state.getTotalItems());
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { href: "/catalogo", label: "Catálogo" },
    { href: "/catalogo?genre=rock", label: "Rock" },
    { href: "/catalogo?genre=jazz", label: "Jazz" },
    { href: "/catalogo?genre=electronic", label: "Editorial" },
  ];

  const isHomePage = pathname === '/';

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled
          ? "bg-text-dark/95 backdrop-blur-md border-b-4 border-retro-red shadow-lg py-2"
          : isHomePage ? "bg-retro-red border-b-0 py-4" : "bg-text-dark border-b-4 border-retro-red py-4"
      )}
    >
      <div className="container mx-auto px-6">
        <div className="flex h-12 items-center justify-between">

          {/* Logo (Left) */}
          <Link
            href="/"
            className="flex items-center gap-2 group"
          >
            <div className={cn(
              "p-1.5 rounded-sm border-2 transition-transform group-hover:rotate-12",
              isHomePage && !isScrolled ? "bg-text-dark text-retro-red border-text-dark" : "bg-retro-red text-text-dark border-retro-red"
            )}>
              <Disc className={cn("h-6 w-6 md:h-8 md:w-8 animate-spin-slow", isHomePage && !isScrolled ? "text-white" : "text-white")} />
            </div>
            <span className={cn(
              "font-black font-heading text-xl md:text-2xl uppercase tracking-tighter leading-none",
              isHomePage && !isScrolled ? "text-text-dark" : "text-white"
            )}>
              Tienda de <br /><span className={cn(isHomePage && !isScrolled ? "text-white" : "text-retro-red")}>Vinilos</span>
            </span>
          </Link>

          {/* Desktop Navigation (Center) */}
          <nav className="hidden md:flex items-center gap-8 absolute left-1/2 transform -translate-x-1/2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-bold font-heading uppercase tracking-widest transition-all hover:-translate-y-0.5",
                  pathname === link.href
                    ? "text-sunny-yellow"
                    : isHomePage && !isScrolled ? "text-text-dark hover:text-white" : "text-warm-beige hover:text-retro-red"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions (Right) */}
          <div className="flex items-center gap-4">
            {/* Search Toggle */}
            <div className="relative">
              {isSearchOpen ? (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[200px] md:w-[300px] flex items-center">
                  <Input
                    autoFocus
                    className="bg-white text-text-dark border-2 border-text-dark h-10 pr-10 font-bold placeholder:font-normal rounded-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                    placeholder="BUSCAR..."
                    onBlur={() => setIsSearchOpen(false)}
                  />
                  <X className="w-4 h-4 absolute right-3 text-text-dark cursor-pointer hover:text-retro-red" onClick={() => setIsSearchOpen(false)} />
                </div>
              ) : (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsSearchOpen(true)}
                  className={cn(
                    "hover:bg-transparent hover:scale-110 transition-transform",
                    isHomePage && !isScrolled ? "text-text-dark hover:text-white" : "text-white hover:text-retro-red"
                  )}
                >
                  <Search className="h-6 w-6" />
                </Button>
              )}
            </div>

            <Link href="/cart">
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "relative hover:bg-transparent hover:scale-110 transition-transform",
                  isHomePage && !isScrolled ? "text-text-dark hover:text-white" : "text-white hover:text-retro-red"
                )}
                aria-label="Carrito"
              >
                <ShoppingCart className="h-6 w-6" />
                {mounted && totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-sm bg-sunny-yellow text-[10px] font-black text-text-dark border-2 border-text-dark shadow-sm">
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className={cn("md:hidden", isHomePage && !isScrolled ? "text-text-dark" : "text-white")}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="h-8 w-8" />
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-text-dark border-b-4 border-retro-red p-6 shadow-2xl animate-in slide-in-from-top-5">
            <nav className="flex flex-col gap-6 text-center">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-2xl font-black font-heading uppercase tracking-widest hover:text-retro-red transition-colors",
                    pathname === link.href
                      ? "text-sunny-yellow"
                      : "text-white"
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="border-t border-white/10 pt-6 mt-2 flex justify-center gap-6">
                <Link href="/account" className="text-sm font-bold uppercase text-white hover:text-retro-red flex items-center gap-2">
                  <User className="w-4 h-4" /> Mi Cuenta
                </Link>
                <Link href="/cart" className="text-sm font-bold uppercase text-white hover:text-retro-red flex items-center gap-2">
                  <ShoppingCart className="w-4 h-4" /> Carrito ({totalItems})
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
