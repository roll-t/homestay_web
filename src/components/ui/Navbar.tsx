"use client";

import { UserRole } from "@/utils/enum/userRole";
import { ROUTES } from "@/utils/routes";
import Link from "next/link";
import { useEffect, useState } from "react";

///---> defind navbar variable
const listNav = [
    { name: "Home", path: ROUTES.HOME },
    { name: "About", path: ROUTES.ABOUT },
    { name: "Contact", path: ROUTES.CONTACT },
];

export default function Navbar({ userRole }: { userRole: UserRole }) {
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <header className="py-4 px-20">
            <div className="flex justify-between items-center">
                <h2>NhaCuaOc</h2>
                <ul className="flex justify-center items-center w-full">
                    {listNav.map((value) => <Link key={value.path} className="px-10 py-2" href={value.path}>{value.name}</Link>)}
                </ul>

                {/* ADMIN ROLE */}
                {userRole === UserRole.ADMIN && (
                    <Link
                        className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 transition"
                        href="/admin"
                    >
                        Admin Dashboard
                    </Link>
                )}

                {/* CLIENT ROLE Profile / Login */}
                <div className="ml-6">
                    {userRole !== UserRole.GUEST ? (
                        <Link
                            href={ROUTES.PROFILE}
                            className="px-4 py-2 text-gray-700 hover:text-black transition"
                        >
                            Profile
                        </Link>
                    ) : (
                        <Link
                            href={ROUTES.LOGIN}
                            className="px-4 py-2 text-white bg-blue-900 rounded-lg hover:bg-blue-600 transition"
                        >
                            Login
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
}
