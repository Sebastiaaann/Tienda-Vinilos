import Header from "@/components/store/Header";
import ScrollToTop from "@/components/ui/ScrollToTop";

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-background font-sans antialiased">
      <ScrollToTop />
      <Header />
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}
