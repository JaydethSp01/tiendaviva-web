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

type Cliente = {
  nombre: string;
  email: string;
  pedidos: number;
  gastado: number;
  segmento: "VIP" | "Recurrente" | "Nuevo";
};

const MOCK: Cliente[] = [
  { nombre: "Valentina Ríos", email: "valentina.rios@example.com", pedidos: 14, gastado: 1820.0, segmento: "VIP" },
  { nombre: "Camila Soto", email: "camila.soto@example.com", pedidos: 6, gastado: 540.5, segmento: "Recurrente" },
  { nombre: "Mariana Peña", email: "mariana.pena@example.com", pedidos: 2, gastado: 144.0, segmento: "Nuevo" },
  { nombre: "Lucía Fernández", email: "lucia.fernandez@example.com", pedidos: 9, gastado: 1130.0, segmento: "VIP" },
  { nombre: "Daniela Castro", email: "daniela.castro@example.com", pedidos: 4, gastado: 318.0, segmento: "Recurrente" },
];

const tone = (s: Cliente["segmento"]) =>
  s === "VIP" ? "brand" : s === "Recurrente" ? "info" : "neutral";

export default function ClientePage() {
  const router = useRouter();
  const [rows] = useState(MOCK);

  const columns: Column<Cliente>[] = [
    {
      key: "nombre",
      header: "Cliente",
      render: (r) => (
        <div className="flex items-center gap-3">
          <Avatar name={r.nombre} />
          <div>
            <p className="font-medium text-slate-900">{r.nombre}</p>
            <p className="text-xs text-slate-500">{r.email}</p>
          </div>
        </div>
      ),
    },
    { key: "pedidos", header: "Pedidos", align: "right", render: (r) => <span className="text-slate-600">{r.pedidos}</span> },
    { key: "gastado", header: "Total gastado", align: "right", render: (r) => <span className="font-semibold text-slate-900">${r.gastado.toFixed(2)}</span> },
    { key: "segmento", header: "Segmento", render: (r) => <Badge tone={tone(r.segmento)}>{r.segmento}</Badge> },
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
        title="Clientes"
        subtitle="Tu base de compradoras y su actividad."
        action={
          <Button className="cursor-pointer" onClick={() => router.push("/cliente/create")}>
            <Plus size={16} /> Nuevo
          </Button>
        }
      />
      <Card className="!p-0">
        <DataTable columns={columns} rows={rows} empty="Aún no hay clientes." />
      </Card>
    </div>
  );
}
