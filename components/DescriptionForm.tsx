"use client"
import { updateDescription } from "@/app/actions";
import { SaveButton } from "@/components/SubmitButtons";
import { Textarea } from "@/components/ui/textarea";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import { useToast } from "./ui/use-toast";
interface CommunityForm{
    subName:string,
    description:string | null | undefined
}
const initialState={
    message:"",
    status:""
}

export function DescriptionForm({
    subName,description
}:CommunityForm){
    const [state, formAction] = useFormState(updateDescription, initialState);
    const {toast} = useToast()
    useEffect(()=>{
        if(state.status=="green"){
            toast({
                title:"Successful",
                description:state.message,
                variant:"default"
            })
        }
        if(state.status=="error"){
            toast({
                title:"Error",
                description:state.message,
                variant:"destructive"
            })
        }
    },[state,toast])
    return <div>
        <form action={formAction} className="grid w-full gap-2">
                    <input type="hidden" name="subName" value={subName} />
                    <Textarea
                      maxLength={100}
                      name="description"
                      placeholder="Type your description here."
                      defaultValue={description ?? undefined}
                    />
                    <SaveButton />
                  </form>
    </div>
} 