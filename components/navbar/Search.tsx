"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { useDebouncedCallback } from "use-debounce";

const Search = ({ onClose }: { onClose: () => void }) => {
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
    onClose();
  }, 1000);

  return (
    <div className="relative flex">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        type="text"
        maxLength={30}
        className="block flex-1 lg:w-[500px] rounded-md border-none py-2 pr-10 pl-2 bg-[#1c2024] text-white placeholder:text-gray-500"
        placeholder="영화, TV 프로그램을 검색"
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get("query")?.toString()}
        required
      />
    </div>
  );
};

export function Searchbar({ onClose }: { onClose: () => void }) {
  return (
    // You could have a loading skeleton as the `fallback` too
    <Suspense>
      <Search onClose={onClose} />
    </Suspense>
  );
}
