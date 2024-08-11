"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Pagination = ({
  totalPage,
  currentPage,
}: {
  totalPage: number;
  currentPage: number;
}) => {
  const pathname = usePathname();

  const createPageRange = (
    currentPage: number,
    totalPage: number,
    displayCount: number
  ) => {
    const range = [];
    const halfDisplayCount = Math.floor(displayCount / 2);

    let start = Math.max(currentPage - halfDisplayCount, 1);
    let end = Math.min(currentPage + halfDisplayCount, totalPage);

    // Adjust start and end if they're too close to the limits
    if (currentPage - start < halfDisplayCount) {
      end = Math.min(start + displayCount - 1, totalPage);
    }
    if (end - currentPage < halfDisplayCount) {
      start = Math.max(end - displayCount + 1, 1);
    }

    for (let i = start; i <= end; i++) {
      range.push(i);
    }

    return range;
  };

  const pageRange = createPageRange(currentPage, totalPage, 5);
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

        {pageRange.map((pageNum) => (
          <Link key={pageNum} href={`${pathname}?page=${pageNum}`}>
            <button
              className={`px-4 py-2 rounded hover:bg-gray-200 mx-1 ${
                currentPage === pageNum ? "bg-gray-200" : ""
              }`}
              disabled={currentPage === pageNum}
            >
              {pageNum}
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
        {currentPage} / {totalPage}
      </div>
    </>
  );
};

export default Pagination;
