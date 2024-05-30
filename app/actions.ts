"use server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "@/prisma/db";
import { redirect } from "next/navigation";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

export async function updateUser(prevState: any, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    redirect("/api/auth/login");
  }
  const username = formData.get("userName") as string;
  try {
    const existUser = await prisma.user.findUnique({
      where: {
        userName: username,
      },
    });
    if (existUser) {
      return {
        message: "username is already taken",
        status: "error",
      };
    }
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        userName: username,
      },
    });
    return {
      message: "Username updated successfully",
      status: "green",
    };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        // Prisma specific error code for unique constraint violation
        return {
          message: `Username '${username}' is already taken`,
          status: "error",
        };
      }
    }
    console.error("Failed to update user", error);
    return {
      message: "Failed to update user",
      status: "error",
    };
  }
}
export async function createCommunity(prevState: any, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    redirect("/api/auth/login");
  }
  const communityName = formData.get("name") as string;
  try {
    const existCommunity = await prisma.community.findUnique({
      where: {
        name: communityName,
      },
    });
    if (existCommunity) {
      return {
        message: "Community is already taken",
        status: "error",
      };
    }
    await prisma.community.create({
      data: {
        name: communityName,
        userId: user.id,
      },
    })
    return {
      message: "Username updated successfully",
      status: "green",
  }
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        // Prisma specific error code for unique constraint violation
        return {
          message: `Community name '${communityName}' is already taken`,
          status: "error",
        };
      }
    }
    console.error("Failed to Create community", error);
    return {
      message: "Failed to create community",
      status: "error",
    };
  }
}
export async function updateDescription(formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    redirect("/api/auth/login");
  }
  const description = formData.get("description") as string;
  const subName = formData.get("subName") as string;
  try {
    await prisma.community.update({
      where: {
        name: subName,
      },
      data:{
        description
      }
    });
    return {
      message: "Description updated successfully",
      status: "green",
  }
  } catch (error) {
    console.error("Failed to Create community", error);
    return {
      message: "Failed to update description",
      status: "error",
    };
  }
}
