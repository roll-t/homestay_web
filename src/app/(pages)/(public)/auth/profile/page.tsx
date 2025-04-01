"use client";

import { useSession, signOut } from "next-auth/react";
import { motion } from "framer-motion";

export default function ProfilePage() {
    const { data: session, status } = useSession();

    // Trạng thái loading
    if (status === "loading") {
        return <p className="text-gray-600 dark:text-gray-300">Đang tải...</p>;
    }

    // Trường hợp người dùng chưa đăng nhập
    if (!session) {
        return <p className="text-gray-600 dark:text-gray-300">Bạn chưa đăng nhập.</p>;
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <motion.div
                className="w-full max-w-md bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
                    Hồ Sơ Của Bạn
                </h2>

                {/* Avatar hoặc ảnh đại diện */}
                {session.user?.image ? (
                    <motion.img
                        src={session.user.image}
                        alt="Avatar"
                        className="w-24 h-24 rounded-full mx-auto my-10"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                    />
                ) : (
                    <div className="w-24 h-24 rounded-full mx-auto my-10 bg-gray-300 flex items-center justify-center text-white">
                        <span>{session.user?.name?.[0]}</span> {/* Hiển thị chữ cái đầu của tên người dùng */}
                    </div>
                )}

                <p className="text-gray-700 dark:text-gray-300 my-2">
                    <strong>Tên:</strong> {session.user?.name}
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                    <strong>Email:</strong> {session.user?.email}
                </p>

                <motion.button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="w-full mt-6 px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 transition"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Đăng xuất
                </motion.button>
            </motion.div>
        </div>
    );
}
