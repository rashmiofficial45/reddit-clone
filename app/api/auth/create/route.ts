import prisma from "@/prisma/db"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { NextResponse } from "next/server"
import { generateUsername } from "unique-username-generator"
export async function GET(){
    const {getUser} = getKindeServerSession()
    const user =await getUser()
    console.log(user)
    if (!user || user==null || !user.id){
        return new Response("Unauthorized", {status: 401})
    }
    let dbUser = await prisma.user.findUnique(
        {
            where:{
                id: user.id
            }
        }
    )
    if(!dbUser){
        const dbUser = await prisma.user.create({
            data:{
                id: user.id,
                email: user.email || "",
                firstName:user.given_name || "",
                lastName:user.family_name || "",
                imageUrl:user.picture ,
                userName:generateUsername("-" , 3 , 15 )
            }
        })
    }
    return NextResponse.redirect("http://localhost:3000/")
}