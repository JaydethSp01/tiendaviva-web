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

type Item = {
  producto: string;
  talla: string;
  cantidad: number;
  precio: number;
  estado: "En carrito" | "Reservado";
};

const MOCK: Item[] = [
  { producto: "Vestido midi floral", talla: "M", cantidad: 1, precio: 64.0, estado: "En carrito" },
  { producto: "Botines de cuero", talla: "38", cantidad: 1, precio: 95.0, estado: "Reservado" },
  { producto: "Bolso bandolera", talla: "Única", cantidad: 2, precio: 72.0, estado: "En carrito" },
  { producto: "Blusa de seda", talla: "S", cantidad: 1, precio: 49.5, estado: "En carrito" },
];

export default function CarritoPage() {
  const router = useRouter();
  const [rows] = useState(MOCK);
  const total = (rows ?? []).reduce((acc, r) => acc + r.precio * r.cantidad, 0);

  const columns: Column<Item>[] = [
    {
      key: "producto",
      header: "Producto",
      render: (r) => (
        <div className="flex items-center gap-3">
          <Avatar name={r.producto} />
          <div>
            <p className="font-medium text-slate-900">{r.producto}</p>
            <p className="text-xs text-slate-500">Talla {r.talla}</p>
          </div>
        </div>
      ),
    },
    { key: "cantidad", header: "Cant.", align: "right", render: (r) => <span className="text-slate-600">{r.cantidad}</span> },
    { key: "precio", header: "Precio", align: "right", render: (r) => <span className="font-semibold text-slate-900">${r.precio.toFixed(2)}</span> },
    { key: "estado", header: "Estado", render: (r) => <Badge tone={r.estado === "Reservado" ? "info" : "warning"}>{r.estado}</Badge> },
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
        title="Carrito"
        subtitle="Ítems en proceso de compra."
        action={
          <Button className="cursor-pointer" onClick={() => router.push("/carrito/create")}>
            <Plus size={16} /> Nuevo
          </Button>
        }
      />
      <Card className="!p-0">
        <DataTable columns={columns} rows={rows} empty="El carrito está vacío." />
      </Card>
      <div className="flex justify-end">
        <Card className="w-full max-w-xs">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-500">Total estimado</span>
            <span className="text-2xl font-bold tracking-tight text-slate-900">${total.toFixed(2)}</span>
          </div>
        </Card>
      </div>
    </div>
  );
}
