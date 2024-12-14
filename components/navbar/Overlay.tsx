import Link from "next/link";
import Close from "/icons/close.svg";
import { useState } from "react";
import { useAuthStore } from "@/providers/auth-store-provider";

type Props = {
  isMenuOpen: boolean;
  onMenuOpen: (isOpen: boolean) => void;
};

const Overlay = ({ isMenuOpen, onMenuOpen }: Props) => {
  const [activeSection, setActiveSection] = useState<string>("movie");

  const { signOut } = useAuthStore((state) => state);
  const handleSectionClick = (section: string) => {
    if (activeSection !== section) {
      setActiveSection(section);
    }
  };

  const handleLogout = () => {
    onMenuOpen(false);
    signOut();
  };
  return (
    <>
      {isMenuOpen && (
        <div className="absolute top-0 right-0 bottom-0 w-full h-screen z-[100] bg-[#0f1114]">
          <div className="flex justify-between px-4 py-4 border-b border-white-100">
            <Link href="/" className="text-xl font-extrabold text-red-600">
              DirectCine
            </Link>
            <button
              type="button"
              onClick={() => onMenuOpen(false)}
              aria-label="Close menu"
            >
              <Close className="w-[24px] h-[24px] text-white" />
            </button>
          </div>
          <div className="flex px-5 py-4">
            <nav className="w-[35%] min-w-[120px] max-w-60">
              <ul className="space-y-4 font-semibold">
                <li
                  className={`px-5 py-4 cursor-pointer ${
                    activeSection === "movie"
                      ? "text-white bg-[#1f2937]" // 활성화된 상태에 대한 스타일
                      : "text-white hover:bg-gray-600" // 비활성화된 상태에 대한 스타일
                  }`}
                  onClick={() => handleSectionClick("movie")}
                >
                  영화
                </li>
                <li
                  className={`px-5 py-4 cursor-pointer ${
                    activeSection === "tv"
                      ? "text-white bg-[#1f2937]"
                      : "text-white hover:bg-gray-600"
                  }`}
                  onClick={() => handleSectionClick("tv")}
                >
                  TV 프로그램
                </li>
                <li
                  className={`px-5 py-4 cursor-pointer ${
                    activeSection === "people"
                      ? "text-white bg-[#1f2937]"
                      : "text-white hover:bg-gray-600"
                  }`}
                  onClick={() => handleSectionClick("people")}
                >
                  유명인
                </li>
                <li
                  className="px-5 py-4 text-white cursor-pointer"
                  onClick={handleLogout}
                >
                  로그아웃
                </li>
              </ul>
            </nav>
            <div className="flex text-white ">
              {activeSection === "movie" && (
                <div
                  className="flex flex-col gap-4 font-medium text-white"
                  onClick={() => onMenuOpen(false)}
                >
                  <Link href="/movie" className="px-5 py-4">
                    영화
                  </Link>
                  <Link href="/movie/now-playing" className="px-5 py-4">
                    현재 상영중
                  </Link>
                  <Link href="/movie/upcoming" className="px-5 py-4">
                    개봉 예정
                  </Link>
                  <Link href="/movie/top-rated" className="px-5 py-4">
                    높은 평점
                  </Link>
                </div>
              )}
              {activeSection === "tv" && (
                <div
                  className="flex flex-col gap-4 font-medium text-white"
                  onClick={() => onMenuOpen(false)}
                >
                  <Link href="/tv" className="px-5 py-4">
                    인기
                  </Link>
                  <Link href="/tv/airing-today" className="px-5 py-4">
                    오늘 방영
                  </Link>
                  <Link href="/tv/on-the-air" className="px-5 py-4">
                    TV 방영중
                  </Link>
                  <Link href="/tv/top-rated" className="px-5 py-4">
                    높은 평점
                  </Link>
                </div>
              )}
              {activeSection === "people" && (
                <div
                  className="flex flex-col gap-4 font-medium text-white"
                  onClick={() => onMenuOpen(false)}
                >
                  <Link href="/person" className="px-5 py-4">
                    인기인물
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Overlay;
