import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "@/app/lib/db"; // Import kết nối database
import User from "@/app/models/User"; // Import model User
import bcrypt from "bcryptjs"; // Import thư viện mã hóa mật khẩu
import GoogleProvider from "next-auth/providers/google";
import { UserRole } from "@/utils/enum/userRole";

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
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
        async signIn({ user, account }) {
            try {
                await connectDB(); // Kết nối MongoDB

                if (account?.provider === "google") {
                    let existingUser = await User.findOne({ email: user.email });

                    if (!existingUser) {
                        // 🔹 Lưu tài khoản Google vào MongoDB nếu chưa tồn tại
                        existingUser = new User({
                            name: user.name,
                            email: user.email,
                            provider: "google",
                            providerAccountId: account?.sub, // 🛠 Lấy provider ID từ Google
                            role: "user", // 🛠 Quyền mặc định
                            photoUrl: user.image,
                        });

                        await existingUser.save(); // Lưu vào MongoDB
                    }

                    user.id = existingUser._id.toString();
                    user.role = existingUser.role; // Gán role để dùng trong session
                }

                return true;
            } catch (error) {
                console.error("🔥 Lỗi khi xử lý đăng nhập với Google:", error);
                return false; // Trả về false nếu có lỗi
            }
        },


        async jwt({ token, user, account }) {
            if (user) {
                console.log("Google User:", user); // ✅ Kiểm tra dữ liệu trả về từ Google
                console.log("Account:", account); // ✅ Kiểm tra accessToken

                token.id = user.id;
                token.role = user.role; // Lưu role vào token
                token.accessToken = account?.access_token; // Lưu access token
            }
            return token;
        },

        async session({ session, token }) {
            session.user.id = token.id as string;
            session.user.role = (token.role as "user" | "admin") || "user";   // 🛠 Đảm bảo có giá trị mặc định
            session.accessToken = token.accessToken as string | undefined;
            return session;
        },
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
};

// 🔹 Định nghĩa lại các hàm hỗ trợ
async function findUserByEmail(email: string) {
    await connectDB(); // Kết nối database
    return await User.findOne({ email });
}

async function verifyPassword(password: string, hashedPassword: string) {
    return await bcrypt.compare(password, hashedPassword);
}
