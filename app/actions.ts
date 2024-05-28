'use server'
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import prisma from "@/prisma/db"
import { redirect } from "next/navigation"
import { NextResponse } from "next/server"

export async function updateUser(prevState:any , formData: FormData) {
    const {getUser} = getKindeServerSession()
    const user = await getUser()
    if(!user){
        redirect("/api/auth/login")
    }
    const username = formData.get('userName') as string
    try {
        const existUser =await prisma.user.findUnique({
            where:{
                userName:username
            }
        })
        if(existUser){
            return ({
                message:"username is already taken",
                status:"error"
            })
        }
        await prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                userName:username
            }
        })
           return ({
            message:"Username updated successfully",
            status:"green"
        })
    } catch (error:any) {
        console.error("Failed to update username:", error);
        
        return ({
            message: "Failed to update username",
            status:"error",
        });
    }
}