import BlogCard from "@/components/custom/card/BlogCard";
import { DEFAULT_FETCH_HEADERS, PAGINATION_LIMIT } from "@/data/constants";
import Subscribe from "@/layout/@autochtone/Subscribe";
import Navigation from "@/layout/navigation/Navigation";
import { Pagination } from "@/layout/pagination/Pagination";
import { getRevalidateTime } from "@/utils/helpers";
import { drop, get, isEmpty } from "lodash";
import { notFound } from "next/navigation";
import { Suspense } from "react";

async function getBlog(currentPage) {
  const competition = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/blog?page=${currentPage}&limit=${PAGINATION_LIMIT}`,
    {
      headers: DEFAULT_FETCH_HEADERS,
      next: {
        revalidate: getRevalidateTime(420),
      },
    }
  );
  if (!competition.ok) {
    notFound();
  }

  const data = await competition.json();

  return data;
}

export default async function Blogs({ searchParams }) {
  const page = Number(searchParams?.page) || 1;
  const { blogs, totalBlogs, totalPages, currentPage } = await getBlog(page);

  return (
    <div className="container flex flex-col gap-10">
      <Navigation />
      <div className="text-center flex flex-col gap-5 font-normal text-[#475467]">
        <div className="flex flex-col gap-5 w-full  md:w-1/2 m-auto">
          <h1 className="text-xl md:text-3xl	font-semibold	text-black">
            Check the latest blogs
          </h1>
          <p>
            Subscribe to learn about new product features, the latest in
            technology, solutions, and updates.
          </p>
          <Subscribe isFooterSubscription={false} />
        </div>
        <h1 className="text-xl md:text-2xl	font-semibold	 text-left">
          Recent blog posts
        </h1>
        <Suspense fallback={<div>Loading blogs...</div>}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {!isEmpty(blogs) && (
              <div>
                <BlogCard data={get(blogs, "[0]")} className={"h-full"} />
              </div>
            )}
            {blogs.length > 1 && (
              <div className="flex flex-col gap-2">
                <BlogCard data={get(blogs, "[1]")} isRow={true} />
                {blogs.length > 2 && (
                  <BlogCard data={get(blogs, "[2]")} isRow={true} />
                )}
              </div>
            )}
          </div>
        </Suspense>
        <Suspense fallback={<div>Loading blogs...</div>}>
          {blogs.length > 3 && (
            <div className="flex flex-col text-left gap-5">
              <h2 className="text-2xl font-semibold text-left">
                All blog posts
              </h2>
              <div className="grid grid-cols-3 gap-5">
                {drop(blogs, 3).map((data, index) => (
                  <BlogCard key={index + 3} data={data} />
                ))}
              </div>
            </div>
          )}
        </Suspense>
      </div>

      <Pagination total={totalBlogs} perPage={PAGINATION_LIMIT} />
    </div>
  );
}
