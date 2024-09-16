import Logout from "@/components/custom/buttons/Logout";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default function UserLayout({ children, active = "credits" }) {
  const menuItems = [
    { label: "Game Credit", href: "/user/credits", name: "credits" },
    {
      label: "My Competitions",
      href: "/user/competitions",
      name: "competitions",
    },
    { label: "My Details", href: "/user/details", name: "details" },
  ];

  return (
    <div className="flex container flex-col gap-10">
      <h1 className="hidden md:flex text-2xl font-semibold	">Settings</h1>
      <Separator className={"hidden md:flex"} />

      <div className="flex gap-20">
        <ul className="hidden md:flex  flex flex-col gap-10 font-bold text-secondary w-full md:w-[250px]">
          {menuItems.map((item) => (
            <li
              key={item.href}
              className={`p-3 ${
                active === item.name
                  ? "bg-[#E4E8F8] text-black rounded-md w-fit"
                  : ""
              }`}
            >
              <Link href={item.href}>{item.label}</Link>
            </li>
          ))}
          <li>
            <Logout style="text-secondary px-3 text-[16px] font-semibold" />
          </li>
        </ul>
        <div className="w-full"> {children}</div>
      </div>
    </div>
  );
}
