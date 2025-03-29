"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/utils/routes";
import Link from "next/link";
import { Loader2, LogIn } from "lucide-react"; // Thêm icon đẹp hơn

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        const result = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });

        if (result?.error) {
            setError(result.error || "Email hoặc mật khẩu không chính xác!");
            setLoading(false);
        } else {
            router.push(ROUTES.HOME);
        }
    };

    const handleGoogleLogin = async () => {
        setLoading(true);
        await signIn("google", { callbackUrl: ROUTES.HOME });
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
            <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
                <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
                    Đăng Nhập
                </h2>

                {error && <p className="mt-2 text-center text-red-500">{error}</p>}

                <form onSubmit={handleSubmit} className="mt-6">
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-2 mt-1 border rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>

                    <div className="mt-4">
                        <label className="block text-gray-700 dark:text-gray-300">Mật khẩu</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-2 mt-1 border rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full mt-6 px-4 py-2 text-white bg-blue-500 rounded-lg flex items-center justify-center 
                        ${loading ? "opacity-70 cursor-not-allowed" : "hover:bg-blue-600 transition"}`}
                    >
                        {loading ? <Loader2 className="animate-spin w-5 h-5 mr-2" /> : <LogIn className="w-5 h-5 mr-2" />}
                        Đăng nhập
                    </button>
                </form>

                <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300">
                            Hoặc đăng nhập bằng
                        </span>
                    </div>
                </div>

                <button
                    onClick={handleGoogleLogin}
                    disabled={loading}
                    className={`w-full mt-2 px-4 py-2 flex items-center justify-center bg-red-500 text-white rounded-lg 
                    ${loading ? "opacity-70 cursor-not-allowed" : "hover:bg-red-600 transition"}`}
                >
                    {loading ? <Loader2 className="animate-spin w-5 h-5 mr-2" /> : (
                        <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                            <path fill="#4285F4" d="M24 9.5c3.38 0 6.41 1.18 8.8 3.12l6.6-6.6C34.82 2.05 29.75 0 24 0 14.8 0 7.07 5.45 3.3 13.38l7.95 6.18C13.14 13.28 18.15 9.5 24 9.5z"/>
                            <path fill="#34A853" d="M46.15 24.5c0-1.6-.15-3.15-.45-4.65H24v9.3h12.6c-.55 2.78-2.07 5.12-4.35 6.72l7.05 5.48c4.1-3.8 6.45-9.4 6.45-16z"/>
                            <path fill="#FBBC05" d="M10.05 28.72c-1.1-3.28-1.1-6.88 0-10.15l-7.95-6.2C-2.55 17.85-2.55 30.12 2.1 38.02l7.95-6.2z"/>
                            <path fill="#EA4335" d="M24 48c6.5 0 11.97-2.15 15.97-5.85l-7.05-5.48c-2.15 1.45-4.88 2.3-8 2.3-5.85 0-10.86-3.78-12.75-9.05l-7.95 6.2C7.08 42.55 14.8 48 24 48z"/>
                        </svg>
                    )}
                    Đăng nhập với Google
                </button>

                <p className="mt-4 text-center text-gray-600 dark:text-gray-300">
                    Chưa có tài khoản?{" "}
                    <Link href={ROUTES.REGISTER} className="text-blue-500 hover:underline">
                        Đăng ký ngay
                    </Link>
                </p>
            </div>
        </div>
    );
}
