import Doc from "@/app/(models)/Doc";
import { Types } from "mongoose";
import { NextResponse } from "next/server";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const doc = await Doc.findById(id);
  return NextResponse.json(doc, { status: 200 });
}

export async function DELETE(
  _: Request,
  { params }: { params: { id: Types.ObjectId } },
) {
  try {
    const { id } = params;
    await Doc.findByIdAndDelete(id);
    return NextResponse.json({ message: "Document Deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: Types.ObjectId } },
) {
  try {
    const { id } = params;
    const body = await req.json();
    const newData = body.newData;

    await Doc.findByIdAndUpdate(id, { ...newData });

    return NextResponse.json({ message: "Document Updated" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
}
