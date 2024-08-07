"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

const Pagination = ({
  totalPage,
  currentPage,
}: {
  totalPage: number;
  currentPage: number;
}) => {
  const pathname = usePathname();
  const perPage = 5;
  return (
    <>
      <div className="flex justify-center items-center w-full">
        <Link
          href={
            currentPage === totalPage
              ? ""
              : `${pathname}?page=${currentPage - 1}`
          }
        >
          <button
            disabled={currentPage === 1 ? true : false}
            className="cursor-pointer"
          >
            <Image
              src="/icons/arrow-left.svg"
              width={30}
              height={30}
              alt="Left arrow"
            />
          </button>
        </Link>

        {Array.from({ length: 5 }, (_, index) => (
          <Link key={index} href={`${pathname}?page=${index + 1}`}>
            <button
              key={index + 1}
              className={`px-4 py-2 rounded hover:bg-gray-200 mx-1 ${
                currentPage === index + 1 ? "bg-gray-200" : ""
              }`}
              disabled={currentPage === totalPage ? true : false}
            >
              {index + 1}
            </button>
          </Link>
        ))}
        <Link
          href={
            currentPage === totalPage
              ? ""
              : `${pathname}?page=${currentPage + 1}`
          }
        >
          <button disabled={currentPage === totalPage ? true : false}>
            <Image
              src="/icons/arrow-right.svg"
              width={30}
              height={30}
              alt="Right arrow"
              className="cursor-pointer"
              aria-disabled
            />
          </button>
        </Link>
      </div>
      <div className="text-center mt-4">
        {currentPage} / {Math.ceil(totalPage / 10)}
      </div>
    </>
  );
};

export default Pagination;
