import { connectDB } from "@/app/lib/db";
import { NextResponse } from "next/server";

//---> chheck connecting with monggoDB
export async function GET() {
    await connectDB();
    return NextResponse.json({ message: "MongoDB đã kết nối thành công!" });
}