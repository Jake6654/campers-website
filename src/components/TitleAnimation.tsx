import { useState, useEffect } from "react";

const TitleAnimation = () => {
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimated(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative w-full aspect-video overflow-hidden bg-[#1c274a]">
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-white font-mono">
        <div className="flex items-center justify-center text-6xl md:text-8xl font-bold">
          {/* Left Number */}
          <span>15</span>

          {/* Animated Colon and Text */}
          <div
            className={`relative flex items-center justify-center transition-all duration-1000 ease-in-out mx-2 ${
              isAnimated ? "w-64 md:w-96" : "w-8"
            }`}
          >
            <div className="relative w-full h-16 flex flex-col justify-between items-center">
              <div
                className={`bg-white transition-all duration-1000 ease-in-out ${
                  isAnimated ? "w-full h-1" : "w-2 h-2 rounded-full"
                }`}
              ></div>
              <div
                className={`absolute inset-0 flex items-center justify-center transition-opacity duration-700 delay-500 ${
                  isAnimated ? "opacity-100" : "opacity-0"
                }`}
              >
                <span className="text-base md:text-xl tracking-widest whitespace-nowrap">
                  The Campers Ministry
                </span>
              </div>
              <div
                className={`bg-white transition-all duration-1000 ease-in-out ${
                  isAnimated ? "w-full h-1" : "w-2 h-2 rounded-full"
                }`}
              ></div>
            </div>
          </div>

          {/* Right Number */}
          <span>5</span>
        </div>
      </div>
    </section>
  );
};

export default TitleAnimation;
