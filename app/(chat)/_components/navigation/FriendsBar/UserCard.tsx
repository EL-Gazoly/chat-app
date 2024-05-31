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
  reciever: reciever;
  messages: any;
};

const UserCard: React.FC<UserCardProps> = ({ chatId, width, reciever, messages }) => {
  function getTimeDifference(timestamp: number): string {
    const units: { [key: string]: number } = {
        year: 365 * 24 * 60 * 60 * 1000,
        month: 30 * 24 * 60 * 60 * 1000,
        week: 7 * 24 * 60 * 60 * 1000,
        day: 24 * 60 * 60 * 1000,
        hour: 60 * 60 * 1000,
        minute: 60 * 1000,
    };

    const now = Date.now();
    const diff = now - timestamp;

    if (diff < units.minute) {
        return "just now";
    } else if (diff < units.hour) {
        const minutes = Math.floor(diff / units.minute);
        return `${minutes} minute${minutes !== 1 ? 's' : ''}`;
    } else if (diff < units.day) {
        const hours = Math.floor(diff / units.hour);
        return `${hours} hour${hours !== 1 ? 's' : ''}`;
    } else if (diff < units.week) {
        const days = Math.floor(diff / units.day);
        return `${days} day${days !== 1 ? 's' : ''}`;
    } else if (diff < units.month) {
        const weeks = Math.floor(diff / units.week);
        return `${weeks} week${weeks !== 1 ? 's' : ''}`;
    } else if (diff < units.year) {
        const months = Math.floor(diff / units.month);
        return `${months} month${months !== 1 ? 's' : ''}`;
    } else {
        const years = Math.floor(diff / units.year);
        return `${years} year${years !== 1 ? 's' : ''}`;
    }
}

  
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
        <AvatarFallback className="w-12 h-12 rounded-xl bg-red-100 font-semibold">
          {reciever?.username[0]}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 grid grid-cols-3 text-sm font-semibold">
        <span className="col-span-2 text-black line-clamp-1 uppercase">{reciever?.username}</span>
        {width && width > 338 && <span className="justify-self-end text-xs text-[#B2B2B2]">{messages?.length > 0? getTimeDifference( messages[0]?.createdAt ) : ""}</span>}
        <span className="col-span-3 text-black/40 line-clamp-1">{messages? messages[0]?.content : ''}</span>
      </div>
    </Link>
   
   
  );
};

export default UserCard;
