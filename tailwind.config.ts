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
                    light: "#1E40AF", // Màu sáng
                    dark: "#0a0a0a",  // Màu tối
                },
                text: {
                    light: "#171717",
                    dark: "#ededed",
                },
            },
        },
    },
};

export default config;
