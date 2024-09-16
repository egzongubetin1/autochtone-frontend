import { Card, CardContent, CardFooter } from "../../ui/card";
import { Separator } from "../../ui/separator";
import Image from "next/image";
import AddWishlist from "../wishlist/AddWishlist";
import Link from "next/link";
import { get } from "lodash";
import { getImagePath } from "@/utils/helpers";
import EnterGameForm from "@/layout/competition/EnterGameForm";

export default function CompetitionItemCard({ item, isAvailable = true }) {
 const image = getImagePath(get(item, "image"));
 const competitionId = get(item, "Competitions[0].competitionId", 0);

 const CompetitionItemId = get(item, "Competitions[0].CompetitionItem.competitionItemId");

 if (!CompetitionItemId || !competitionId) return <></>;

 const isLocked = get(item, "Competitions[0].CompetitionItem.status") == "locked";

 return (
  <Card key={`competitions-instruction`} className="relative shadow bg-white p-0 m-0">
   {isLocked && (
    <div className="flex items-center justify-center z-10  absolute top-0 left-0 bottom-0 bg-white bg-opacity-10 w-full h-full">
     <div className="w-fit p-2 bg-secondary rounded-md">
      <Image src={"/assets/icons/key.svg"} alt="logo" width={50} height={100} />
     </div>
    </div>
   )}
   <CardContent className={`py-5 flex flex-col ${isLocked && "blur-sm "}`}>
    <div className="flex justify-between">
     <Image src={"/bbros.svg"} alt="logo" width={70} height={100} />
     <AddWishlist item={item} />
    </div>
    <Link href={`/competition/item/${CompetitionItemId}`} className="group">
     <div className="overflow-hidden relative h-[150px]">
      <Image src={image} alt={`${item.title} logo`} fill className="group-hover:scale-110	transition object-contain" />
     </div>
     <div className=" flex flex-col gap-3">
      <div>
       <h4 className="group-hover:text-primary text-lg">{item.title}</h4>
       <span className="text-[#B0B0B0] text-xs">{get(item, "subtitle")}</span>
      </div>
      <Separator />
      <div className="flex justify-between">
       <span className="text-sm">Price</span>
       <p className="text-xs">
        <span className="font-bold text-sm">{item.price} &euro;</span>
        /per ticket
       </p>
      </div>
     </div>
    </Link>
   </CardContent>
   <CardFooter className="w-full">
    <EnterGameForm item={item} competitionId={competitionId} CompetitionItemId={CompetitionItemId} />
   </CardFooter>
  </Card>
 );
}
