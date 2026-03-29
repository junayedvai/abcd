import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getCookieName, isValidSession } from "@/lib/auth";
import { saveProducts } from "@/lib/data-store";
import { commitJsonFile } from "@/lib/github-sync";

function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

export async function POST(request) {
  const session = cookies().get(getCookieName())?.value;
  if (!session || !isValidSession(session)) return unauthorized();

  try {
    const { products } = await request.json();
    saveProducts(products);
    let github = { skipped: true };
    try {
      github = await commitJsonFile("data/products.json", products, "Update products from GlobalDock admin");
    } catch (err) {
      github = { skipped: true, reason: err.message };
    }
    return NextResponse.json({ ok: true, ...github });
  } catch (err) {
    return NextResponse.json({ error: err.message || "Failed to save products" }, { status: 500 });
  }
}
