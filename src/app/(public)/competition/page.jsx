import CompetitionItemBanner from "@/components/custom/card/CompetitionItemBanner";
import CompetitionItemCard from "@/components/custom/card/CompetitionItemCard";
import CountDown from "@/components/custom/countdown/countdown";
import { DEFAULT_FETCH_HEADERS, PAGINATION_LIMIT } from "@/data/constants";
import Banner from "@/layout/banner/Banner";
import { Pagination } from "@/layout/pagination/Pagination";
import { getImagePath, getRevalidateTime } from "@/utils/helpers";
import { get, isEmpty, size } from "lodash";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

async function getFeaturedItems() {
 const featured = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/competition/featured/items?query=1`, {
  headers: DEFAULT_FETCH_HEADERS,
  next: {
   revalidate: getRevalidateTime(420),
  },
 });

 if (!featured.ok) {
  return null;
 }

 const data = await featured.json();
 return data;
}

async function getCompetions() {
 const competition = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/competition`, {
  headers: DEFAULT_FETCH_HEADERS,
  next: {
   revalidate: getRevalidateTime(420),
  },
 });
 if (!competition.ok) {
  notFound();
 }

 const data = await competition.json();
 return data;
}

async function getCompetitionItem(id, page) {
 const competition = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/competition/${id}/item?page=${page}&limit=${PAGINATION_LIMIT}`, {
  headers: DEFAULT_FETCH_HEADERS,
  next: {
   revalidate: getRevalidateTime(420),
  },
 });
 if (!competition.ok) {
  notFound();
 }

 const data = await competition.json();

 return data;
}

export default async function Competitions({ searchParams }) {
 const currentPage = Number(searchParams?.page) || 1;
 const competitions = await getCompetions();
 const items = await getFeaturedItems();

 if (isEmpty(competitions)) return <h1 className="text-3xl text-center">No Competitions found!</h1>;

 const competitionItems = await getCompetitionItem(competitions[0].competitionId, currentPage);

 const competition = competitions[0];
 const image = getImagePath(get(competition, "banner"));

 return (
  <div className="container flex flex-col gap-10 md:gap-20 mt-20">
   <div className="rounded-md overflow-hidden relative bg-blue-500 h-[180px] md:h-[500px] rounded-xl flex flex-col gap-5 md:gap-10 items-center justify-center">
    <div className="absolute top-0 bottom-0 left-0 w-full h-full bg-black bg-opacity-50	z-10"></div>
    <div className="z-10 flex flex-col items-center gap-2 md:gap-5">
     <h1 className="text-sm md:text-5xl	font-bold	text-white">Ends in</h1>
     <CountDown endDate={competition.endDate} />
    </div>
    <Image fill src={image} alt="competion" className="rounded-md object-cover z-5 bg-center" />
    {size(competitions) > 1 && (
     <Link href={`/competition/${competitions?.[1]?.competitionId}`} className="absolute  text-white z-10 right-[5px] md:right-10  md:top-[50%]">
      <ChevronRight className="w-[25px] h-[25px] md:w-[60px]  md:h-[60px]" />
     </Link>
    )}
   </div>
   <h1 className="font-bold	text-2xl md:text-5xl text-center">
    DREAM CAR COMPETITION
    <span className="text-primary"> ALL CARS BRAND NEW</span>
   </h1>
   <div className="grid grid-cols-1 md:grid-cols-2 md:grid-cols-4 gap-5">
    {get(competitionItems, "items", [])
     .slice(0, 8)
     .map((data, index) => {
      return <CompetitionItemCard item={data} key={`car-card-${data.itemId}`} />;
     })}
   </div>
   {items && <CompetitionItemBanner item={get(items, "[0]", [])} />}
   <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
    {get(competitionItems, "items", [])
     .slice(9)
     .map((data, index) => {
      return <CompetitionItemCard item={data} key={`car-card-${data.itemId}`} />;
     })}
   </div>
   <Pagination total={get(competitionItems, "totalItems", 0)} perPage={PAGINATION_LIMIT} />
  </div>
 );
}
