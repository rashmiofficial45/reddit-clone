"use client"
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react"
import { useFormStatus } from "react-dom";

export function SubmitButton({title}:{title:string}){
    const { pending } = useFormStatus();
    
    return <div >
        <Button className={` bg-orfocus:outline-none text-white bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800`} type="submit" disabled={pending}>{pending ? (
            <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />Please wait
            </>
        ) : (
            title
        )}</Button>
    </div>
}
 
export function SaveButton(){
    const { pending } = useFormStatus();
    
    return <div >
        <Button className={`w-full bg-orfocus:outline-none text-white bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800`} type="submit" disabled={pending}>{pending ? (
            <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />Please wait
            </>
        ) : (
            "Save"
        )}</Button>
    </div>
}
 
