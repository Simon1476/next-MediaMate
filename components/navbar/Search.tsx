"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { useDebouncedCallback } from "use-debounce";

const Search = () => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term) => {
    if (term === "") return;
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`/search?${params.toString()}`);
  }, 1000);

  return (
    <div className="relative flex flex-1 w-[600px]">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        type="text"
        maxLength={30}
        className="peer block w-full rounded-md border-none py-2 pr-10 pl-2 bg-[#1c2024] text-white placeholder:text-gray-500"
        placeholder="영화, TV 프로그램, 인물을 검색하세요..."
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get("query")?.toString()}
        required
      />
      <button className="absolute right-1 -top-[1px] p-2 rounded-full ">
        <Image
          src="/icons/search.svg"
          alt="Search Icon"
          width={24}
          height={24}
        />
      </button>
    </div>
  );
};

export function Searchbar() {
  return (
    // You could have a loading skeleton as the `fallback` too
    <Suspense>
      <Search />
    </Suspense>
  );
}
