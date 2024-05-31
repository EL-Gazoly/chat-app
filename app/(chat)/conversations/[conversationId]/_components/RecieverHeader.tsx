"use client";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { Id } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { FilesMenu } from "./conversationInfo/FilesCard/FilesMenu";
type RecievertHeaderProps = {
    name? : string;
    Reciever? : Reciever
}
type Reciever = {
    _id: Id<"chatMembers">;
    _creationTime: number;
    userId: string;
    chatId: string;
    JoinedAt: number;
}
const RecievertHeader = ( {name , Reciever} : RecievertHeaderProps ) => {
    const user = useQuery(api.users.getUserById, { id: Reciever?.userId ?? '' }); 
    return ( 
        <div className="flex items-center justify-between w-full bg-white p-6 border-b border-[#E2E8F0]">
            <div className="flex items-center gap-x-4">
                <Avatar className=" w-12 h-12 rounded-xl">
                    <AvatarImage className=" rounded-xl" src={user?.imageUrl} alt="@shadcn" />
                    <AvatarFallback className=" w-12 h-12 rounded-xl bg-red-400 flex items-center justify-center">
                        {user ? user?.username.charAt(0) : name?.charAt(0)}
                    </AvatarFallback>
                </Avatar>
                <span className=" text-sm md:text-base lg:text-lg xl:text-xl font-semibold capitalize">{user? user.username : name}</span>

            </div>
            <div className=" lg:hidden">
            <FilesMenu />
            </div>
           
        </div>
     );
}
 
export default RecievertHeader;