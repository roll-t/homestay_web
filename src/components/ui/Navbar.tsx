"use client";

import { ROUTES } from "@/utils/routes";
import Link from "next/link";
import { useEffect, useState } from "react";

///---> defind navbar variable
const listNav = [
    { name: "Home", path: ROUTES.HOME },
    { name: "About", path: ROUTES.ABOUT },
    { name: "Contact", path: ROUTES.CONTACT },
];

export default function Navbar() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <header className="py-4">
            <ul className="flex justify-center items-center w-full">
                {listNav.map((value) => <Link key={value.path} className="px-10 py-2" href={value.path}>{value.name}</Link>)}
            </ul>
        </header>
    );
}
