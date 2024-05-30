import { updateDescription } from "@/app/actions";
import { SaveButton } from "@/components/SubmitButtons";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import prisma from "@/prisma/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
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
  if(!user){
    return redirect("/api/auth/login")
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
                  <form action={updateDescription} className="grid w-full gap-2">
                    <input type="hidden" name="subName" value={params.id} />
                    <Textarea
                      maxLength={100}
                      name="description"
                      placeholder="Type your description here."
                    />
                    <SaveButton />
                  </form>
                </>
              ) : (
                <CardDescription>{data?.description}</CardDescription>
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
