import { Separator } from "@/components/ui/separator";
import { MessageCircleQuestion, MessageSquareMore, Phone } from "lucide-react";
import Link from "next/link";

export default function Navigation() {
  const navigation = [
    {
      name: "How to play",
      anchor: "/play-guide",
      icon: <MessageCircleQuestion />,
    },
    // {
    //   name: "Judges",
    //   anchor: "/judges",
    //   icon: <MessageCircleQuestion />,
    // },
    // {
    //   name: "Team",
    //   anchor: "/team",
    //   icon: <Users />,
    // },
    {
      name: "Blog",
      anchor: "/blog",
      icon: <MessageSquareMore />,
    },
    {
      name: "Contact",
      anchor: "/contact",
      icon: <Phone />,
    },
  ];

  return (
    <div className="hidden md:flex w-[250px] m-auto flex justify-center items-center pt-10">
      <div className="flex gap-40 m-auto w-fit ">
        {navigation.map((nav, index) => {
          return (
            <div className="relative" key={`navigation-${index}`}>
              <Link
                href={nav.anchor}
                key={index}
                className="flex flex-col text-xs text-center gap-2"
              >
                <div className="z-10 text-white w-10 h-10 rounded-full bg-primary flex justify-center items-center">
                  {nav.icon}
                </div>
                {nav.name}
              </Link>
              {index + 1 !== navigation.length && (
                <Separator className="z-5 absolute w-[130px] top-[40%] left-[55px]" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
