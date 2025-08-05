import { useEffect, useState } from "react";
import TitleAnimation from "@/components/TitleAnimation";
import IntroSection from "@/components/IntoSection";
import CoreVision from "@/components/CoreVision";
import Form from "@/components/Form";
import Footer from "@/components/Footer";

export default function Home() {
  // opcaity를 조절해 애니메이션을 점점 사라지게 만들기 위한 상태
  const [fadeOut, setFadeOut] = useState(false);
  const [hideTitle, setHideTitle] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFadeOut(true), 2000); // 2초 뒤 ture
    const removeTimer = setTimeout(() => setHideTitle(true), 3000); // 3초 뒤 ture
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
        {!hideTitle && ( // !hideTitle 이 false 일때만 렌더링되는 조건부 렌더링 함수이다
          <div
            className={`absolute inset-0 z-10 flex items-center justify-center transition-opacity duration-1000 ${
              // if fadeout ture -> the element transitions to opacity-0 smoothly due to the transition-opacity and duration classes
              fadeOut ? "opacity-0" : "opacity-100"
            }`}
          >
            <TitleAnimation />
          </div>
        )}
      </div>

      {/* 이후 섹션들… */}
      <IntroSection />
      <CoreVision />
      <Form />
      <Footer />
    </main>
  );
}
