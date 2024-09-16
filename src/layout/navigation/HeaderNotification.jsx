"use client";
import Loading from "@/components/custom/loading";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAppSelector } from "@/redux/hooks";
import { NotificationService } from "@/services/NotificationService";
import { Bell } from "lucide-react";
import Image from "next/image";

export default function HeaderNotification() {
  // const { data, isLoading, isError } = useQuery({
  //   queryKey: ["user/competitions"],
  //   queryFn: async ({ queryKey }) => {
  //     return await NotificationService.get();
  //   },
  //   retry: false,
  // });

  // if (isError) return <h1>Error</h1>;

  const { isAuthenticated, user, fetchStatus } = useAppSelector(
    (state) => state.auth
  );

  if (!isAuthenticated) return;

  //DELETE THIS AFTER API
  const isLoading = false;
  const data = [
    {
      id: 1,
      title:
        "The Midweek Lifestyle competition 17 - 18 Jun 2024 results are in!",
      date: "March 1, 2023",
    },
    {
      id: 2,
      title:
        "The Midweek Lifestyle competition 17 - 18 Jun 2024 results are in!",
      date: "March 1, 2023",
    },
    {
      id: 3,
      title:
        "The Midweek Lifestyle competition 17 - 18 Jun 2024 results are in!",
      date: "March 1, 2023",
    },
  ];

  return (
    <>
      <Popover>
        <PopoverTrigger>
          <div className="relative">
            <Bell size={22} />
            <span className="absolute -top-[2px]  left-[10px] w-2.5 h-2.5 border border-white bg-red-500 rounded-full"></span>
          </div>
        </PopoverTrigger>
        <PopoverContent align="end" className="w-[400px]">
          {isLoading ? (
            <div>
              <Loading />
            </div>
          ) : (
            <div className="flex flex-col gap-5">
              <h1 className="font-medium	text-xl	">Notifications</h1>
              <div className="flex flex-col gap-2">
                {data.map((data, index) => {
                  return (
                    <div key={data.id} className="flex items-center gap-2">
                      <div className="bg-primary w-[30px] h-[30px] flex rounded-full items-center justify-center">
                        <Image
                          alt="blue_key"
                          src={"/assets/icons/key.svg"}
                          width={20}
                          height={20}
                        />
                      </div>
                      <div className="flex flex-col w-[90%]">
                        <p>{data.title}</p>
                        <span className="text-sm	text-gray-400">
                          {data.date}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </PopoverContent>
      </Popover>
    </>
  );
}
