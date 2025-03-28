import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import User from "@/app/models/User";
import { connectDB } from "@/app/lib/db";
import { UserRole } from "@/utils/enum/userRole";

export default NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "user@example.com" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                await connectDB();

                if (!credentials || !credentials.email || !credentials.password) {
                    throw new Error("Thông tin đăng nhập không hợp lệ!");
                }

                const user = await User.findOne({ email: credentials.email });

                if (!user) {
                    throw new Error("User không tồn tại!");
                }

                const isValidPassword = await bcrypt.compare(credentials.password, user.password);
                if (!isValidPassword) {
                    throw new Error("Sai mật khẩu!");
                }

                return {
                    id: user._id.toString(),
                    name: user.name,
                    email: user.email,
                    role: user.role, // ✅ Đảm bảo role được trả về
                };
            }
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = user.role; // Thêm role vào token
            }
            return token;
        },
        async session({ session, token }) {
            if (session?.user) {
                session.user.role = (token.role as UserRole.USER) || UserRole.ADMIN;// ✅ Ép kiểu role
            }
            return session;
        }
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/login",
        error: "/login",
    },
});
