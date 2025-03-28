import NextAuth from "next-auth";

declare module "next-auth" {
    interface User {
        id: string;
        name: string;
        email: string;
        role: "user" | "admin"; 
    }

    interface Session {
        user: User;
    }
}
