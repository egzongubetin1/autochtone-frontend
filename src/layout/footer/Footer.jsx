import { Separator } from "@/components/ui/separator";
import { Facebook, Linkedin, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Subscribe from "../@autochtone/Subscribe";
import { map } from "lodash";
export default function Footer() {
  const footerSections = [
    {
      links: [{ href: "/competition", text: "Competitions" }],
    },
    {
      links: [
        { href: "/play-guide", text: "How to play" },
        { href: "", text: "Who are we?" },
        { href: "/play-guide", text: "How does it work?" },
      ],
    },
    {
      links: [{ href: "/contact", text: "Contact Us" }],
    },
  ];

  const socialMediaLinks = [
    { href: "", icon: <Linkedin width={12} /> },
    { href: "", icon: <Facebook width={12} /> },
    { href: "", icon: <Twitter width={12} /> },
  ];

  const FooterSection = ({ links }) => (
    <ul className="flex flex-col gap-3 font-light  text-gray-400 md:text-white">
      {map(links, (link, index) => (
        <li key={index}>
          <Link href={link.href}>{link.text}</Link>
        </li>
      ))}
    </ul>
  );

  return (
    <footer className="pt-20 bg-[#fafbfd]">
      <div className="text-white bg-secondary">
        <div className="container">
          <div className=" grid gap-5 md:gap-1 grid-cols-1 md:grid-cols-5 py-20">
            <div className="flex flex-col gap-5">
              <Link href="/" className="">
                <Image
                  src="/logo-white.svg"
                  alt="logo"
                  width={180}
                  height={100}
                />
              </Link>
              <p>+1 (7635) 547-12-97</p>
              <a href="mailto:info@autochtone.com">info@autochtone.com</a>
            </div>
            {map(footerSections, (section, index) => (
              <FooterSection key={index} links={section.links} />
            ))}
            <Subscribe />
          </div>
          <Separator className="bg-white bg-opacity-30	" />
          <div className=" py-5  gap-5 md:gap-1 pb-20 grid grid-cols-1 md:grid-cols-3 items-left md:items-center">
            <div className="flex gap-3">
              {socialMediaLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="hover:bg-white hover:text-primary border rounded-full w-8 h-8 flex items-center justify-center "
                >
                  {link.icon}
                </a>
              ))}{" "}
            </div>
            <ul className="flex justify-start md:justify-center gap-10 p-0">
              <li>
                <Link href="/terms-conditions">Terms</Link>
              </li>
              <li>
                <Link href="/privacy-policy">Privacy</Link>
              </li>
            </ul>
            <p className="text-left md:text-right">
              © {new Date().getFullYear()} Lift Media. All rights reserved
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
