import { connectDB } from "@/app/lib/db";
import User from "@/app/models/User"; // Model User
import bcrypt from "bcryptjs"; // Dùng để so sánh password

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    try {
        await connectDB(); // Kết nối MongoDB

        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "Vui lòng nhập đầy đủ thông tin!" });
        }

        // Kiểm tra xem tài khoản có tồn tại không
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: "Tài khoản không tồn tại!" });
        }

        // Kiểm tra mật khẩu
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Mật khẩu không chính xác!" });
        }

        return res.status(200).json({ message: "Đăng nhập thành công!", user });

    } catch (error) {
        console.error("Lỗi đăng nhập:", error);
        return res.status(500).json({ error: "Lỗi server!" });
    }
}
