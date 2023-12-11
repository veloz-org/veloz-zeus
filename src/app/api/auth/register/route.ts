import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log({ body });

    return NextResponse.json({ msg: "hey" });
  } catch (e: any) {}
}
