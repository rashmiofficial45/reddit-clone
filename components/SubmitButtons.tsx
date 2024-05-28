import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react"
import { useFormStatus } from "react-dom";

export function SubmitButton(){
    const { pending } = useFormStatus();
    
    return <div >
        <Button className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" type="submit" disabled={pending}>{pending ? (
            <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />Please wait
            </>
        ) : "Change Username"}</Button>
    </div>
}
 
