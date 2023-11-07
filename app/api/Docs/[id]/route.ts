import Doc from "@/app/(models)/Doc";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  try {
    const { id } = params;
    await Doc.findByIdAndDelete(id);
    return NextResponse.json({ message: "Document Deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
}
