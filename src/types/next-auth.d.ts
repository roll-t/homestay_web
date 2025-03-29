import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface User {
        id: string;
        name: string;
        email: string;
        role: "user" | "admin";
    }

    interface Session {
        user: User & DefaultSession["user"];
        accessToken?: string; // Thêm accessToken vào session
    }

    interface JWT {
        id: string;
        accessToken?: string;
    }
}
