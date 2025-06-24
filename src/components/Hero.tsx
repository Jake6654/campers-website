import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <div className="flex flex-col md:flex-row items-center gap-8 px-4 py-12 max-w-6xl mx-auto">
      <div className="flex-1 order-2 md:order-1">
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4 text-gray-900">
          Lorem ipsum dolor sit amet consectetur adipiscing elit.
        </h1>
        <p className="text-base md:text-lg text-gray-600 mb-6 leading-relaxed">
          Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque
          faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi
          pretium tellus duis convallis. Tempus leo eu aenean sed diam urna
          tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas.
        </p>
        <Link
          href="/about"
          className="inline-block bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow transition duration-200"
        >
          Learn More...
        </Link>
      </div>
      <Image
        src="/images/hero3.jpg"
        alt="placeholder"
        className="flex-1 rounded-lg shadow-lg w-full max-w-2xl order-1 md:order-2"
        width={400}
        height={300}
      />
    </div>
  );
}
