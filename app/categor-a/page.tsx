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

type Categoria = {
  nombre: string;
  productos: number;
  participacion: number;
  estado: "Visible" | "Oculta";
};

const MOCK: Categoria[] = [
  { nombre: "Vestidos", productos: 68, participacion: 34, estado: "Visible" },
  { nombre: "Calzado", productos: 52, participacion: 26, estado: "Visible" },
  { nombre: "Accesorios", productos: 44, participacion: 22, estado: "Visible" },
  { nombre: "Abrigos", productos: 36, participacion: 18, estado: "Visible" },
  { nombre: "Edición limitada", productos: 8, participacion: 4, estado: "Oculta" },
];

export default function CategoriaPage() {
  const router = useRouter();
  const [rows] = useState(MOCK);

  const columns: Column<Categoria>[] = [
    {
      key: "nombre",
      header: "Categoría",
      render: (r) => (
        <div className="flex items-center gap-3">
          <Avatar name={r.nombre} />
          <span className="font-medium text-slate-900">{r.nombre}</span>
        </div>
      ),
    },
    { key: "productos", header: "Productos", align: "right", render: (r) => <span className="text-slate-600">{r.productos}</span> },
    {
      key: "participacion",
      header: "Participación",
      render: (r) => (
        <div className="flex items-center gap-3">
          <div className="h-2 w-28 overflow-hidden rounded-full bg-slate-100">
            <div className="h-full rounded-full bg-brand" style={{ width: `${r.participacion}%` }} />
          </div>
          <span className="text-sm text-slate-500">{r.participacion}%</span>
        </div>
      ),
    },
    { key: "estado", header: "Estado", render: (r) => <Badge tone={r.estado === "Visible" ? "success" : "neutral"}>{r.estado}</Badge> },
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
        title="Categorías"
        subtitle="Organiza tu catálogo por colecciones."
        action={
          <Button className="cursor-pointer" onClick={() => router.push("/categor-a/create")}>
            <Plus size={16} /> Nueva
          </Button>
        }
      />
      <Card className="!p-0">
        <DataTable columns={columns} rows={rows} empty="Aún no hay categorías." />
      </Card>
    </div>
  );
}
