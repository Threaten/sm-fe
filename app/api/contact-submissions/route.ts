import { NextResponse } from "next/server";
import { backendUrl } from "@/lib/backend";

export async function POST(request: Request) {
  if (!backendUrl) {
    return NextResponse.json(
      { error: "The backend URL is not configured." },
      { status: 503 },
    );
  }

  try {
    const body = await request.json();
    const response = await fetch(`${backendUrl}/api/contact-submissions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      cache: "no-store",
    });
    const responseBody = await response.text();

    return new NextResponse(responseBody || null, {
      status: response.status,
      headers: {
        "Content-Type":
          response.headers.get("content-type") ?? "application/json",
      },
    });
  } catch {
    return NextResponse.json(
      { error: "The backend could not be reached." },
      { status: 502 },
    );
  }
}
