"use client";

import { getImagePath } from "@/utils/helpers";
import Image from "next/image";

const Icons = ({ src, ...props }) => (
  <div>
    <Image
      src={getImagePath(src)}
      alt="icon"
      width={25}
      height={25}
      {...props}
    />
  </div>
);
export { Icons };
