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

type Pedido = {
  codigo: string;
  cliente: string;
  items: number;
  total: number;
  estado: "Pagado" | "Enviado" | "Pendiente" | "Cancelado";
};

const MOCK: Pedido[] = [
  { codigo: "#MS-1042", cliente: "Valentina Ríos", items: 2, total: 128.0, estado: "Pagado" },
  { codigo: "#MS-1041", cliente: "Camila Soto", items: 1, total: 95.0, estado: "Enviado" },
  { codigo: "#MS-1040", cliente: "Mariana Peña", items: 1, total: 72.0, estado: "Pendiente" },
  { codigo: "#MS-1039", cliente: "Lucía Fernández", items: 3, total: 210.0, estado: "Cancelado" },
  { codigo: "#MS-1038", cliente: "Daniela Castro", items: 2, total: 113.5, estado: "Pagado" },
  { codigo: "#MS-1037", cliente: "Sofía Herrera", items: 1, total: 49.5, estado: "Enviado" },
];

const tone = (e: Pedido["estado"]) =>
  e === "Pagado" ? "success" : e === "Enviado" ? "info" : e === "Pendiente" ? "warning" : "danger";

export default function PedidoPage() {
  const router = useRouter();
  const [rows] = useState(MOCK);

  const columns: Column<Pedido>[] = [
    { key: "codigo", header: "Pedido", render: (r) => <span className="font-medium text-slate-900">{r.codigo}</span> },
    {
      key: "cliente",
      header: "Cliente",
      render: (r) => (
        <div className="flex items-center gap-3">
          <Avatar name={r.cliente} />
          <span className="text-slate-700">{r.cliente}</span>
        </div>
      ),
    },
    { key: "items", header: "Ítems", align: "right", render: (r) => <span className="text-slate-600">{r.items}</span> },
    { key: "total", header: "Total", align: "right", render: (r) => <span className="font-semibold text-slate-900">${r.total.toFixed(2)}</span> },
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
        title="Pedidos"
        subtitle="Seguimiento de compras y estados de envío."
        action={
          <Button className="cursor-pointer" onClick={() => router.push("/pedido/create")}>
            <Plus size={16} /> Nuevo
          </Button>
        }
      />
      <Card className="!p-0">
        <DataTable columns={columns} rows={rows} empty="Aún no hay pedidos." />
      </Card>
    </div>
  );
}
