import Link from "next/link";
import {
  Facebook,
  Instagram,
  Twitter,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  Music,
  Disc
} from "lucide-react";
import { Button } from "@/components/ui/Button";

export function StoreFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-text-dark text-warm-beige border-t-8 border-retro-red">
      {/* Newsletter Section */}
      <div className="border-b-2 border-warm-beige/10">
        <div className="container mx-auto px-4 py-16">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left space-y-2">
              <h3 className="text-3xl font-black font-heading uppercase text-sunny-yellow mb-2">
                Únete al Club del Vinilo
              </h3>
              <p className="text-warm-beige/80 text-lg font-medium max-w-md">
                Recibe novedades, lanzamientos exclusivos y ofertas especiales. Sin spam.
              </p>
            </div>
            <div className="flex w-full md:w-auto gap-2">
              <input
                type="email"
                placeholder="Tu correo electrónico"
                className="flex h-12 w-full md:w-80 rounded-sm border-2 border-warm-beige bg-text-dark px-4 py-2 text-sm text-white placeholder:text-warm-beige/50 focus:outline-none focus:ring-2 focus:ring-sunny-yellow focus:border-transparent font-bold"
              />
              <Button className="h-12 bg-sunny-yellow text-text-dark hover:bg-white hover:text-text-dark border-2 border-transparent hover:border-text-dark font-black tracking-widest uppercase">
                Suscribirse
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Store Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-white font-black font-heading text-xl uppercase tracking-wider">
              <div className="bg-retro-red text-white p-2 rounded-sm border-2 border-white">
                <Music className="h-5 w-5" />
              </div>
              Tienda de Vinilos
            </div>
            <p className="text-sm leading-relaxed text-warm-beige/70 font-medium">
              Tu destino definitivo para encontrar los mejores vinilos en Chile.
              Curamos nuestra colección con pasión por la música analógica y el
              sonido de alta fidelidad.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-retro-red transition-colors transform hover:scale-110 duration-200" aria-label="Facebook">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="hover:text-retro-red transition-colors transform hover:scale-110 duration-200" aria-label="Instagram">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="hover:text-retro-red transition-colors transform hover:scale-110 duration-200" aria-label="Twitter">
                <Twitter className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sunny-yellow font-black font-heading uppercase text-lg mb-6 tracking-wide">Enlaces Rápidos</h4>
            <ul className="space-y-4 text-sm font-bold uppercase tracking-wider">
              <li>
                <Link href="/catalogo" className="hover:text-retro-red transition-colors hover:pl-2 duration-200 block">
                  Catálogo Completo
                </Link>
              </li>
              <li>
                <Link href="/novedades" className="hover:text-retro-red transition-colors hover:pl-2 duration-200 block">
                  Novedades
                </Link>
              </li>
              <li>
                <Link href="/ofertas" className="hover:text-retro-red transition-colors hover:pl-2 duration-200 block">
                  Ofertas
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-retro-red transition-colors hover:pl-2 duration-200 block">
                  Blog Musical
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-sunny-yellow font-black font-heading uppercase text-lg mb-6 tracking-wide">Servicio al Cliente</h4>
            <ul className="space-y-4 text-sm font-bold uppercase tracking-wider">
              <li>
                <Link href="/envios" className="hover:text-retro-red transition-colors hover:pl-2 duration-200 block">
                  Información de Envíos
                </Link>
              </li>
              <li>
                <Link href="/devoluciones" className="hover:text-retro-red transition-colors hover:pl-2 duration-200 block">
                  Cambios y Devoluciones
                </Link>
              </li>
              <li>
                <Link href="/terminos" className="hover:text-retro-red transition-colors hover:pl-2 duration-200 block">
                  Términos y Condiciones
                </Link>
              </li>
              <li>
                <Link href="/privacidad" className="hover:text-retro-red transition-colors hover:pl-2 duration-200 block">
                  Política de Privacidad
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sunny-yellow font-black font-heading uppercase text-lg mb-6 tracking-wide">Contacto</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li className="flex items-start gap-3 group cursor-pointer hover:text-white transition-colors">
                <MapPin className="h-5 w-5 text-retro-red shrink-0 group-hover:animate-bounce" />
                <span>
                  Av. Providencia 1234, Oficina 505<br />
                  Santiago, Chile
                </span>
              </li>
              <li className="flex items-center gap-3 group">
                <Phone className="h-5 w-5 text-retro-red shrink-0 group-hover:rotate-12 transition-transform" />
                <a href="tel:+56912345678" className="hover:text-white transition-colors group-hover:underline decoration-retro-red underline-offset-4">
                  +56 9 1234 5678
                </a>
              </li>
              <li className="flex items-center gap-3 group">
                <Mail className="h-5 w-5 text-retro-red shrink-0 group-hover:scale-110 transition-transform" />
                <a href="mailto:contacto@tiendavinilos.cl" className="hover:text-white transition-colors group-hover:underline decoration-retro-red underline-offset-4">
                  contacto@tiendavinilos.cl
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t-2 border-warm-beige/10 bg-black/40">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs font-bold text-warm-beige/50 uppercase tracking-widest">
              © {currentYear} Tienda de Vinilos. All Rights Reserved.
            </p>
            <div className="flex items-center gap-4">
              <span className="text-xs font-bold text-warm-beige/50 uppercase mr-2 tracking-widest">Pagos Seguros:</span>
              <div className="flex gap-4 opacity-70 grayscale hover:grayscale-0 transition-all duration-300">
                {/* Payment Icons */}
                <div className="flex items-center gap-1 text-warm-beige hover:text-white transition-colors" title="Webpay">
                  <CreditCard className="h-6 w-6" />
                  <span className="text-xs font-black hidden sm:inline uppercase">Webpay</span>
                </div>
                <div className="flex items-center gap-1 text-warm-beige hover:text-white transition-colors" title="MercadoPago">
                  <CreditCard className="h-6 w-6" />
                  <span className="text-xs font-black hidden sm:inline uppercase">MercadoPago</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
