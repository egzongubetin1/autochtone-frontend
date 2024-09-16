import Image from "next/image";
import Link from "next/link";
import { Button } from "../components/ui/button";
import CompetitionInstructions from "../layout/@autochtone/CompetitionInstructions";
import TrustedBy from "../layout/@autochtone/TrustedBy";
import Banner from "../layout/banner/Banner";
import { Card, CardContent } from "../components/ui/card";
import { DEFAULT_FETCH_HEADERS } from "../data/constants";
import { getImagePath, getRevalidateTime } from "@/utils/helpers";
import { notFound } from "next/navigation";
import { get } from "lodash";
import VideoBanner from "@/layout/banner/VideoBanner";

async function getFeaturedItems() {
 const featured = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/competition/featured/items`, {
  headers: DEFAULT_FETCH_HEADERS,
  next: {
   revalidate: getRevalidateTime(420),
  },
 });
 if (!featured.ok) {
  notFound();
 }

 const data = await featured.json();
 return data;
}

async function getFeaturedCompetition() {
 const featured = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/competition/featured`, {
  headers: DEFAULT_FETCH_HEADERS,
  next: {
   revalidate: getRevalidateTime(420),
  },
 });
 if (!featured.ok) {
  notFound();
 }

 const data = await featured.json();
 return data;
}

export default async function Home() {
 const items = await getFeaturedItems();
 const competition = await getFeaturedCompetition();
 const banner = getImagePath(get(competition, "banner"));

 return (
  <main className="bg-[#fafbfd] py-10">
   <div className="container flex flex-col gap-20">
    <div className="grid grid-cols-1 gap-10 md:grid-cols-2 items-center  md:h-[80vh]">
     <div className="flex gap-5 flex-col  text-center md:text-left">
      <h1 className="text-base md:text-7xl font-semibold	">
       Win <span className="text-primary">favourite</span> gifts or tax free <span className="text-primary">cash</span>
      </h1>
      <p>Today Only: Credit Car - Get 50% Back!</p>
      <div className="flex gap-5 w-fit m-auto md:m-0 mt-10">
       <Button asChild variant={"secondary"} className="rounded-xl w-[130px] text-sm">
        <Link href="/competition">Get Started</Link>
       </Button>
       <Button asChild variant={"outline"} className="rounded-xl w-[130px] text-sm">
        <Link href="/play-guide">How to play</Link>
       </Button>
      </div>
     </div>
     <div className="relative overflow-hidden	flex items-center justify-center rounded-3xl  h-[300px] md:h-full">
      <Image src="/assets/icons/key.svg" width={200} height={100} alt="key" className="absolute bottom-[30px] z-10 right-[10px] opacity-20" />
      <div className="absolute flex flex-col gap-5 z-30 text-white text-center w-3/4	">
       <h1 className="text-base md:text-4xl	font-bold	">WIN YOUR DREAM CAR WITH US</h1>
       <p className="text-base md:text-2xl	">Prizes that blow your mind</p>
      </div>
      {/* <Image src="/assets/homeBanner.jpeg" alt="car" fill className="rounded-md object-cover " /> */}
      <video className="w-[1400px] h-[1200px]  opacity-70 rounded-lg object-cover" autoPlay loop muted>
       <source src="/assets/videos/merca.mp4" type="video/mp4" />
       Your browser does not support the video tag.
      </video>
     </div>
    </div>
    <div className="flex flex-col gap-20">
     <h1 className="text-2xl	font-bold	text-center">Explore Our Competitions</h1>
     <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
      {items.map((data, index) => {
       const image = getImagePath(get(data, "image"));
       return (
        <Card key={`competions-instruction-${index}`} className="shadow border-0	 bg-white p-0 m-0">
         <CardContent className=" rounded-xl p-0 bg-white grid grid-cols-2 items-center">
          <div className="p-4 flex flex-col gap-5">
           <h1 className="text-xl	">{data.title}</h1>
           <p className="text-base	text-slate-400">{data.subtitle}</p>
           <Button asChild variant={"secondary"} className="rounded-xl w-fit text-sm">
            <Link href={`/competition/item/${data.Competitions[0].CompetitionItem.competitionItemId}`} className="py-0">
             Enter Now
            </Link>
           </Button>
          </div>
          <div className="h-[250px] relative rounded-tr-md rounded-br-md bg-[#DEDEDE]" style={{ transform: "scaleX(-1)" }}>
           <Image
            src={image}
            alt="logo"
            fill
            className="absolute bottom-[50px] h-[80%] right-[0px] object-cover rounded-tr-md rounded-br-md object-[20%]"
           />
          </div>
         </CardContent>
        </Card>
       );
      })}
     </div>
    </div>
    <div className="flex flex-col gap-20">
     <h1 className="text-2xl	font-bold	text-center">Prizes that blows your mind</h1>
     <Banner
      title={get(competition, "title")}
      desc={get(competition, "description")}
      image={banner}
      link={"Enter Now"}
      linkTo={"/competition"}
      classes="min-h-[500px] bg-gradient-to-b from-slate-50 to-gray-900"
     />
    </div>
    <CompetitionInstructions />
    {/* <Banner
     title={"Our best Giveaway"}
     desc={"The Lucky John Won CLS 63s"}
     caption={"You can be the next Winner"}
     image={"/assets/black-car.jpeg"}
     link={"Click Here"}
     linkTo={""}
    /> */}
    <VideoBanner
     title={"Our best Giveaway"}
     desc={"The Lucky John Won CLS 63s"}
     caption={"You can be the next Winner"}
     image={"/assets/black-car.jpeg"}
     link={"/assets/videos/merca.mp4"}
     linkTo={""}
    />
    <TrustedBy />
   </div>
  </main>
 );
}
