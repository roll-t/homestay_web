"use client";

import { useSession, signOut } from "next-auth/react";

export default function ProfilePage() {
    const { data: session } = useSession();

    if (!session) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-gray-600 dark:text-gray-300">Bạn chưa đăng nhập.</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
            <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
                <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
                    Hồ Sơ Của Bạn
                </h2>

                <div className="mt-6 space-y-4">
                    <p className="text-gray-700 dark:text-gray-300">
                        <strong>Tên:</strong> {session.user?.name}
                    </p>
                    <p className="text-gray-700 dark:text-gray-300">
                        <strong>Email:</strong> {session.user?.email}
                    </p>
                    <p className="text-gray-700 dark:text-gray-300">
                        <strong>Vai trò:</strong> {session.user?.role || "Người dùng"}
                    </p>
                </div>

                <button
                    onClick={() => signOut()}
                    className="w-full mt-6 px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 transition"
                >
                    Đăng xuất
                </button>
            </div>
        </div>
    );
}
