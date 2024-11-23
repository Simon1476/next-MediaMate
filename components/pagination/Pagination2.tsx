"use client";

import { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type Props = {
  totalPages: number;
  mediaType: string;
};

const Pagination2 = ({ totalPages, mediaType }: Props) => {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Here you would typically fetch data for the new page
    console.log(`Fetching data for page ${page}`);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(
          <PaginationItem key={i}>
            <PaginationLink
              href="#"
              onClick={() => handlePageChange(i)}
              isActive={currentPage === i}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
    } else {
      // Add first page
      pageNumbers.push(
        <PaginationItem key={1}>
          <PaginationLink
            href="#"
            onClick={() => handlePageChange(1)}
            isActive={currentPage === 1}
          >
            1
          </PaginationLink>
        </PaginationItem>
      );

      // Add ellipsis if necessary
      if (currentPage > 3) {
        pageNumbers.push(
          <PaginationItem key="ellipsis1">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }

      // Add current page and surrounding pages
      for (
        let i = Math.max(2, currentPage - 1);
        i <= Math.min(totalPages - 1, currentPage + 1);
        i++
      ) {
        pageNumbers.push(
          <PaginationItem key={i}>
            <PaginationLink
              href="#"
              onClick={() => handlePageChange(i)}
              isActive={currentPage === i}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }

      // Add ellipsis if necessary
      if (currentPage < totalPages - 2) {
        pageNumbers.push(
          <PaginationItem key="ellipsis2">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }

      // Add last page
      pageNumbers.push(
        <PaginationItem key={totalPages}>
          <PaginationLink
            href="#"
            onClick={() => handlePageChange(totalPages)}
            isActive={currentPage === totalPages}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return pageNumbers;
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href={`/favorite/${mediaType}?page=${Math.max(
                1,
                currentPage - 1
              )}`}
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
            />
          </PaginationItem>
          {renderPageNumbers()}
          <PaginationItem>
            <PaginationNext
              href={`/favorite/${mediaType}?page=${Math.min(
                totalPages,
                currentPage + 1
              )}`}
              onClick={() =>
                handlePageChange(Math.min(totalPages, currentPage + 1))
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default Pagination2;
