"use client";
import { Card } from "@/components/ui/card";
import { BookOpen, Upload, Video } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TipTapEditor } from "@/components/TipTapEditor";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/SubmitButtons";
import { UploadDropzone } from "@/components/Uploadthing";

export default async function CreatePost({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const rules = [
    {
      id: 1,
      text: "Remember the human",
    },
    {
      id: 2,
      text: "Behave like you would in real life",
    },
    {
      id: 3,
      text: "Look for the original form of content",
    },
    {
      id: 4,
      text: "Search for duplication before posting",
    },
    {
      id: 5,
      text: "Read the community guidlines ",
    },
  ];
  return (
    <div className="max-w-[1000px] flex mx-auto gap-x-10 mt-5">
      <div className="w-[65%]">
        <label className="select-none" htmlFor="community">
          Community:{" "}
        </label>
        <Link
          className="font-semibold text-orange-600"
          href={`/r/${params.id}`}
        >
          r/{params.id}
        </Link>
        <div>
          <Tabs defaultValue="postCreation" className="w-full">
            <TabsList className="grid grid-cols-2">
              <TabsTrigger className=" col-span-1" value="post">
                {" "}
                <Upload className="h-4" />
                Post
              </TabsTrigger>
              <TabsTrigger className=" col-span-1" value="file">
                {" "}
                <Video className="h-4" />
                Images/Videos
              </TabsTrigger>
            </TabsList>
            <TabsContent value="post">
              <Card className="p-4 ">
                <label htmlFor="title">Title</label>
                <Input
                  className="focus-visible:ring-transparent"
                  type="text"
                ></Input>
                <div className="mt-4">
                  <TipTapEditor />
                </div>
                <div className="mt-4 flex justify-end">
                  <SubmitButton title="Create Post"></SubmitButton>
                </div>
              </Card>
            </TabsContent>
            <TabsContent value="file">
              <Card>
                <UploadDropzone
                  className="w-full ut-button:ut-readying:bg-orange-500 ut-button:ut-uploading:bg-orange-500 ut-button:ut-uploading:after:bg-orange-500  ut-button:bg-orange-500 ut-label:text-orange-500 "
                  endpoint="imageUploader"
                  onClientUploadComplete={(res: any) => {
                    console.log(res);
                  }}
                  onUploadError={(error: Error) => {
                    alert("Error");
                    console.log(error);
                  }}
                />
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <div className="w-[35%] h-full">
        <Card className="w-full flex-col">
          <div className=" flex items-center gap-x-4 p-4 ">
            <BookOpen height={30} width={30} />
            <div>Posting on Dev-Community</div>
          </div>

          <Separator />
          <div className="p-4 flex-col gap-y-5">
            {rules.map((rule) => (
              <div key={rule.id}>
                <p>
                  {rule.id}.{rule.text}
                </p>
                <Separator className="my-3 " />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
