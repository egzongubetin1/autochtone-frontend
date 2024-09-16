import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import UserLayout from "@/layout/user/UserLayout";
import { CreditHistory } from "@/layout/user/credits/CreditHistory";
import { CreditLabel } from "@/layout/user/credits/CreditLabel";
import Image from "next/image";
import { Fragment } from "react";

export default function CreditsPage() {

  const zones = [
    { name: "Zone 1", percentage: 100 },
    { name: "Zone 2", percentage: 50 },
    { name: "Zone 3", percentage: 15 },
    { name: "Zone 4", percentage: 10 },
    { name: "Zone 5", percentage: 5 },
  ];

  return (
    <Fragment>
      <UserLayout active={"credits"}>
        <div className="flex flex-col gap-5 text-center">
          <h1 className="text-2xl	 font-semibold	">Game Credit</h1>
          <p className="font-light	">
            Game Credit is won for doing well in our Competitions, and won as
            Runner Up Prizes. It can also be earned by successfully referring a
            friend or by winning one of our many social media competitions.
          </p>
          <div className="flex flex-col gap-10">
            <div className="bg-primary w-fit m-auto px-5 py-2 text-white rounded-md text-sm md:text-2xl	">
              Credit Won <CreditLabel /> &euro;
            </div>
            <div className="w-fit flex flex-col gap-10 m-auto">
              <Card className="w-[400px]">
                <CardHeader>
                  <CardTitle className="text-2xl font-semibold	">
                    Credit Won
                  </CardTitle>
                </CardHeader>
                <CardContent className="w-[80%] m-auto grid grid-cols-2 items-center text-left gap-5  m-auto">
                  <Image
                    src="/assets/icons/ticks.svg"
                    width={80}
                    height={100}
                    alt={"dart"}
                  />
                  <p className="text-xs">
                    Every 5 ticket you buy, you win 1.20€
                  </p>
                </CardContent>
              </Card>
            </div>
            <div></div>
          </div>
        </div>
      </UserLayout>
      <div className="container">
        <CreditHistory />
      </div>
    </Fragment>
  );
}
