"use client";
export const dynamic = "force-dynamic";
import { CheckoutCart } from "@/components/ui/CheckoutCart";
import { PageHeader } from "@/components/ui/PageHeader";
export default function CheckoutPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Carrito y pago" subtitle="Revisa tu pedido, aplica cupones y paga seguro." />
      <CheckoutCart />
    </div>
  );
}
