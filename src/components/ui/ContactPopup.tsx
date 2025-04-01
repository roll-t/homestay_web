"use client";

import { useState } from "react";
import { X, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function ContactPopup() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="flex flex-col items-end gap-3">
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition flex items-center gap-2"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                <MessageCircle className="w-6 h-6" />
                <span className="hidden sm:inline">Liên hệ</span> {/* Ẩn chữ trên mobile */}
            </motion.button>

            {/* Popup liên hệ */}
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="bg-[#E3F2FD] shadow-xl p-5 rounded-xl w-[90%] sm:w-64 flex flex-col gap-4 border border-gray-300 relative"
                >
                    {/* Nút đóng */}
                    <div
                        onClick={() => setIsOpen(false)}
                        className="absolute top-2 right-2 p-1 bg-transparent border-none transition"
                    >
                        <X className="w-6 h-6 text-gray-500 hover:text-gray-700" />
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900 text-center">Liên hệ với shop</h3>

                    {/* Messenger */}
                    <a
                        href="https://m.me/phuoc.truong.36377"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-3 bg-white hover:bg-blue-100 text-blue-700 p-3 rounded-lg shadow-md transition hover:scale-105 border border-blue-400"
                    >
                        <img src="/messenger.png" alt="Messenger" className="w-6 h-6" />
                        <span className="group-hover:text-blue-950 transition">Chat với Messenger</span>
                    </a>

                    {/* Gọi điện thoại */}
                    <a
                        href="tel:0812608562"
                        className="group flex items-center gap-3 bg-white hover:bg-green-100 text-green-700 p-3 rounded-lg shadow-md transition hover:scale-105 border border-green-400"
                    >
                        <img src="/telephone.png" alt="Gọi điện thoại" className="w-6 h-6" />
                        <span className="group-hover:text-green-950 transition">Gọi điện thoại</span>
                    </a>
                </motion.div>
            )}
        </div>
    );
}
