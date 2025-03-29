"use client";

import { useSession, signOut } from "next-auth/react";

export default function ProfilePage() {
    const { data: session, status } = useSession();

    if (status === "loading") {
        return <p className="text-gray-600 dark:text-gray-300">Đang tải...</p>;
    }

    if (!session) {
        return <p className="text-gray-600 dark:text-gray-300">Bạn chưa đăng nhập.</p>;
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
            <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
                <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
                    Hồ Sơ Của Bạn
                </h2>

                {session.user?.image && (
                    <img
                        src={session.user.image}
                        alt="Avatar"
                        className="w-24 h-24 rounded-full mx-auto"
                    />
                )}
                <p className="text-gray-700 dark:text-gray-300">
                    <strong>Tên:</strong> {session.user?.name}
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                    <strong>Email:</strong> {session.user?.email}
                </p>

                <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="w-full mt-6 px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 transition"
                >
                    Đăng xuất
                </button>
            </div>
        </div>
    );
}
