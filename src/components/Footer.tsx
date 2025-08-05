"use client";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-white">
      {/* 위쪽에 살짝 그라디언트 그림자 효과 */}

      <div className="container mx-auto px-6 py-12 text-center text-gray-700">
        <p className="mb-2">
          The Campers Ministry is 501(c)(3) Non-Profit Organization located in
          the U.S.
        </p>
        <p className="text-sm">
          ©{year} by The Campers Ministry — All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
