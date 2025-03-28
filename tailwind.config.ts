import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: "class", // Đảm bảo Tailwind nhận diện class "dark"
    content: [
        "./app/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    light: "#1e3a8a",  // Màu chủ đạo Light Mode (Xanh dương đậm)
                    dark: "#60a5fa",   // Màu chủ đạo Dark Mode (Xanh dương nhạt)
                },
                secondary: {
                    light: "#9333ea",  // Màu phụ Light Mode (Tím)
                    dark: "#c084fc",   // Màu phụ Dark Mode (Tím nhạt)
                },
                accent: {
                    light: "#facc15",  // Màu nhấn Light Mode (Vàng)
                    dark: "#fde047",   // Màu nhấn Dark Mode (Vàng sáng)
                },
                background: {
                    light: "#ffffff",  // Nền trắng Light Mode
                    dark: "#0a0a0a",   // Nền đen Dark Mode
                },
                foreground: {
                    light: "#171717",  // Chữ đen Light Mode
                    dark: "#ededed",   // Chữ trắng Light Mode
                },
                border: {
                    light: "#e5e7eb",  // Viền xám nhạt Light Mode
                    dark: "#374151",   // Viền xám đậm Dark Mode
                },
                shadow: {
                    light: "rgba(0, 0, 0, 0.1)",  // Box-shadow Light Mode
                    dark: "rgba(255, 255, 255, 0.1)", // Box-shadow Dark Mode
                },
            },
            boxShadow: {
                light: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                dark: "0px 4px 6px rgba(255, 255, 255, 0.1)",
            },
            fontFamily: {
                sans: ["Inter", "sans-serif"],
                mono: ["Fira Code", "monospace"],
            },
        },
    },
    plugins: [],
};

export default config;
