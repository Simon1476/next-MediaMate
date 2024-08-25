"use client";

import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Searchbar } from "./Search";
import Submenu from "./Submenu";
import { useEffect } from "react";

import { useFavoriteStore } from "@/providers/favorite-store-provider";
const Navbar = () => {
  const router = useRouter();
  const { username, signOut, accountId } = useAuth();
  const { fetchFavoriteMovies, fetchFavoriteTVShows } = useFavoriteStore(
    (state) => state
  );
  useEffect(() => {
    const fetchData = async () => {
      if (accountId) {
        await fetchFavoriteMovies(accountId);
        await fetchFavoriteTVShows(accountId);
      }
    };

    fetchData(); // 비동기 함수 호출
  }, [accountId, fetchFavoriteMovies, fetchFavoriteTVShows]);
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
    <header className="w-full bg-black p-4 h-[74px] fixed top-0 left-0">
      <nav className="flex items-center justify-between max-w-[1560px] mx-auto">
        <ul className="flex space-x-4 text-16">
          <li className="flex justify-center items-center gap-4">
            <Link href="/" className="text-red-600 font-extrabold text-xl">
              DirectCine
            </Link>
          </li>
          <Submenu />
        </ul>

        <div className="flex items-center space-x-4">
          <Searchbar />
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
