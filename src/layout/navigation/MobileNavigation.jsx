"use client";
import { get } from "lodash";
import {
  Heart,
  House,
  MessageCircleQuestion,
  MessageSquareMore,
  Phone,
  Trophy,
  User,
} from "lucide-react";
import Link from "next/link";
import Hamburger from "hamburger-react";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/redux/hooks";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Logout from "@/components/custom/buttons/Logout";
import Loading from "@/components/custom/loading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function MobileNavigation() {
  const [isOpen, setOpen] = useState(false);
  const { isAuthenticated, user, fetchStatus } = useAppSelector(
    (state) => state.auth
  );

  const navigation = [
    {
      name: "Home",
      anchor: "/",
      icon: <House />,
    },
    {
      name: "Competitions",
      anchor: "/competition",
      icon: <Trophy />,
    },
    {
      name: "How to play",
      anchor: "/play-guide",
      icon: <MessageCircleQuestion />,
    },
    {
      name: "Favorites",
      anchor: "/wishlist",
      icon: <Heart />,
    },
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

  function userAvatar() {
    let title = "Hi";

    if (isAuthenticated) {
      const firstInitial = user.firstName.substring(0, 1);
      const lastInitial = user.lastName.substring(0, 1);

      title = `${firstInitial} ${lastInitial}`;
    }

    if (fetchStatus === "pending")
      return (
        <div className="flex items-start justify-start">
          <Loading />
        </div>
      );

    return (
      <div>
        <div className="flex gap-2 items-center">
          <Avatar className="w-[70px] h-[70px] bg-primary">
            <AvatarFallback className="bg-primary text-white text-xl">
              {title}
            </AvatarFallback>
          </Avatar>
          {!isAuthenticated && (
            <div className="flex flex-col gap-2 text-xs">
              Need an account?{" "}
              <Link href="/register" onClick={() => setOpen(false)}>
                Register
              </Link>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2 mt-2 text-xs">
          {isAuthenticated && (
            <>
              <span>
                {user?.firstName} {user?.lastName}
              </span>
              <span>{get(user, "credits", "0.00")} &euro;</span>
            </>
          )}
        </div>
      </div>
    );
  }

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <div className="flex md:hidden">
      <Hamburger toggled={isOpen} toggle={setOpen} size={20} />
      {isOpen && (
        <div
          className="fixed top-0  h-screen left-0 w-full  z-30 bg-black bg-opacity-50	"
          onClick={() => setOpen(false)}
        >
          <div
            className="p-5 fixed top-0 bg-white min-h-screen max-h-screen left-0 w-[80%] shadow z-50 flex flex-col justify-between overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="flex flex-col gap-10"
              onClick={(e) => e.stopPropagation()}
            >
              {userAvatar()}
              <div className="flex flex-col gap-5">
                {navigation.map((nav, index) => {
                  return (
                    <div className="relative" key={`navigation-${index}`}>
                      <Link
                        href={nav.anchor}
                        key={index}
                        className="flex items-center text-sm text-black text-center gap-2"
                        onClick={() => setOpen(false)}
                      >
                        <div className="z-10 text-primary w-10 h-10  flex justify-center items-center">
                          {nav.icon}
                        </div>
                        {nav.name}
                      </Link>
                    </div>
                  );
                })}
                {isAuthenticated && (
                  <div>
                    <Accordion
                      type="single"
                      collapsible
                      className="p-0 w-full border-none"
                    >
                      <AccordionItem
                        value="profile"
                        className="p-0 border-none"
                      >
                        <AccordionTrigger className="p-0  border-none">
                          {" "}
                          <div className="flex gap-2 items-center">
                            <div className="z-10 text-primary w-10 h-10  flex justify-center items-center">
                              <User />
                            </div>
                            Profile
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="flex flex-col pl-10 gap-5">
                          <Link
                            href={"/user/competitions"}
                            className="flex items-center text-sm text-black text-center gap-2"
                            onClick={() => setOpen(false)}
                          >
                            My Competitions
                          </Link>
                          <Link
                            href={"/user/credits"}
                            className="flex items-center text-sm text-black text-center gap-2"
                            onClick={() => setOpen(false)}
                          >
                            Game Credit
                          </Link>
                          <Link
                            href={"/user/details"}
                            className="flex items-center text-sm text-black text-center gap-2"
                            onClick={() => setOpen(false)}
                          >
                            My details
                          </Link>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                )}
              </div>
            </div>

            {isAuthenticated ? (
              <Logout style="bg-secondary w-full text-white text-center" />
            ) : (
              <Link
                href="/login"
                className="p-2  rounded-md bg-secondary w-full text-white text-center"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
