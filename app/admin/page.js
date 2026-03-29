import { getProducts, getSiteContent } from "@/lib/data-store";
import AdminClient from "./AdminClient";

export const dynamic = "force-dynamic";

export default function AdminPage() {
  const products = getProducts();
  const site = getSiteContent();
  return <AdminClient initialProducts={products} initialSite={site} />;
}
