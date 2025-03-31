
import VideoHeader from "@/components/ui/VideoHeader";

export default function HomePage() {
    return (
        <div className="w-full overflow-hidden">
            <VideoHeader
                videoSrc="/video_banner.mp4"
                poster="https://via.placeholder.com/1500x500"
            />
        </div>
    );
}
