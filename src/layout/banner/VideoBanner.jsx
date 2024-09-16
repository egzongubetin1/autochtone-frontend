"use client";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function VideoBanner({ image, title, desc, link, caption, linkTo, classes }) {
 const [isVideoPlaying, setIsVideoPlaying] = useState(false);

 const handleMouseEnter = () => {
  setIsVideoPlaying(true);
 };

 const handleMouseLeave = () => {
  setIsVideoPlaying(false);
 };

 return (
  <div
   className={`relative overflow-hidden h-[350px] md:h-[550px] flex items-center justify-center rounded-3xl ${classes}`}
   onMouseEnter={handleMouseEnter}
   onMouseLeave={handleMouseLeave}
  >
   <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 z-10"></div>
   <div className="items-center absolute flex flex-col gap-5 z-30 text-white text-center w-3/4">
    <h1 className="text-2xl md:text-4xl font-bold">{title}</h1>
    <p className="text-xl md:text-2xl">{desc}</p>
    <p>{caption}</p>
    {!isVideoPlaying && (
     <Button asChild variant={"secondary"} className="rounded-xl w-[50px] cursor-pointer text-sm">
      <Play />
     </Button>
    )}
   </div>
   {isVideoPlaying ? (
    <video className="absolute inset-0 w-full h-full object-cover rounded-md" autoPlay muted playsInline>
     <source src={link} type="video/mp4" />
     Your browser does not support the video tag.
    </video>
   ) : (
    <Image src={image} alt="banner" fill className="rounded-md object-cover" />
   )}
  </div>
 );
}
