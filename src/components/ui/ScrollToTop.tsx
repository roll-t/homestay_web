"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { motion } from "framer-motion"; // Import motion from framer-motion

export default function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            setIsVisible(window.scrollY > 300); // Hiện button khi scroll > 300px
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        isVisible && (
            <motion.div
                onClick={scrollToTop}
                className="p-3 w-10 h-10 bg-primary flex justify-center items-center rounded-xl text-white shadow-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                whileHover={{ scale: 1.1, opacity: 1 }}
            >
                <ArrowUp size={24} className="font-black" />
            </motion.div>
        )
    );
}
