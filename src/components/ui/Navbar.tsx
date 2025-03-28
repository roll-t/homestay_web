"use client";

import { useEffect, useState } from "react";

export default function Navbar() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <header className="w-full bg-gray-100 dark:bg-gray-900 shadow-md">
            <div className="container mx-auto flex items-center justify-start px-6 py-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Phạm Phước Trường
                </h2>
            </div>
        </header>
    );
}
