"use client";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
const RecievertHeader = () => {
    return ( 
        <div className="flex items-center justify-between w-full bg-white p-6 border-b border-[#E2E8F0]">
            <div className="flex items-center gap-x-4">
                <Avatar className=" w-12 h-12 rounded-xl">
                    <AvatarImage className=" rounded-xl" src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback className=" w-12 h-12 rounded-xl bg-red-400 flex items-center justify-center">CN</AvatarFallback>
                </Avatar>
                <span className=" text-sm md:text-base lg:text-lg xl:text-xl font-semibold">Florencio Dorrance</span>

            </div>
           
        </div>
     );
}
 
export default RecievertHeader;