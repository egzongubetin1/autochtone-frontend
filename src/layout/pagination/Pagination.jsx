"use client";
import React, { useEffect } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import {
  Pagination as PaginationWrapper,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationLink,
  PaginationEllipsis,
} from "@/components/ui/pagination";

export const Pagination = ({ total, perPage }) => {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();

  let currentPage = parseInt(searchParams.get("page") ?? "1", 10);
  currentPage = isNaN(currentPage) ? 1 : currentPage;

  const totalPages = Math.ceil(total / perPage);
  const delta = 1;

  const renderPageNumbers = () => {
    let pages = [];

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - delta && i <= currentPage + delta)
      ) {
        pages.push(i);
      } else if (pages[pages.length - 1] !== "...") {
        pages.push("...");
      }
    }

    return pages.map((page, idx) => {
      const pageKey = `page_${page}_${idx}`;
      return page !== "..." ? (
        <PaginationItem key={pageKey} className="cursor-pointer">
          <PaginationLink
            onClick={() => queryParamUpdate(page)}
            className={` text-primary ${
              page === currentPage && "bg-blue-100 text-primary"
            }`}
          >
            {page}
          </PaginationLink>
        </PaginationItem>
      ) : (
        <PaginationItem key={pageKey}>
          <PaginationEllipsis />
        </PaginationItem>
      );
    });
  };

  const queryParamUpdate = (pageNo) => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("page", pageNo.toString());

    const newUrl = pathName + "?" + searchParams.toString();
    router.push(newUrl, { scroll: false });
  };

  const canGoBack = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  function handleBackPage() {
    if (canGoBack) queryParamUpdate(currentPage - 1);
  }

  function handleNextPage() {
    if (canGoNext) queryParamUpdate(currentPage + 1);
  }

  useEffect(() => {
    if (searchParams.get("page")) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [searchParams.get("page")]);

  return (
    <PaginationWrapper>
      <PaginationContent className="flex justify-between w-full">
        <PaginationItem
          className={`cursor-pointer ${
            !canGoBack && "opacity-40 cursor-not-allowed	"
          }`}
        >
          <PaginationPrevious isActive={false} onClick={handleBackPage} />
        </PaginationItem>
        <div className="flex gap-2">{renderPageNumbers()}</div>
        <PaginationItem
          className={`cursor-pointer ${
            !canGoNext && "opacity-40 cursor-not-allowed	"
          }`}
        >
          <PaginationNext onClick={handleNextPage} />
        </PaginationItem>
      </PaginationContent>
    </PaginationWrapper>
  );
};
