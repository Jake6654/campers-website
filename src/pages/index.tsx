
import { useEffect, useState } from "react";
import TitleAnimation from "@/components/TitleAnimation";
import IntroSection from "@/components/IntoSection";

export default function Home() {
  const [fadeOut, setFadeOut] = useState(false);
  const [hideTitle, setHideTitle] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFadeOut(true), 2000);
    const removeTimer = setTimeout(() => setHideTitle(true), 3000);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  return (
    <main>
      {/* Navbar 고정 공간 */}
      <div className="h-20" />

      {/* 16:9 비율 wrapper */}
      <div className="relative w-full aspect-video overflow-hidden">
        {/* Video */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/videos/main.mp4" type="video/mp4" />
        </video>

        {/* TitleAnimation */}
        {!hideTitle && (
          <div
            className={`absolute inset-0 z-10 flex items-center justify-center transition-opacity duration-1000 ${
              fadeOut ? "opacity-0" : "opacity-100"
            }`}
          >
            <TitleAnimation />
          </div>
        )}
      </div>

      {/* 이후 섹션들… */}
      <IntroSection />
    </main>
  );
}
