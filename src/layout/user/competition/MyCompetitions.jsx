"use client";
import { UserService } from "@/services/UserService";
import { getImagePath } from "@/utils/helpers";
import { useQuery } from "@tanstack/react-query";
import { get, isEmpty } from "lodash";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function MyCompetitions() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["user/competitions"],
    queryFn: async ({ queryKey }) => {
      return await UserService.getPlayedCompetitions();
    },
    retry: false,
  });

  if (isError) return <h1>Error</h1>;
  if (isLoading) return <h1>Loading</h1>;

  if(isEmpty(data)) return <h1>No Competitions Found!</h1>;

  return (
    <div className="flex flex-col gap-5 items-center">
      <h1 className="flex md:hidden text-center">My Competitions </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full">
        {data.map((item, index) => {
          const image = getImagePath(get(item, "banner"));
          return (
            <Link
              href={`/user/competitions/${item.competitionId}`}
              key={`competions-${index}`}
              className=" relative overflow-hidden	flex items-center justify-center rounded-md h-[250px] rounded-md"
            >
              <div className="absolute top-0 left-0 w-full h-full bg-black z-10 bg-opacity-20 rounded-md"></div>
              <Image
                src="/assets/icons/key.svg"
                width={50}
                height={20}
                className="absolute top-[30px] z-10"
                alt="key"
              />
              <Image
                src={image}
                alt={item.title}
                fill
                className="rounded-md object-cover z-5"
              />
              <div className="absolute flex flex-col gap-2 z-30 text-white text-center w-3/4	">
                <h1 className="text-2xl md:text-4xl	font-bold">{item.title}</h1>
                <p className="text-lg	">
                  {" "}
                  {new Date(item.startDate).toDateString()}
                </p>
              </div>
              <div className="p-5 z-30 absolute bottom-0 flex justify-between gap-2  text-white w-full">
                <div className="flex gap-2 group">
                  <span className="border-b text-xs"> View Order</span>
                  <span className="w-4 h-4 flex items-center justify-center bg-white rounded-full group-hover:ml-2 transition-all">
                    <ArrowRight color={"black"} size={12} />
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
