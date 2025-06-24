// components/Header.tsx
import { FC, useState } from "react";
import Link from "next/link";
import { FaBars, FaTimes, FaSearch } from "react-icons/fa";

const Header: FC = () => {
  // 사이드바(open/close) 상태
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // 검색창(open/close) 상태
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
    // 사이드바 열 때 검색창이 열려 있으면 검색창 닫기
    if (isSearchOpen) {
      setIsSearchOpen(false);
    }
  };

  // 검색창 토글 함수
  const toggleSearch = () => {
    setIsSearchOpen((prev) => !prev);
    // 검색창 열 때 사이드바가 열려 있으면 사이드바 닫기
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  return (
    <>
      {/** ─────────── 상단 헤더 ─────────── **/}
      {/* h-16: 높이를 64px로 고정, z-50: 오버레이 위에 보이도록 */}
      <header className="w-full h-16 sticky top-0 z-50 bg-[#00abef]">
        <div className="flex items-center justify-between h-full px-4">
          {/** ── 왼쪽 그룹: 햄버거/닫기 아이콘 + 로고 ── **/}
          <div className="flex items-center space-x-3">
            <button
              aria-label={isMenuOpen ? "메뉴 닫기" : "메뉴 열기"}
              onClick={toggleMenu}
              className="text-white hover:text-gray-200 focus:outline-none"
            >
              {isMenuOpen ? (
                <FaTimes className="text-2xl" />
              ) : (
                <FaBars className="text-2xl" />
              )}
            </button>

            <Link href="/" className="flex items-baseline space-x-1">
              <span className="text-white text-2xl font-bold">KISO</span>
              <span className="text-white text-xs">한인회</span>
            </Link>
          </div>

          {/** ── 오른쪽 그룹: 검색 버튼 & 검색창 ── **/}
          <div className="relative">
            <button
              aria-label={isSearchOpen ? "검색 닫기" : "검색 열기"}
              onClick={toggleSearch}
              className="text-white hover:text-gray-200 focus:outline-none"
            >
              <FaSearch className="text-2xl" />
            </button>

            {isSearchOpen && (
              <div className="absolute top-full right-0 mt-2 z-40">
                <input
                  type="text"
                  placeholder="Search…"
                  className="w-64 px-3 py-1 rounded border border-gray-300 bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>
            )}
          </div>
        </div>
      </header>

      {/** ─────────── 사이드바 + 반투명 오버레이 ─────────── **/}
      {isMenuOpen && (
        <>
          {/** 1) 반투명 오버레이 **/}
          {/* z-40: 헤더(z-50) 아래, 사이드바(z-60) 바로 아래 */}
          <div
            className="fixed top-0 left-0 w-full h-full z-40"
            onClick={toggleMenu}
            aria-hidden="true"
          />

          {/** 2) 왼쪽 사이드바 **/}
          {/* fixed top-16: 헤더(높이 64px) 아래부터 시작, bottom-0: 화면 바닥까지 */}
          <aside className="fixed top-16 left-0 bottom-0 w-70 bg-[#00abef] z-60 flex flex-col border-t border-gray-200 overflow-y-auto">
            {/** 헤더와 맞닿는 경계선: border-r 뿐 아니라, 위쪽에 line을 보이도록 border-b도 가능 **/}
            <nav className="flex-1 px-4 py-6 space-y-4">
              <Link
                href="#"
                className="block text-white text-xl hover:underline"
              >
                Test1
              </Link>
              <Link
                href="#"
                className="block text-white text-xl hover:underline"
              >
                Test2
              </Link>
              <Link
                href="#"
                className="block text-white text-xl hover:underline"
              >
                Test3
              </Link>
            </nav>
          </aside>
        </>
      )}
    </>
  );
};

export default Header;
