"use client";
import React, { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createCommunity } from "@/app/actions";
import Link from "next/link";
import { SubmitButton } from "@/components/SubmitButtons";
import { useFormState } from "react-dom";

const communitySchema = z.object({
  name: z.string().min(2, {
    message: "Community name must be at least 2 characters.",
  }),
});

const initialState = {
  message: "",
  status: "",
};

const CommunityForm = () => {
  const [state, formAction] = useFormState(createCommunity, initialState);
  const { toast } = useToast();
  useEffect(() => {
    if (state?.status === "green") {
      toast({
        title: "Successful",
        description: state.message,
        variant: "default",
      });
    }
    if (state?.status === "error") {
      toast({
        title: "Error",
        description: state.message,
        variant: "destructive",
      });
    }
  }, [state,toast]);
  const form = useForm<z.infer<typeof communitySchema>>({
    resolver: zodResolver(communitySchema),
    defaultValues: {
      name:"",
    },
  });
  //   function onSubmit(data: z.infer<typeof settingSchema>) {
  //   }
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className=" h-full w-1/2">
        <Form {...form}>
          <form action={formAction} className="space-y-8">
            <h1 className=" mt-10 text-4xl">Create Community</h1>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl">Commumity Name</FormLabel>
                  <FormDescription>Create or Update Community Name!</FormDescription>
                  <FormControl>
                    <Input
                    // @ts-ignore
                      defaultValue={name ?? ""}
                      placeholder="Enter Your Community Name"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    {
                      state?.status === "error" ? (
                        <>
                          <div className="text-red-500">{state.message}</div>
                        </>
                      ) : (
                        <>
                          <div className="text-green-500">{state.message}</div>
                        </>
                      )
                    }
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex w-full justify-end gap-2">
              <Button
                className="focus:outline-none text-white bg-rose-500 hover:bg-rose-600 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                type="button"
              >
                <Link href={"/"}>Cancel</Link>
              </Button>
              <SubmitButton title="Create Community"/>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CommunityForm;
