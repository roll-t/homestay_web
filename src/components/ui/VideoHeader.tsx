"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface VideoHeaderProps {
    videoSrc: string;
    poster?: string;
    className?: string;
}

const titles = [
    "Nghỉ dưỡng bên biển",
    "Chốn bình yên bên đại dương",
    "Homestay Biển - Nơi Ký Ức Bắt Đầu",
    "Thiên đường biển trong tầm tay",
    "Gần biển, gần thiên nhiên"
];

const subtitles = [
    "Tận hưởng khoảnh khắc bình yên bên sóng vỗ",
    "Thức giấc giữa tiếng sóng, đón bình minh rực rỡ",
    "Không chỉ là nơi ở, mà là hành trình khám phá",
    "Cùng người thương đón hoàng hôn tuyệt đẹp",
    "Nơi đất trời hòa quyện, nơi tâm hồn thư thái"
];

export default function VideoHeader({ videoSrc, poster, className = "" }: VideoHeaderProps) {
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            gsap.to([titleRef.current, subtitleRef.current], {
                opacity: 0, y: -20, duration: 0.5, onComplete: () => {
                    setIndex(prevIndex => (prevIndex + 1) % titles.length);
                    gsap.fromTo([titleRef.current, subtitleRef.current], { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 2 });
                }
            });
        }, 10000); // Chuyển đổi sau mỗi 10 giây

        return () => clearInterval(interval);
    }, []);

    return (
        <div className={`relative w-full h-[50vh] md:h-[70vh] lg:h-[80vh] overflow-hidden ${className}`}>
            {/* Video Background */}
            <video
                autoPlay
                loop
                muted
                playsInline
                poster={poster}
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-cover"
            >
                <source src={videoSrc} type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center px-4">
                <h1 ref={titleRef} className="text-2xl sm:text-4xl md:text-5xl font-bold text-white">
                    {titles[index]}
                </h1>
                <p ref={subtitleRef} className="text-sm sm:text-lg md:text-xl text-gray-200 mt-2 sm:mt-4">
                    {subtitles[index]}
                </p>
            </div>
        </div>
    );
}
