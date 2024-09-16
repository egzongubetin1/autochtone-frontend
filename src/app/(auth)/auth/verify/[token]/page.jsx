import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DEFAULT_FETCH_HEADERS } from "@/data/constants";
import { getRevalidateTime } from "@/utils/helpers";
import { MailCheck } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

async function verifyToken(token) {
  console.log(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/verify?token=${token}`
  );
  const competition = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/verify?token=${token}`,
    {
      headers: DEFAULT_FETCH_HEADERS,
      next: {
        revalidate: getRevalidateTime(420),
      },
    }
  );
  if (!competition.ok) {
    notFound();
  }

  return competition.status;
}

export default async function VerifyAccount({ params }) {
  const verifyUser = await verifyToken(params.token);

  return (
    <div className="container mt-[100px]">
      <Card
        className={
          "w-fit m-auto flex flex-col text-center gap-10 text-primary p-10 px-20"
        }
      >
        <CardContent className={"p-0 flex flex-col gap-5 items-center"}>
          <MailCheck size={60} />
          <h1>Successfully Verified</h1>
          <Button asChild variant={"secondary"}>
            <Link href={`/login`} className=" w-full">
              Login
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
