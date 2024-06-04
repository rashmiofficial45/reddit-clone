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
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
// import { useFormState } from "react-dom";
// import { useToast } from "@/components/ui/use-toast";
import { createPost } from "@/app/actions";
import { JSONContent } from "@tiptap/react";
import Image from "next/image";
const initialState = {
  message: "",
  status: "",
};
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
export default function CreatePost({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [json, setJson] = useState<JSONContent | null>(null);
  const [title, setTitle] = useState<string | null>(null);
  const createPostComm = createPost.bind(null, { jsonContent: json });
  // const [state, formAction] = useFormState(createPostComm, initialState);
  // const { toast } = useToast();
  // useEffect(() => {
  //   if (state?.status === "green") {
  //     toast({
  //       title: "Successful",
  //       description: state.message,
  //       variant: "default",
  //     });
  //   }
  //   if (state?.status === "error") {
  //     toast({
  //       title: "Error",
  //       description: state.message,
  //       variant: "destructive",
  //     });
  //   }
  // }, [state,toast]);
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
                <form action={createPostComm}>
                  <input type="hidden" value={params.id} name="cmtyName" />
                  <input
                    type="hidden"
                    name="imageUrl"
                    value={imageUrl ?? undefined}
                  />
                  <Label>Title</Label>
                  <Input
                    name="title"
                    value={title ?? undefined}
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                    required
                    className="focus-visible:ring-slate-400"
                    type="text"
                  ></Input>
                  <div className="mt-4">
                    <TipTapEditor json={json} setJson={setJson} />
                  </div>
                  <div className="mt-4 flex justify-end">
                    <SubmitButton title="Create Post"></SubmitButton>
                  </div>
                </form>
              </Card>
            </TabsContent>
            <TabsContent value="file">
              <Card>
                {imageUrl === null ? (
                  <UploadDropzone
                    className="w-full ut-button:ut-readying:bg-orange-500 ut-button:ut-uploading:bg-orange-500 ut-button:ut-uploading:after:bg-orange-500  ut-button:bg-orange-500 ut-label:text-orange-500 "
                    endpoint="imageUploader"
                    onClientUploadComplete={(res) => {
                      setImageUrl(res[0].url);
                    }}
                    onUploadError={(error: Error) => {
                      alert("Error");
                      console.log(error);
                    }}
                  />
                ) : (
                  <div className="py-6 px-0 flex-col items-center justify-center">
                    <div className="text-center text-lg font-semibold">-- Preview --</div>

                    <Image
                      src={imageUrl}
                      alt="uploaded Image"
                      width={400}
                      height={300}
                      className="h-60 rounded-3xl object-contain w-full mt-2"
                    />
                  </div>
                )}
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
