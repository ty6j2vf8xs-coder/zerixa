import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import {
  BOQ_BUCKET,
  isValidBoqFileSize,
  sanitizeBoqFileName,
} from "@/lib/boq-storage";
import { getSupabaseAdmin } from "@/lib/supabase";

type UploadUrlPayload = {
  fileName?: string;
  fileSize?: number;
};

export async function POST(request: Request) {
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json(
      { error: "Lead storage is not configured yet." },
      { status: 503 },
    );
  }

  let body: UploadUrlPayload;
  try {
    body = (await request.json()) as UploadUrlPayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const fileSize = body.fileSize ?? 0;
  const fileName = sanitizeBoqFileName(body.fileName ?? "boq.pdf");

  if (!isValidBoqFileSize(fileSize)) {
    return NextResponse.json(
      { error: "PDF must be between 1 byte and 20 MB." },
      { status: 400 },
    );
  }

  const path = `${randomUUID()}/${fileName}`;
  const { data, error } = await supabase.storage
    .from(BOQ_BUCKET)
    .createSignedUploadUrl(path);

  if (error || !data) {
    console.error("BOQ signed upload URL failed:", error?.message);
    return NextResponse.json({ error: "Could not prepare PDF upload." }, { status: 500 });
  }

  return NextResponse.json({
    path: data.path,
    token: data.token,
    signedUrl: data.signedUrl,
    fileName,
  });
}
