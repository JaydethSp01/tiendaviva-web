"use client";
export const dynamic = "force-dynamic";
import { useState } from "react";
import { ShoppingBag, Package, DollarSign, TrendingUp, Plus } from "lucide-react";
import { Hero } from "@/components/ui/Hero";
import { StatCard } from "@/components/ui/StatCard";
import { ChartCard } from "@/components/ui/ChartCard";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";

const MOCK = {
  stats: [
    { label: "Ventas hoy", value: "$4.820", icon: <DollarSign size={20} />, trend: { value: "14%", positive: true } },
    { label: "Pedidos", value: 86, icon: <ShoppingBag size={20} />, trend: { value: "9%", positive: true } },
    { label: "Productos activos", value: 248, icon: <Package size={20} /> },
    { label: "Ticket promedio", value: "$56", icon: <TrendingUp size={20} />, trend: { value: "3%", positive: false } },
  ],
  semana: [
    { label: "Lun", value: 520 }, { label: "Mar", value: 680 }, { label: "Mié", value: 610 },
    { label: "Jue", value: 840 }, { label: "Vie", value: 1120 }, { label: "Sáb", value: 1340 }, { label: "Dom", value: 720 },
  ],
  categorias: [
    { n: "Vestidos", p: 34 }, { n: "Calzado", p: 26 },
    { n: "Accesorios", p: 22 }, { n: "Abrigos", p: 18 },
  ],
  pedidos: [
    { cliente: "Valentina Ríos", detalle: "Vestido midi floral · 2 ítems", total: "$128", estado: "Pagado" },
    { cliente: "Camila Soto", detalle: "Botines de cuero · 1 ítem", total: "$95", estado: "Enviado" },
    { cliente: "Mariana Peña", detalle: "Bolso bandolera · 1 ítem", total: "$72", estado: "Pendiente" },
    { cliente: "Lucía Fernández", detalle: "Abrigo oversize · 3 ítems", total: "$210", estado: "Cancelado" },
  ],
};

const tone = (e: string) =>
  e === "Pagado" ? "success" : e === "Enviado" ? "info" : e === "Pendiente" ? "warning" : "danger";

export default function Page() {
  const [data] = useState(MOCK);
  return (
    <div className="space-y-6">
      <Hero
        title="Tu tienda hoy, Moda Store"
        subtitle="Llevas 86 pedidos y $4.820 en ventas. El fin de semana viene fuerte — buen momento para reponer."
        action={<Button variant="secondary" className="!bg-white !text-brand"><Plus size={16} /> Nuevo producto</Button>}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {(data.stats ?? []).map((s) => (
          <StatCard key={s.label} label={s.label} value={s.value} icon={s.icon} trend={s.trend} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <ChartCard className="lg:col-span-2" title="Ventas por día" subtitle="Últimos 7 días (USD)" data={data.semana} />
        <Card>
          <h3 className="mb-4 text-base font-semibold text-slate-900">Por categoría</h3>
          <div className="space-y-3">
            {(data.categorias ?? []).map((c) => (
              <div key={c.n}>
                <div className="mb-1 flex justify-between text-sm">
                  <span className="font-medium text-slate-700">{c.n}</span>
                  <span className="text-slate-500">{c.p}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full rounded-full bg-brand" style={{ width: `${c.p}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="!p-0">
        <div className="flex items-center justify-between border-b border-slate-100 p-5">
          <h3 className="text-base font-semibold text-slate-900">Pedidos recientes</h3>
          <Badge tone="brand">{data.pedidos?.length} hoy</Badge>
        </div>
        <ul className="divide-y divide-slate-100">
          {(data.pedidos ?? []).map((p, i) => (
            <li key={i} className="flex items-center gap-4 p-5">
              <Avatar name={p.cliente} />
              <div className="min-w-0 flex-1">
                <p className="font-medium text-slate-900">{p.cliente}</p>
                <p className="truncate text-sm text-slate-500">{p.detalle}</p>
              </div>
              <span className="hidden text-sm font-semibold text-slate-600 sm:block">{p.total}</span>
              <Badge tone={tone(p.estado)}>{p.estado}</Badge>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
