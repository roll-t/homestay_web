import { connectDB } from "@/app/lib/db";
import User from "@/app/models/User";
import { NextResponse } from "next/server";

export async function GET() {
    await connectDB();
    try {
        const users = await User.find().select("-password"); // Ẩn password
        return NextResponse.json(users);
    } catch (error) {
        return NextResponse.json({ error: "Lỗi khi lấy danh sách người dùng!" }, { status: 500 });
    }
}
