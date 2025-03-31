"use client";

import { useEffect, useState } from "react";
import { UserRole } from "@/utils/enum/userRole";
import { ROUTES } from "@/utils/routes";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

const listNav = [
    { name: "Home", path: ROUTES.HOME },
    { name: "About", path: ROUTES.ABOUT },
    { name: "Contact", path: ROUTES.CONTACT },
];

export default function Navbar({ userRole }: { userRole: UserRole }) {
    const { resolvedTheme } = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            setVisible((prev) => window.scrollY < 10 || prevScrollPos > window.scrollY);
            setPrevScrollPos(window.scrollY);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [prevScrollPos]);

    const isAdmin = userRole === UserRole.ADMIN;
    const isAuthenticated = userRole !== UserRole.GUEST;

    console.log (resolvedTheme);

    return (
        <motion.header
            suppressHydrationWarning={true}
            initial={{ y: 0 }}
            animate={{ y: visible ? 0 : "-100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={`fixed top-0 left-0 w-full z-50 transition-transform shadow-md ${resolvedTheme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"
                }`}
        >
            <div className="py-4 px-6 md:px-20 flex justify-between items-center">
                <h2 className="text-lg font-bold">NhaCuaOc</h2>

                <ul className="hidden md:flex justify-center items-center space-x-6">
                    {listNav.map(({ name, path }) => (
                        <Link key={path} className="px-4 py-2 hover:text-blue-600" href={path}>
                            {name}
                        </Link>
                    ))}
                </ul>

                <div className="hidden md:flex items-center space-x-4">
                    {isAdmin && (
                        <Link
                            className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 transition"
                            href="/admin"
                        >
                            Admin Dashboard
                        </Link>
                    )}
                    {isAuthenticated ? (
                        <Link href={ROUTES.PROFILE} className="px-4 py-2 text-gray-700 hover:text-black transition">
                            Profile
                        </Link>
                    ) : (
                        <Link href={ROUTES.LOGIN} className="px-4 py-2 text-white bg-blue-900 rounded-lg hover:bg-blue-600 transition">
                            Login
                        </Link>
                    )}
                </div>

                <button
                    className="md:hidden p-2 rounded-md focus:outline-none"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {isOpen && (
                <div
                    className={`md:hidden absolute top-16 left-0 w-full shadow-lg py-4 px-6 flex flex-col items-center space-y-4 
                        ${resolvedTheme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"}
                    `}
                >
                    {listNav.map(({ name, path }) => (
                        <Link key={path} className="block hover:text-blue-600" href={path} onClick={() => setIsOpen(false)}>
                            {name}
                        </Link>
                    ))}
                    {isAdmin && (
                        <Link className="block px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 transition" href="/admin" onClick={() => setIsOpen(false)}>
                            Admin Dashboard
                        </Link>
                    )}
                    {isAuthenticated ? (
                        <Link href={ROUTES.PROFILE} className="block px-4 py-2 hover:text-black transition" onClick={() => setIsOpen(false)}>
                            Profile
                        </Link>
                    ) : (
                        <Link href={ROUTES.LOGIN} className="block px-4 py-2 text-white bg-blue-900 rounded-lg hover:bg-blue-600 transition" onClick={() => setIsOpen(false)}>
                            Login
                        </Link>
                    )}
                </div>
            )}
        </motion.header>
    );
}