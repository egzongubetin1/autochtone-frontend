"use client";

import { LinkedinIcon } from "lucide-react";
import {
  TwitterIcon,
  FacebookIcon,
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} from "react-share";

export default function SocialMediaShare() {
  return (
    <>
      <p className="text-sm text-gray-400">Share links</p>
      <div className="flex gap-2">
        <FacebookShareButton url={window.location.href} className="bg-red-100">
          <FacebookIcon size={25} round={true} color="red"/>
        </FacebookShareButton>
        <LinkedinShareButton url={window.location.href}>
          <LinkedinIcon size={25} round={true} />
        </LinkedinShareButton>
        <TwitterShareButton url={window.location.href}>
          <TwitterIcon size={25} round={true} />
        </TwitterShareButton>
      </div>
    </>
  );
}
