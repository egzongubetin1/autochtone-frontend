import Image from "next/image";
import Link from "next/link";
import HeaderAuth from "./HeaderAuth";
import HeaderCart from "./HeaderCart";
import HeaderWishlist from "./HeaderWishlist";
import MobileNavigation from "./MobileNavigation";
import HeaderNotification from "./HeaderNotification";

export default function Header() {
 return (
  <header className="z-50 w-full fixed top-0 bg-white text-base text-primary">
   <div className="py-2  md:py-5 items-center container px-[5px] md:px-[2rem] grid grid-cols-3 text-sm">
    <MobileNavigation />
    <div className="hidden md:flex gap-20">
     <Link href="/competition" className="font-extrabold	">
      Competitions
     </Link>
     <Link href="/play-guide">How to Play</Link>
    </div>

    <Link href="/" className="flex justify-center">
     <Image src="/logo.svg" alt="logo" width={200} height={100} />
    </Link>
    <div className="flex justify-end gap-4 items-center">
     <HeaderAuth />
     <div className="flex gap-5">
      <HeaderWishlist />
      <HeaderCart />
      <HeaderNotification />
     </div>
    </div>
   </div>
  </header>
 );
}
