import Doc from "../../(models)/Doc";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const docData = body.docData;
    await Doc.create(docData);
    return NextResponse.json({ message: "Tab Created" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error", err: error }, { status: 500 });
  }
}

export async function GET() {
  try {
    const docs = await Doc.find();
    return NextResponse.json({ docs }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", err: error }, { status: 500 });
  }
}
