import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import prisma from "@/prisma/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { DescriptionForm } from "@/components/DescriptionForm";
import { Cake } from "lucide-react";
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button";
export const getData = async (name: string) => {
  const data = await prisma.community.findUnique({
    where: {
      name: name,
    },
    select: {
      name: true,
      description: true,
      userId: true,
      createdAt: true,
    },
  });
  return data;
};
export default async function CommunityPage({
  params,
}: {
  params: { id: string };
}) {
  const data = await getData(params.id);
  console.log(data);
  const text = data?.name.charAt(0);
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    return redirect("/api/auth/login");
  }
  return (
    <div className=" max-w-[1000px] mx-auto flex gap-10-x mt-4">
      <div className=" w-[65%] flex flex-col gap-y-5">hi left side</div>
      <div className=" w-[35%]">
        <Card>
          <div className="bg-muted text-xl font-semibold p-4">
            {" "}
            About Community
          </div>
          <div className="p-4">
            <div className=" flex items-center gap-x-3">
              <Image
                className=" rounded-full"
                src={`https://avatar.vercel.sh/${data?.name}.svg?text=${text}`}
                alt="community icon"
                width={60}
                height={60}
              ></Image>
              <Link href={`/r/${data?.name}`} className="text-md font-medium">
                r/{data?.name}
              </Link>
            </div>
            <div className=" mt-4">
              {user?.id === data?.userId ? (
                <>
                  <DescriptionForm
                    subName={params.id}
                    description={data?.description}
                  />
                </>
              ) : (
                <CardDescription>{data?.description}</CardDescription>
              )}
              <>
                <div className="mt-3 flex items-center gap-2">
                  <Cake className=" text-muted-foreground" />
                  <div className=" text-md text-center font-semibold text-muted-foreground">
                    Created : {""}
                    {new Date(data?.createdAt as Date).toLocaleDateString(
                      "en-us",
                      {
                        weekday: "long",
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      }
                    )}
                  </div>
                </div>
                <Separator className="my-3"/>
                <Button className="w-full text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                  <Link href={`/r/${data?.name}/create`} className="text-md font-medium">
                    Create Post
                  </Link>
                </Button>
              </>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
