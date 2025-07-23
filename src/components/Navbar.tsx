"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

type NavItem = {
  name: string;
  href?: string;
  children?: { name: string; href: string }[];
  isCTA?: boolean;
};

const navItems: NavItem[] = [
  { name: "About", href: "/about" },
  {
    name: "Ministry",
    children: [
      { name: "Youth", href: "/ministry/youth" },
      { name: "Missions", href: "/ministry/missions" },
      { name: "Events", href: "/ministry/events" },
    ],
  },
  { name: "News", href: "/news" },
  { name: "Donation", href: "/donation", isCTA: true },
];

export default function Navbar() {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;
      setShow(current < lastScrollY || current < 50); // 위로 스크롤하거나 거의 맨 위면 보이게
      setLastScrollY(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-transform duration-300 bg-white shadow ${
        show ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between h-20">
        {/* 로고 */}
        <Link href="/" className="flex items-center">
          <Image
            src="/images/campers-logo.webp"
            alt="The Campers Ministry"
            width={80}
            height={84}
            className="object-contain"
          />
        </Link>

        {/* 메뉴 */}
        <ul className="flex items-center space-x-6 text-md font-semibold text-gray-800">
          {navItems.map((item) =>
            item.children ? (
              <DesktopDropdown key={item.name} item={item} />
            ) : (
              <li key={item.href}>
                <Link
                  href={item.href!}
                  className={
                    item.isCTA
                      ? "px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                      : "hover:underline transition duration-300"
                  }
                >
                  {item.name}
                </Link>
              </li>
            )
          )}
        </ul>
      </div>
    </nav>
  );
}

function DesktopDropdown({ item }: { item: NavItem }) {
  return (
    <li className="relative group">
      <button className="flex items-center hover:underline">
        {item.name}
        <svg
          className="w-4 h-4 ml-1 transform group-hover:-rotate-180 transition-transform"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      <ul className="absolute top-full left-0 mt-2 w-40 bg-white border rounded shadow-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all z-50">
        {item.children!.map(({ name, href }) => (
          <li key={href}>
            <Link
              href={href}
              className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
            >
              {name}
            </Link>
          </li>
        ))}
      </ul>
    </li>
  );
}
