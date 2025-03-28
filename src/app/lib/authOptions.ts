import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "@/app/lib/db"; // Import kết nối database
import User from "@/app/models/User"; // Import model User
import bcrypt from "bcryptjs"; // Import thư viện mã hóa mật khẩu

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Email và mật khẩu không được để trống!");
                }
                const user = await findUserByEmail(credentials?.email);
                if (!user || !(await verifyPassword(credentials?.password, user.password))) {
                    throw new Error("Email hoặc mật khẩu không chính xác!");
                }
                return { id: user.id, name: user.name, email: user.email, role: user.role };
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }) {
            if (session?.user) {
                session.user.role = token.role as "admin" | "user";
            }
            return session;
        },
    },
    session: {
        strategy: "jwt",
    },
};

// 🔹 Định nghĩa lại các hàm hỗ trợ
async function findUserByEmail(email: string) {
    await connectDB(); // Kết nối database
    return await User.findOne({ email });
}

async function verifyPassword(password: string, hashedPassword: string) {
    return await bcrypt.compare(password, hashedPassword);
}
