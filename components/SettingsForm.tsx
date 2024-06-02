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
import { updateUser } from "@/app/actions";
import Link from "next/link";
import { SubmitButton } from "./SubmitButtons";
import { useFormState } from "react-dom";

const settingSchema = z.object({
  userName: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

const initialState = {
  message: "",
  status: "",
};

const SettingsForm = ({
  username,
}: {
  username: string | null | undefined;
}) => {
  const [state, formAction] = useFormState(updateUser, initialState);
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
  const normalizedUsername = username ?? "";
  const form = useForm<z.infer<typeof settingSchema>>({
    resolver: zodResolver(settingSchema),
    defaultValues: {
      userName: normalizedUsername,
    },
  });
  //   function onSubmit(data: z.infer<typeof settingSchema>) {
  //   }
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className=" h-full w-1/2">
        <Form {...form}>
          <form action={formAction} className="space-y-8">
            <h1 className=" mt-10 text-4xl">Settings</h1>
            <FormField
              control={form.control}
              name="userName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className=" text-xl">Username</FormLabel>
                  <FormDescription>Enter new username!</FormDescription>
                  <FormControl>
                    <Input
                      defaultValue={username ?? ""}
                      placeholder="Enter Your New Username"
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
                className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                type="button"
              >
                <Link href={"/"}>Cancel</Link>
              </Button>
              <SubmitButton title="Change Username"/>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default SettingsForm;
