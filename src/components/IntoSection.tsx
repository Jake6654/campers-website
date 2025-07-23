// components/IntroSection.tsx
import Link from "next/link";

export default function IntroSection() {
  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-6 md:px-20">
        {/* verse info */}
        <p className="text-sm text-gray-500 mb-4">The campers ministry</p>

        {/* main heading */}
        <h2 className="text-4xl md:text-5xl font-semibold tracking-tight leading-snug text-left text-black max-w-3xl mb-6">
          The Campers Ministry는 대학 캠퍼스를 통하여 한인 디아스포라가 반응하고
          (Worship), 세워지며(Education), <br className="md:hidden" />
          보내지는 (Mission) Bridge-building 커뮤니티 입니다.
        </h2>

        {/* Read More link */}
        <Link
          href="/about"
          className="inline-flex items-center text-base font-medium text-blue-600 hover:text-blue-800"
        >
          Read More
          <svg
            className="w-5 h-5 ml-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </Link>
      </div>
    </section>
  );
}
