import { ArrowUpRight } from "lucide-react";
import { Card, CardContent } from "../../ui/card";
import Image from "next/image";
import Link from "next/link";
import { get, truncate } from "lodash";
import { getImagePath } from "@/utils/helpers";
import { format } from "date-fns";

export default function BlogCard({ data, isRow = false }) {
  const { title, description } = data;

  const truncatedTitle = truncate(title, {
    length: 40,
    omission: "...",
  });

  const truncatedDescription = truncate(description, {
    length: 70,
    omission: "...",
  });

  return (
    <Link href={`/blog/${data.blogId}`}>
      <Card
        key={`competitions-instruction`}
        className={`group relative md:shadow bg-white p-0 m-0 text-left`}
      >
        <CardContent
          className={` p-3 flex ${
            !isRow
              ? "flex-col"
              : "grid grid-cols-1 md:grid-cols-2  gap-2"
          }`}
        >
          <div
            className={`overflow-hidden  rounded-md relative h-[250px] ${
              isRow && "h-[250px] md:max-h-[150px]"
            }`}
          >
            <Image
              src={getImagePath(get(data, "image"))}
              alt={`${title} logo`}
              fill
              className="transition rounded-md object-cover rounded-md md:group-hover:scale-125"
            />
          </div>
          <div className="py-2 flex flex-col gap-3">
            <span className="text-xs text-primary font-bold">
              {get(data, "User.firstName")} {get(data, "User.lastName")} /{" "}
              {format(get(data, "postedAt"), "dd MMM yyyy")}
            </span>
            <div className="flex justify-between">
              <h4 className="text-lg text-bold">{truncatedTitle}</h4>
              <ArrowUpRight className={`group-hover:text-blue-300`} />
            </div>

            <p className="text-[#475467]">{truncatedDescription} </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
