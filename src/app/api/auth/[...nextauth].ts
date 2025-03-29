import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import User from "@/app/models/User";
import { connectDB } from "@/app/lib/db";

export default NextAuth({
    providers: [
        // 🔹 Google OAuth Provider
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),

        // 🔹 Email/Password Login
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
                    role: user.role,
                };
            }
        }),
    ],
    callbacks: {
        async signIn({ user, account }) {
            await connectDB(); // Kết nối MongoDB

            if (account?.provider === "google") {
                let existingUser = await User.findOne({ email: user.email });

                if (!existingUser) {
                    // 🔹 Lưu tài khoản Google vào MongoDB nếu chưa tồn tại
                    existingUser = new User({
                        name: user.name,
                        email: user.email,
                        image: user.image,
                        provider: "google",
                        providerAccountId: account.providerAccountId,
                        role: "user", // 🛠 Có thể đặt quyền mặc định
                    });

                    await existingUser.save(); // Lưu vào MongoDB
                }

                user.id = existingUser._id.toString();
            }
            return true;
        },

        async jwt({ token, user, account }) {
            if (user) {
                token.id = user.id;
                token.accessToken = account?.access_token;
            }
            return token;
        },

        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string;
                session.accessToken = token.accessToken as string | undefined;
            }
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/login",
        error: "/login",
    },
});
