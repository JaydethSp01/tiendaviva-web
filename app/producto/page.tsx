"use client";
export const dynamic = "force-dynamic";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { DataTable, type Column } from "@/components/ui/DataTable";
import { Badge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";

type Producto = {
  nombre: string;
  categoria: string;
  precio: number;
  stock: number;
  estado: "Activo" | "Agotado" | "Borrador";
};

const MOCK: Producto[] = [
  { nombre: "Vestido midi floral", categoria: "Vestidos", precio: 64.0, stock: 18, estado: "Activo" },
  { nombre: "Botines de cuero", categoria: "Calzado", precio: 95.0, stock: 7, estado: "Activo" },
  { nombre: "Bolso bandolera", categoria: "Accesorios", precio: 72.0, stock: 0, estado: "Agotado" },
  { nombre: "Abrigo oversize lana", categoria: "Abrigos", precio: 138.0, stock: 12, estado: "Activo" },
  { nombre: "Blusa de seda", categoria: "Tops", precio: 49.5, stock: 24, estado: "Activo" },
  { nombre: "Falda plisada", categoria: "Faldas", precio: 41.0, stock: 0, estado: "Borrador" },
];

const tone = (e: Producto["estado"]) =>
  e === "Activo" ? "success" : e === "Agotado" ? "danger" : "neutral";

export default function ProductoPage() {
  const router = useRouter();
  const [rows] = useState(MOCK);

  const columns: Column<Producto>[] = [
    {
      key: "nombre",
      header: "Producto",
      render: (r) => (
        <div className="flex items-center gap-3">
          <Avatar name={r.nombre} />
          <span className="font-medium text-slate-900">{r.nombre}</span>
        </div>
      ),
    },
    { key: "categoria", header: "Categoría", render: (r) => <span className="text-slate-600">{r.categoria}</span> },
    { key: "precio", header: "Precio", align: "right", render: (r) => <span className="font-semibold text-slate-900">${r.precio.toFixed(2)}</span> },
    { key: "stock", header: "Stock", align: "right", render: (r) => <span className="text-slate-600">{r.stock}</span> },
    { key: "estado", header: "Estado", render: (r) => <Badge tone={tone(r.estado)}>{r.estado}</Badge> },
    {
      key: "acciones",
      header: "",
      align: "right",
      render: () => (
        <div className="flex justify-end gap-1">
          <Button variant="ghost" className="cursor-pointer">Editar</Button>
          <Button variant="danger" className="cursor-pointer">Eliminar</Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Productos"
        subtitle="Catálogo y disponibilidad de tu tienda."
        action={
          <Button className="cursor-pointer" onClick={() => router.push("/producto/create")}>
            <Plus size={16} /> Nuevo
          </Button>
        }
      />
      <Card className="!p-0">
        <DataTable columns={columns} rows={rows} empty="Aún no hay productos." />
      </Card>
    </div>
  );
}
