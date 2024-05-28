import SettingsForm from "@/components/SettingsForm"
import prisma from "@/prisma/db"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { redirect } from "next/navigation"
export async function getData(userId:string){
    const data = await prisma.user.findUnique({
        where:{
            id:userId
        },
        select:{
            userName:true
        }
    })
    return data
}
export default async function Settings(){
    const {getUser} = getKindeServerSession()
    const user =await getUser()
    if (!user){
        return redirect("api/auth/login")
    }
    const data = await getData(user.id)
    return <div >
        <SettingsForm username={data?.userName}/>
    </div>
}