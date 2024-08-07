"use client";

import { navbarLinks } from "@/constants";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const { username, signOut } = useAuth();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);

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

  const handleMenuClick = (label: string | null) => {
    if (activeSubmenu === label) {
      setDropdownOpen(false);
      setActiveSubmenu(null);
    } else {
      setActiveSubmenu(label);
      setDropdownOpen(true);
    }
  };

  return (
    <header className="w-full bg-black p-4 h-[74px] fixed top-0 left-0">
      <nav className="flex items-center justify-between w-[1280px] mx-auto">
        <ul className="flex space-x-4 text-16">
          <li className="flex justify-center items-center gap-4">
            <Link href="/" className="text-red-600 font-extrabold text-xl">
              DirectCine
            </Link>
          </li>
          {navbarLinks.map(({ imgUrl, label, submenu }) => {
            return (
              <li
                className="relative flex justify-center items-center gap-4 px-4 py-2"
                key={label}
                onClick={() => handleMenuClick(label)}
              >
                <Image src={imgUrl} alt={label} width={24} height={24} />
                <span className="text-white cursor-pointer">{label}</span>
                {dropdownOpen && activeSubmenu === label && (
                  <ul className="absolute top-full left-0 mt-2  bg-gray-800 text-white rounded shadow-lg">
                    {submenu.map((item) => (
                      <li
                        key={item.label}
                        className="py-2 px-4 hover:bg-gray-700"
                      >
                        <Link href={item.route}>{item.label}</Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>

        <div className="flex items-center space-x-4">
          <button className="text-white bg-gray-700 p-2 rounded-full hover:bg-gray-600">
            <Image
              src="/icons/home.svg"
              alt="Search Icon"
              width={24}
              height={24}
            />
          </button>

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
