import { connectDB } from "@/src/app/lib/db";
import User from "@/src/app/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    await connectDB();
    try {
        const { name, email, password } = await req.json();

        // Kiểm tra email đã tồn tại chưa
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ error: "Email đã tồn tại!" }, { status: 400 });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Tạo user mới
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        return NextResponse.json({ message: "Đăng ký thành công!" }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Lỗi server!" }, { status: 500 });
    }
}
