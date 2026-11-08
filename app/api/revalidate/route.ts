import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

/**
 * Called by the CMS after content is saved or deleted, so edits show up on the
 * next page load instead of after the 60s cache window in lib/cms.ts.
 * Every page reads shared CMS data (settings, navigation), so the whole site is
 * refreshed rather than tracking which page a document appears on.
 */
export async function POST(request: Request) {
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "Revalidation is not configured." }, { status: 503 });
  }
  if (request.headers.get("x-revalidate-secret") !== secret) {
    return NextResponse.json({ error: "Invalid secret." }, { status: 401 });
  }

  revalidatePath("/", "layout");
  return NextResponse.json({ revalidated: true, at: Date.now() });
}
