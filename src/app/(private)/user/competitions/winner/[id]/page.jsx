import { Fragment } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ReadOnlyResults } from "@/components/custom/game/ReadOnlyResults";
import VideoBanner from "@/layout/banner/VideoBanner";

async function getCompetitionWinner(id) {
  //   const competition = await fetch(
  //     `${process.env.NEXT_PUBLIC_API_BASE_URL}/blog/${blogId}`,
  //     {
  //       headers: DEFAULT_FETCH_HEADERS,
  //       next: {
  //         revalidate: getRevalidateTime(420),
  //       },
  //     }
  //   );
  //   if (!competition.ok) {
  //     notFound();
  //   }
  //   const data = await competition.json();
  //   if (!data) {
  //     notFound();
  //   }
  //   return data;
}

export default async function CompetitionsWinner({ params }) {
  const data = await getCompetitionWinner(params.id);

  return (
    <Fragment>
      <div className="container flex flex-col gap-5 items-center">
        <h1 className="text-2xl	font-semibold	text-center">
          Dream Car Competition Winner & Results
        </h1>
        <p>The Lucky John Won CLS 63s (86,000€)</p>
        <div className="flex flex-col gap-20">
          <div className="flex flex-col gap-10">
            <VideoBanner
              title={"Our best Giveaway"}
              desc={"The Lucky John Won CLS 63s"}
              caption={"You can be the next Winner"}
              image={"/assets/black-car.jpeg"}
              link={"Click Here"}
              linkTo={""}
            />
            <h1 className="font-semibold	text-2xl	">
              The Lucky John Won CLS 63s (86,000€)
            </h1>
            <p>
              Lorem ipsum dolor sit amet consectetur. Eget quam pharetra
              placerat eleifend vulputate morbi nunc. At porttitor quisque urna
              eu. Egestas ullamcorper est cursus cursus faucibus porttitor
              aliquam aenean venenatis. Magna leo ut dictum eget orci mollis
              aliquam. Libero accumsan urna feugiat tincidunt.
            </p>
            <Button
              asChild
              variant={"secondary"}
              className="rounded-xl text-sm"
            >
              <Link
                href={`/competition/item/${params.id}`}
                className=" gap-2 flex py-0"
              >
                Play for the prize
              </Link>
            </Button>
          </div>
          <ReadOnlyResults points={[]} />
        </div>
      </div>
    </Fragment>
  );
}
