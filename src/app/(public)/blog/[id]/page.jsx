import SocialMediaShare from "@/components/custom/social-media/SocialMediaShare";
import { DEFAULT_FETCH_HEADERS } from "@/data/constants";
import { getImagePath, getRevalidateTime } from "@/utils/helpers";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import remarkBreaks from "remark-breaks";
import { notFound } from "next/navigation";
import { ReadOnlyResults } from "@/components/custom/game/ReadOnlyResults";

async function getBlogDetail(blogId) {
  const competition = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/blog/${blogId}`,
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

  if (!data) {
    notFound();
  }

  return data;
}

async function getWinnerDetails(winnerId) {
  const details = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/winner/${winnerId}/details`,
    {
      headers: DEFAULT_FETCH_HEADERS,
      next: {
        revalidate: getRevalidateTime(420),
      },
    }
  );
  if (details.ok) {
    const data = await details.json();
    return data;
  }
  return {};
}

export default async function BlogDetails({ params }) {
  let data = {};
  const { title, image, content, winnerId } = await getBlogDetail(params.id);
  if(winnerId) data = await getWinnerDetails(winnerId);

  return (
    <div className="container flex flex-col gap-10">
      <div className="flex flex-col gap-2 items-center">
        <h1 className="text-2xl md:text-4xl	font-semibold">{title}</h1>
        <div className="flex gap-2 items-center justify-center text-slate-500">
          Autochtone
        </div>
        {/* <SocialMediaShare /> */}
      </div>
      <div className="relative h-[350px]">
        <Image
          src={getImagePath(image)}
          alt="car"
          fill
          className="rounded-md object-cover z-5 bg-center"
        />
      </div>
      <div className="grid grid-cols-5 gap-3">
        <ReactMarkdown
          remarkPlugins={[remarkGfm, remarkBreaks]}
          rehypePlugins={[rehypeRaw]}
        >
          {content}
        </ReactMarkdown>
      </div>

      {data?.orders && data?.competition && (
        <ReadOnlyResults 
          showWinner={false}
          orders={data.orders}
          competition={data.competition}
        />
      )}
    </div>
  );
}
