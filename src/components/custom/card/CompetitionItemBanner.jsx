import { Card, CardContent, CardFooter } from "../../ui/card";
import { Separator } from "../../ui/separator";
import Image from "next/image";
import AddWishlist from "../wishlist/AddWishlist";
import Link from "next/link";
import { get } from "lodash";
import { getImagePath } from "@/utils/helpers";
import EnterGameForm from "@/layout/competition/EnterGameForm";

export default function CompetitionItemBanner({ item }) {
  const image = getImagePath(get(item, "featuredImage"));
  const competitionId = get(item, "Competitions[0].competitionId", 0);

  const CompetitionItemId = get(
    item,
    "Competitions[0].CompetitionItem.competitionItemId"
  );

  if (!CompetitionItemId || !competitionId) return <></>;

  const isLocked =
    get(item, "Competitions[0].CompetitionItem.status") == "locked";

  return (
    <Card
      key={`competitions-instruction`}
      className={`${
        isLocked && "backdrop-blur-md"
      } relative text-white flex flex-col justify-end relative  bg-blue-100 p-0 m-0 h-[400px] bg-no-repeat bg-center `}
      style={{ backgroundImage: `url(${image})` }}
    >
      {isLocked && (
        <div className="absolute top-0 left-0 w-full h-full z-20 bg-black bg-opacity-40 rounded-md"></div>
      )}
      {isLocked && (
        <div className="z-50  flex  items-center justify-center z-10  absolute top-0 left-0 bottom-0 bg-white bg-opacity-10 w-full h-full">
          <div className="w-fit p-2 bg-secondary rounded-md">
            <Image
              src={"/assets/icons/key.svg"}
              alt="logo"
              width={50}
              height={100}
            />
          </div>
        </div>
      )}
      <CardContent
        className={`${
          isLocked && "blur-sm"
        } py-5 flex h-full flex-col justify-between `}
      >
        <div className="flex justify-between">
          <Image src={"/bbros-white.svg"} alt="logo" width={150} height={100} />
          <AddWishlist
            item={item}
            customStyle={
              "bg-white  p-2 w-[40px] h-[40px] text-primary rounded-full flex items-center justify-center"
            }
          />
        </div>
        <Link href={`/competition/item/${CompetitionItemId}`}>
          <div className="w-[30%] flex flex-col gap-3">
            <div>
              <h4 className="text-3xl font-bold">{item.title}</h4>
              <span className="text-[#B0B0B0] text-xl">
                {get(item, "subtitle")}
              </span>
            </div>
            <Separator />
            <div className="flex justify-between">
              <span className="text-xl">Price</span>
              <p className="text-xs">
                <span className="font-bold text-xl">{item.price} &euro;</span>
                /per ticket
              </p>
            </div>
          </div>
        </Link>
      </CardContent>
      <CardFooter className={` ${isLocked && "blur-sm"} w-[30%]`}>
        <EnterGameForm
          item={item}
          competitionId={competitionId}
          CompetitionItemId={CompetitionItemId}
        />
      </CardFooter>
    </Card>
  );
}
