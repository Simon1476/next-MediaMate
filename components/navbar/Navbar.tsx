"use client";

import { navbarLinks } from "@/constants";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const { username, signOut } = useAuth();

  const handleLogin = async () => {
    try {
      const response = await fetch("/api/getRequestToken");
      if (!response.ok) throw new Error("Failed to fetch request token");
      const data = await response.json();
      const requestToken = data.request_token;

      const redirectUrl = `${process.env.NEXT_PUBLIC_REDIRECT_URL}?token=${requestToken}`;

      router.push(
        `https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=${redirectUrl}`
      );
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <header className="w-full bg-black p-4">
      <nav className="flex items-center justify-between w-[1280px] mx-auto">
        {/* 내비게이션 메뉴 */}
        <ul className="flex space-x-4 text-16">
          <li className="flex justify-center items-center gap-4">
            <Link href="/" className="text-red-600 font-extrabold text-xl">
              DirectCine
            </Link>
          </li>
          {navbarLinks.map(({ imgUrl, route, label }) => {
            const isActive =
              pathname === route || pathname.startsWith(`${route}/`);

            return (
              <li
                className={
                  isActive
                    ? "flex justify-center items-center gap-4 border-b-4 border-red-500"
                    : "flex justify-center items-center gap-4"
                }
                key={label}
              >
                <Image src={imgUrl} alt={label} width={24} height={24} />
                <Link href={route} className="text-white">
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* 버튼 그룹 */}
        <div className="flex items-center space-x-4">
          {/* 검색 버튼 */}
          <button className="text-white bg-gray-700 p-2 rounded-full hover:bg-gray-600">
            <Image
              src="/icons/home.svg"
              alt="Search Icon"
              width={24}
              height={24}
            />
          </button>

          {/* Sign-In 버튼 */}
          {username ? (
            <>
              <span className="text-white">{username}</span>
              <button
                className="px-4 py-1 text-white bg-red-600 p-2 rounded hover:bg-red-700"
                onClick={signOut}
              >
                Sign out
              </button>
            </>
          ) : (
            <button
              className="px-4 py-1 text-white bg-red-600 p-2 rounded hover:bg-red-700"
              onClick={handleLogin}
            >
              Sign In
            </button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
