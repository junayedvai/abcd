import { NextResponse } from "next/server";
import { getProducts } from "@/lib/data-store";
import { searchProducts } from "@/lib/search";

export async function GET(request) {
  const q = new URL(request.url).searchParams.get("q") || "";
  const result = searchProducts(getProducts(), q);
  return NextResponse.json(result);
}
