import { ROUTES } from "@/utils/routes";


export default function AboutScreen() {

    return (
        <section id={ROUTES.ABOUT} className="h-screen flex items-center justify-center bg-gray-100">
            <h1 className="text-3xl font-bold">About Us</h1>
        </section>
    )


}