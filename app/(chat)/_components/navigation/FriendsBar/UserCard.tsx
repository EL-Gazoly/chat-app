import React from "react";
import Link from "next/link";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { cn } from "@/lib/utils";;
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { chat, reciever } from "@/types/chat.types";
type UserCardProps = {
  width?: number;
  chatId: string;
  chatMembers: any;
  chatInfo: chat;
  reciever: reciever;
};

const UserCard: React.FC<UserCardProps> = ({ chatId, width, chatMembers, reciever }) => {
   return (
    <Link
      href={`/conversations/${chatId}`}
      className={cn(
        "cursor-pointer w-full flex items-center gap-x-4 p-3 transition-all rounded-xl",
        width && width > 307 ? "" : "justify-center",
        width && width > 256 ? "hover:bg-[#CBD5E0]" : ""
      )}
      style={{ maxWidth: width }}
    >
      <Avatar className="w-12 h-12 rounded-xl">
        <AvatarImage className="w-12 h-12 rounded-xl" src={reciever?.imageUrl} />
        <AvatarFallback className="w-12 h-12 rounded-xl bg-red-100">
          {reciever?.username[0]}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 grid grid-cols-3 text-sm font-semibold">
        <span className="col-span-2 text-black line-clamp-1 uppercase">{reciever?.username}</span>
        {width && width > 338 && <span className="justify-self-end text-xs text-[#B2B2B2]">12 min</span>}
        <span className="col-span-3 text-black/40 line-clamp-1">Hey, how are you?</span>
      </div>
    </Link>
  );
};

export default UserCard;
