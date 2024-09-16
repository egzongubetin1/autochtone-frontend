import { DEFAULT_FETCH_HEADERS } from "@/data/constants";
import { getRevalidateTime } from "@/utils/helpers";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MailCheck } from "lucide-react";

async function verifySubscribe(token) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/subscriber/${token}`,
      {
        headers: DEFAULT_FETCH_HEADERS,
        next: {
          revalidate: getRevalidateTime(420),
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch random competition items");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    notFound();
  }
}

export default async function SubscribeVerify({ params }) {
  const token = params.token;
  const data = await verifySubscribe(token);

  return (
    <div className="container mt-[100px]">
      <Card
        className={
          "w-fit m-auto flex flex-col text-center gap-10 text-primary p-10 px-20"
        }
      >
        <CardContent className={"p-0 flex flex-col gap-5 items-center"}>
          <MailCheck size={60} />
          <h1>Successfully Subscribed!</h1>
        </CardContent>
      </Card>
    </div>
  );
}
