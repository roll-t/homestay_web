
import AboutScreen from "@/components/screens/nav_screen/about_screen";
import ContactScreen from "@/components/screens/nav_screen/contact_screen";
import HomeScreen from "@/components/screens/nav_screen/home_screen";
import ServiceScreen from "@/components/screens/nav_screen/service_screen";
import VideoHeader from "@/components/ui/VideoHeader";
import { ROUTES } from "@/utils/routes";

export default function HomePage() {
    return (
        <div className="w-full overflow-hidden">
            <HomeScreen />
            <AboutScreen />
            <ServiceScreen />
            <ContactScreen />
        </div>
    );
}
