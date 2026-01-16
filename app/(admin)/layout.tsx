import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Panel - Tienda Vinilos",
  description: "Panel de administración para Tienda de Vinilos",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
    </>
  );
}
