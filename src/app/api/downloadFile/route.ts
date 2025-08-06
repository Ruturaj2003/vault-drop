import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { dummyUrl, realUrl } = body;
    if (!dummyUrl || !realUrl) {
      return NextResponse.json(
        { error: "Missing One or more URLS" },
        { status: 400 }
      );
    }
    // Will help to keep track and dont have to check indivudiually
    const [dummyBuffer, realBuffer] = await Promise.all([
      fetchFileBuffer(dummyUrl),
      fetchFileBuffer(realUrl),
    ]);

    return NextResponse.json(
      {
        dummyBuffer: dummyBuffer.toString("base64"),
        realBuffer: realBuffer.toString("base64"),
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error", dota: error },
      { status: 500 }
    );
  }
}

async function fetchFileBuffer(url: string): Promise<Buffer> {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch file");
  const arrayBuffer = await res.arrayBuffer();
  return Buffer.from(arrayBuffer);
}
