import { connectDB } from "@/app/lib/db";
import User from "@/app/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    await connectDB();
    try {
        const { name, email, password, role } = await req.json();

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ error: "Email đã tồn tại!" }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword, role: role || "user" });
        await newUser.save();

        return NextResponse.json({ message: "Đăng ký thành công!" }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Lỗi server!" }, { status: 500 });
    }
}
