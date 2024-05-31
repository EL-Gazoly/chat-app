"use client";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { Id } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { FilesMenu } from "./conversationInfo/FilesCard/FilesMenu";
import MobileNavigation from "@/app/(chat)/_components/MobileNavigation";
import { reciever } from "@/types/chat.types";

type RecievertHeaderProps = {
    Reciever?: reciever;
}
const RecievertHeader = ({ Reciever }: RecievertHeaderProps) => {
    const user = useQuery(api.users.getUserById, { id: Reciever?.clrekId ?? '' });
    return (
        <div className="flex items-center justify-between w-full bg-white py-1 sm:py-2 md:py-3 lg:py-4  xl:py-6 px-6 border-b border-[#E2E8F0]">
            <div className="flex items-center gap-x-4">
                <div className="flex items-center justify-center gap-x-6">
                    <div className="md:hidden">
                        <MobileNavigation />
                    </div>
                    <Avatar className="w-12 h-12 rounded-xl">
                        <AvatarImage className="rounded-xl" src={user?.imageUrl} alt="@shadcn" />
                        <AvatarFallback className="w-12 h-12 rounded-xl bg-red-400 flex items-center justify-center">
                            {user?.username[0]}
                        </AvatarFallback>
                    </Avatar>
                </div>
                <span className="text-sm md:text-base lg:text-lg xl:text-xl font-semibold capitalize">{user?.username}</span>
            </div>
            <div className="xl:hidden">
                <FilesMenu />
            </div>
        </div>
    );
}

export default RecievertHeader;
