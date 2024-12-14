"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Searchbar } from "./Search";
import { useEffect, useState } from "react";
import { useFavoriteStore } from "@/providers/favorite-store-provider";
import { useModal } from "@/hooks/useModal";

import Search from "/icons/search.svg";
import MenuBar from "/icons/menu2.svg";
import Overlay from "./Overlay";
import NavDropdownMenu from "./NavDropdownMenu";
import { navbarLinks } from "@/constants";
import { useAuthStore } from "@/providers/auth-store-provider";

const Navbar = () => {
  const router = useRouter();
  const { username, signOut } = useAuthStore((state) => state);
  const { fetchFavoriteMovies, fetchFavoriteTVShows } = useFavoriteStore(
    (state) => state
  );
  const { Modal, isOpen, openModal, closeModal } = useModal();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // 상태 변수 추가
  useEffect(() => {
    const fetchData = async () => {
      await fetchFavoriteMovies();
      await fetchFavoriteTVShows();
    };
    fetchData();
  }, [fetchFavoriteMovies, fetchFavoriteTVShows]);

  const handleMenuOpen = (isOpen: boolean) => {
    setIsMenuOpen(isOpen);
  };

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
    <header className="w-full bg-black h-[74px] fixed top-0 left-0 z-50">
      <nav className="flex items-center justify-between w-full px-4 py-4 lg:px-8 lg:mx-0">
        <ul className="flex space-x-4 text-16">
          <li className="flex items-center justify-center gap-4">
            <Link href="/" className="text-xl font-extrabold text-red-600">
              DirectCine
            </Link>
          </li>
          {navbarLinks.map((item) => (
            <NavDropdownMenu key={item.label} {...item} />
          ))}
        </ul>
        <div className="flex items-center space-x-4">
          <Modal open={isOpen} onClose={closeModal}>
            <div className="flex items-center justify-center bg-red-600">
              <Searchbar onClose={closeModal} />
            </div>
          </Modal>

          {username ? (
            <>
              <button type="button" onClick={() => openModal()}>
                <Search width={24} height={24} />
              </button>
              <button
                type="button"
                className="block lg:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <MenuBar
                  type="button"
                  width={24}
                  height={24}
                  className="text-white"
                />
              </button>

              <div className="items-center hidden gap-4 lg:flex">
                <span className="text-white">{username}</span>
                <button
                  className="p-2 py-1 text-white bg-red-600 rounded hover:bg-red-700"
                  onClick={signOut}
                >
                  Sign out
                </button>
              </div>
            </>
          ) : (
            <button
              className="p-2 py-1 text-white bg-red-600 rounded hover:bg-red-700"
              onClick={handleLogin}
            >
              Sign In
            </button>
          )}
        </div>
      </nav>
      {isMenuOpen && (
        <Overlay isMenuOpen={isMenuOpen} onMenuOpen={handleMenuOpen} />
      )}
    </header>
  );
};

export default Navbar;
