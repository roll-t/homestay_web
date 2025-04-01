
"use client";
import ContactPopup from "./ui/ContactPopup";
import ThemeToggle from "./ui/ThemeToggle";
import ScrollToTop from "./ui/ScrollToTop";

export default function FunctionalSidebar() {


    return (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-5 px-4 py-2 sm:px-5 sm:py-3 gap-2 flex flex-col items-end z-50 transition">
            <ScrollToTop />
            <ContactPopup />
            <ThemeToggle />
        </div>
    );
}
