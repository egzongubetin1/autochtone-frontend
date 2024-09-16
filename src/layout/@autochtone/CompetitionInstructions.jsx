import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

export default function CompetitionInstructions() {
  const items = [
    {
      title: "Select Tickets",
      desc: "Choose from 180 cars, with tickets starting at 90p",
      icon: "/assets/icons/ticket.svg",
    },
    {
      title: "Play Spot The Ball",
      desc: "Get closest to the judges in our skilled Spot the Ball game to win your Dream Car",
      icon: "/assets/icons/spot.svg",
    },
    {
      title: "Winner Announced",
      desc: "Closest position to our panel of Judges wins a car! Win runners-up prizes and credit in Zones 1-5. Ends midnight Sunday, Winners announced every Tuesday!",
      icon: "/assets/icons/trophy.svg",
    },
  ];

  return (
    <div className="flex flex-col gap-10 md:gap-20">
      <h1 className="text-2xl	font-bold	text-center">
        How to play our competitions
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-20">
        {items.map((data, index) => {
          return (
            <Card  key={`competions-instruction-${index}`}>
              <CardContent className="flex flex-col items-center text-center p-10 md:p-16 justify-center gap-5">
                <Image src={data.icon} alt="logo" width={50} height={100} />
                <h1 className="text-xl	">{data.title}</h1>
                <p className="text-base	text-slate-400">{data.desc}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
