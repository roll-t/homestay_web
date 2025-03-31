"use client";

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <button
            className="fixed bottom-4 right-4 sm:bottom-6 sm:right-5 px-4 py-2 sm:px-5 sm:py-3 
                bg-gray-200 dark:bg-gray-800 text-black dark:text-white 
                rounded-full shadow-lg transition items-center gap-2 
                hover:bg-gray-300 dark:hover:bg-gray-700 "
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
            <span className="text-lg">{theme === "light" ? "🌙" : "☀️"}</span>
            <span className="hidden md:inline">
                {theme === "light" ? "Dark Mode" : "Light Mode"}
            </span>
        </button>
    );
}
