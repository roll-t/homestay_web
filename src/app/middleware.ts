import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: any) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token) {
        return NextResponse.redirect(new URL("/login", req.url)); // Chưa đăng nhập, chuyển hướng
    }

    const { pathname } = req.nextUrl;

    // Nếu là admin route nhưng user không phải admin => chặn truy cập
    if (pathname.startsWith("/admin") && token.role !== "admin") {
        return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    return NextResponse.next();
}

// Áp dụng middleware cho các route bắt đầu bằng "/admin"
export const config = {
    matcher: ["/admin/:path*"],
};
