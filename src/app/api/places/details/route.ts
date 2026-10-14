import { placeDetails, readPlacesBody } from "@/lib/places";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const body = await readPlacesBody(req);
  if (!body) {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  return placeDetails(String(body.placeId || ""), String(body.sessionToken || "").slice(0, 36));
}
