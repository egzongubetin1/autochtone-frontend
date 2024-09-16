"use client";

import * as React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Camera } from "lucide-react";
import { Input } from "../../ui/input";
import { toast } from "@/components/ui/use-toast";
import { getImagePath, getUserImagePath } from "@/utils/helpers";

export function AvatarUpload({ setImage, image, user }) {
  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileType = file.type;
      if (fileType === "image/png" || fileType === "image/jpeg") {
        const reader = new FileReader();
        reader.onload = () => {
          setImage(file);
        };
        reader.readAsDataURL(file);
      } else {
        toast({
          variant: "destructive",
          title: "Incorrect Format",
          description: "Only PNG and JPG formats are allowed.",
        });
      }
    }
  };

  const firstInitial = user.firstName.substring(0, 1);
  const lastInitial = user.lastName.substring(0, 1);

  return (
    <div className="flex flex-row items-start md:items-center gap-5 md:gap-10">
      <div className="relative">
        <Avatar className="w-[90px] h-[90px] bg-primary">
          {image || user.image ? (
            <AvatarImage
              src={
                image
                  ? URL.createObjectURL(image)
                  : getUserImagePath(user.image)
              }
              alt="Profile Picture"
            />
          ) : (
            <AvatarFallback className="bg-primary text-white text-2xl">
              {firstInitial}
              {lastInitial}
            </AvatarFallback>
          )}
        </Avatar>
        <div className="bg-yellow-400 w-8 h-8 rounded-full absolute bottom-0 right-0 flex items-center justify-center border border-white">
          <Camera color={"white"} size={20} />
        </div>
        <Input
          id="picture"
          type="file"
          className="absolute top-0 bottom-0 w-full h-full opacity-0"
          onChange={handleFileChange}
        />
      </div>
      <div className="flex flex-col">
        <h1 className="font-bold text-sm md:text-2xl	">Profile</h1>
        <p>Update your photo and personal details.</p>
      </div>
    </div>
  );
}
