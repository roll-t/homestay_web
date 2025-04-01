
import VideoHeader from "@/components/ui/VideoHeader";
import { ROUTES } from "@/utils/routes";


export default function HomeScreen() {

    return (
        <section id={ROUTES.HOME} >
            <VideoHeader
                videoSrc="/video_banner.mp4"
                poster="https://via.placeholder.com/1500x500"
            />

        </section>
    )


}