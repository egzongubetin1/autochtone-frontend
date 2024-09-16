import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Banner({ image, title, desc, link, caption, linkTo, classes }) {
 return (
  <div className={`relative overflow-hidden	h-[350px] md:h-[550px] flex items-center justify-center rounded-3xl  ${classes}`}>
   <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50	z-10"></div>
   <div className="items-center absolute flex flex-col gap-5 z-30 text-white text-center w-3/4	">
    <h1 className="text-2xl md:text-4xl	font-bold	">{title}</h1>
    <p className="text-xl md:text-2xl	">{desc}</p>
    <p>{caption}</p>
    <Button asChild variant={"secondary"} className="rounded-xl w-[130px] text-sm">
     <Link href={linkTo}>{link}</Link>
    </Button>
   </div>
   <Image src={image} alt="car" fill className="rounded-md object-cover" />
  </div>
 );
}
