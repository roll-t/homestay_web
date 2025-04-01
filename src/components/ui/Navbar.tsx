"use client";

import { useEffect, useState, useRef } from "react";
import { UserRole } from "@/utils/enum/userRole";
import { ROUTES } from "@/utils/routes";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";


const listNav = [
    { name: "Home", id: ROUTES.HOME },
    { name: "About", id: ROUTES.ABOUT },
    { name: "Service", id: ROUTES.SERVICE },
    { name: "Contact", id: ROUTES.CONTACT },
];

export default function Navbar({ userRole }: { userRole: UserRole }) {
    const [isOpen, setIsOpen] = useState(false);
    const [visible, setVisible] = useState(true);
    const prevScrollPos = useRef(0);



    useEffect(() => {
        const handleScroll = () => {
            setVisible(window.scrollY < 10 || prevScrollPos.current > window.scrollY);
            prevScrollPos.current = window.scrollY;
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const isAdmin = userRole === UserRole.ADMIN;
    const isAuthenticated = userRole !== UserRole.GUEST;

    // Hàm xử lý scroll mượt đến section tương ứng
    const handleScroll = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        setIsOpen(false); // Đóng menu trên mobile sau khi click
    };

    return (
        <motion.header
            suppressHydrationWarning={true}
            initial={{ y: 0 }}
            animate={{ y: visible ? 0 : "-100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed top-0 left-0 w-full z-50 transition-transform shadow-md bg-primary text-foreground"
        >
            <div className="py-4 px-6 md:px-20 flex justify-between items-center">
                <h2 className="text-lg font-bold text-primary text-text-light-color dark:text-text-dark-color">NhaCuaOc</h2>

                {/* Desktop Menu */}

                {/* Desktop Menu */}
                <ul className="hidden md:flex justify-center items-center space-x-6">
                    {listNav.map(({ name, id }) => (
                        <button
                            key={id}
                            onClick={() => handleScroll(id)}
                            className="px-4 py-2 transition hover:text-muted text-primary"
                        >
                            {name}
                        </button>
                    ))}
                </ul>

                {/* User Actions */}
                <div className="hidden md:flex items-center space-x-4">
                    {isAdmin && (
                        <Link className="px-4 py-2 bg-danger text-primary rounded-lg hover:bg-danger transition" href="/admin">
                            Admin Dashboard
                        </Link>
                    )}
                    {isAuthenticated ? (
                        <Link href={ROUTES.PROFILE} className="px-4 py-2 text-primary hover:text-accent transition">
                            Profile
                        </Link>
                    ) : (
                        <Link href={ROUTES.LOGIN} className="px-4 py-2 text-primary bg-muted text-foreground rounded-lg hover:bg-muted transition">
                            Login
                        </Link>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button className="md:hidden p-2 rounded-md focus:outline-none" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X className="w-6 h-6 text-foreground" /> : <Menu className="w-6 h-6 text-foreground" />}
                </button>
            </div>

            {/* Mobile Menu */}
            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden absolute top-16 left-0 w-full bg-primary shadow-lg py-4 px-6 flex flex-col items-center space-y-4">
                    {listNav.map(({ name, id }) => (
                        <button
                            key={id}
                            onClick={() => handleScroll(id)}
                            className="block transition hover:text-muted text-primary"
                        >
                            {name}
                        </button>
                    ))}
                    {isAuthenticated ? (
                        <Link
                            href={ROUTES.PROFILE}
                            className="block px-4 py-2 text-primary hover:text-accent transition"
                            onClick={() => setIsOpen(false)}
                        >
                            Profile
                        </Link>
                    ) : (
                        <Link
                            href={ROUTES.LOGIN}
                            className="block px-4 py-2 bg-muted text-primary rounded-lg hover:bg-muted transition"
                            onClick={() => setIsOpen(false)}
                        >
                            Login
                        </Link>
                    )}
                </div>
            )}
        </motion.header>
    );
}