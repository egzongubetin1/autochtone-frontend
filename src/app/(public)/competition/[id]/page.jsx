import CompetitionItemCard from "@/components/custom/card/CompetitionItemCard";
import CountDown from "@/components/custom/countdown/countdown";
import { DEFAULT_FETCH_HEADERS, PAGINATION_LIMIT } from "@/data/constants";
import Banner from "@/layout/banner/Banner";
import { Pagination } from "@/layout/pagination/Pagination";
import { getImagePath, getRevalidateTime } from "@/utils/helpers";
import {  get, isEmpty, size } from "lodash";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

async function getCompetions() {
  const competition = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/competition`,
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

async function getCompetitionItem(id, page) {
  const competition = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/competition/${id}/item?page=${page}&limit=${PAGINATION_LIMIT}`,
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

export default async function Competitions({ params, searchParams }) {
  const currentPage = Number(searchParams?.page) || 1;
  const competitions = await getCompetions();

  if (isEmpty(competitions))
    return <h1 className="text-3xl text-center">No Competitions found!</h1>;

  const competitionItems = await getCompetitionItem(params.id, currentPage);

  const competitionIndex = competitions.findIndex((competition) => {
    return competition.competitionId == params.id;
  });

  if (competitionIndex === -1) return <></>;

  const image = getImagePath(get(competitions[competitionIndex], "banner"));
  const totalCompetitions = size(competitions);
  return (
    <div className="container flex flex-col gap-20">
      <div className="relative bg-blue-500 h-[500px] rounded-xl flex flex-col gap-10 items-center justify-center">
        <div className="rounded-lg	 absolute top-0 bottom-0 left-0 w-full h-full bg-black bg-opacity-50	z-10"></div>
        <div className="z-10 flex flex-col items-center gap-5">
          <h1 className="text-5xl	font-bold	text-white">Ends in</h1>
          <CountDown endDate={competitions[competitionIndex].endDate} />
        </div>
        <Image
          fill
          src={image}
          alt="competion"
          className="rounded-lg	object-cover z-5 bg-center"
        />
        {totalCompetitions > 1 && (
          <Link
            href={`/competition/${
              competitions?.[
                competitionIndex + 1 >= totalCompetitions
                  ? 0
                  : competitionIndex + 1
              ]?.competitionId
            }`}
            className="absolute top-0 text-white z-10 right-10 top-[50%]"
          >
            <ChevronRight size={50} />
          </Link>
        )}
      </div>
      <h1 className="font-bold	text-5xl text-center">
        DREAM CAR COMPETITION{" "}
        <span className="text-primary">ALL CARS BRAND NEW</span>
      </h1>
      <div className="grid grid-cols-4 gap-5">
        {get(competitionItems, "items", [])
          .slice(0, 8)
          .map((data, index) => {
            return (
              <CompetitionItemCard item={data} key={`car-card-${data.itemId}`} />
            );
          })}
      </div>
      <Banner
        title={"Our best Giveaway"}
        desc={"The Lucky John Won CLS 63s"}
        caption={"You can be the next Winner"}
        image={"/assets/black-car.jpeg"}
        link={"Click Here"}
        linkTo={""}
      />
      <div className="grid grid-cols-4 gap-5">
        {get(competitionItems, "items", [])
          .slice(8)
          .map((data, index) => {
            return (
              <CompetitionItemCard item={data} key={`car-card-${data.itemId}`} />
            );
          })}
      </div>
      <Pagination
        total={get(competitionItems, "totalItems", 0)}
        perPage={PAGINATION_LIMIT}
      />
    </div>
  );
}
