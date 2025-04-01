import Navbar from "@/components/ui/Navbar";
import HomePage from "./(pages)/(public)/home/page";
import { Footer } from "@/components/ui/Footer";
import { UserRole } from "@/utils/enum/userRole";
import { getServerSession } from "next-auth";
import { authOptions } from "./lib/authOptions";
import FunctionalSidebar from "@/components/FunctionalSidebar";

export default async function MainPage() {
    const session = await getServerSession(authOptions);
    const userRole: UserRole = (session?.user?.role as UserRole) || UserRole.GUEST;
    return <>
        <Navbar userRole={userRole} />
        <main className="flex-1">
            <HomePage />
            <FunctionalSidebar />
        </main>
        <Footer />
    </>
}
