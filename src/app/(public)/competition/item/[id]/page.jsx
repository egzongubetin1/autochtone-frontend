import CompetitionItemCard from "@/components/custom/card/CompetitionItemCard";

import { Icons } from "@/components/ui/icons";
import { DEFAULT_FETCH_HEADERS } from "@/data/constants";
import Banner from "@/layout/banner/Banner";
import CompetitionItemDetailCarousel from "@/layout/competition/CompetitionCarousel";
import EnterGameForm from "@/layout/competition/EnterGameForm";
import { getImagePath, getRevalidateTime } from "@/utils/helpers";
import { get } from "lodash";
import Image from "next/image";
import { notFound } from "next/navigation";

async function getCompetitionItemDetail(itemId) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/competition/${itemId}/details`,
      {
        headers: DEFAULT_FETCH_HEADERS,
        next: {
          revalidate: getRevalidateTime(420),
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch competition details");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    notFound();
  }
}

async function getRandomCompetitionItem(id) {
  if (!id) return [];

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/competition/${id}/item?limit=4`,
      {
        headers: DEFAULT_FETCH_HEADERS,
        next: {
          revalidate: getRevalidateTime(420),
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch random competition items");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    notFound();
  }
}

export default async function CompetitionDetails({ params }) {
  const item = await getCompetitionItemDetail(params.id);

  const competionId = get(item, "Competition.competitionId");
  const randomCompetitionItem = await getRandomCompetitionItem(competionId);

  const images = item?.Item?.Images ?? [];
  const options = item?.Item?.Options ?? [];

  return (
    <div className="container md:mt-28 flex flex-col gap-20">
      <div className="flex flex-col gap-5">
        <CompetitionItemDetailCarousel images={images} />
        <h1 className="md:hidden text-2xl min-w-[70%]">
          {get(item, "Item.title")}
        </h1>
        <div className="flex md:flex-col flex-col-reverse gap-5">
          <div className="grid grid-cols-1 md:grid-cols-3 w-full ">
            {" "}
            <h1 className="col-span-2 hidden md:flex text-2xl">
              {get(item, "Item.title")}
            </h1>
            <EnterGameForm
              item={item?.Item}
              competitionId={competionId}
              CompetitionItemId={item.competitionItemId}
              label={"Enter Now"}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3">
            <div className="col-span-2 w-full grid grid-cols-1 md:grid-cols-5 gap-2 md:border p-2 rounded-md">
              {options.map((feature, index) => (
                <div
                  key={`options-${index}`}
                  className="border-b md:border-none py-2 text-xs flex items-center justify-between md:justify-start gap-3"
                >
                  <Icons src={feature.icon} />
                  <div>
                    {feature.name} <br />
                  </div>
                </div>
              ))}
            </div>
            <div></div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <h1 className="text-2xl text-primary font-bold">More Prizes</h1>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          {randomCompetitionItem.items.map((data, index) => {
            return (
              <CompetitionItemCard
                item={data}
                // isAvailable={data.isAvailable} //<-to add
                key={`car-card-${data.itemId}`}
              />
            );
          })}
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <h1 className="text-2xl text-primary font-bold">
          Explore Our Competitions
        </h1>
        <Banner
          title={"Our best Giveaway"}
          desc={"The Lucky John Won CLS 63s"}
          caption={"You can be the next Winner"}
          image={"/assets/black-car.jpeg"}
          link={"Click Here"}
          linkTo={""}
        />
      </div>
    </div>
  );
}
