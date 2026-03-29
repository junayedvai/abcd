import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getCookieName, isValidSession } from "@/lib/auth";
import { saveSiteContent } from "@/lib/data-store";
import { commitJsonFile } from "@/lib/github-sync";

function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

export async function POST(request) {
  const session = cookies().get(getCookieName())?.value;
  if (!session || !isValidSession(session)) return unauthorized();

  try {
    const { site } = await request.json();
    saveSiteContent(site);
    let github = { skipped: true };
    try {
      github = await commitJsonFile("data/site-content.json", site, "Update site content from GlobalDock admin");
    } catch (err) {
      github = { skipped: true, reason: err.message };
    }
    return NextResponse.json({ ok: true, ...github });
  } catch (err) {
    return NextResponse.json({ error: err.message || "Failed to save site content" }, { status: 500 });
  }
}
