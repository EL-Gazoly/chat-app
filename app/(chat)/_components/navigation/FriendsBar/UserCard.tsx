import React, { useState, useEffect } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";

import { cn } from "@/lib/utils";

type UserCardProps = {
  width: number;
  userId: string;
};
const UserCard = ({ width, userId }: UserCardProps) => {


  return (
    <Link
      href={`/conversations/${userId}`}
      className={cn(
        " cursor-pointer w-full flex items-center gap-x-4 p-3 transition-all  rounded-xl",
        width > 307 ? "" : "justify-center",
        width > 256 ? "hover:bg-[#CBD5E0]" : ""
      )}
      style={{ maxWidth: width }}
    >
      <Avatar className="w-12 h-12 rounded-xl">
        <AvatarImage
          className="w-12 h-12 rounded-xl"
          src="https://randomuser.me/api/portraits"
        />
        <AvatarFallback className="w-12 h-12 rounded-xl bg-red-100">CN</AvatarFallback>
      </Avatar>
      <div className="flex-1 grid grid-cols-3 text-sm font-semibold">
        <span className="col-span-2 text-black line-clamp-1">
            John Doe
        </span>
        
        { width > 338 && <span className="justify-self-end text-xs text-[#B2B2B2]">12 min</span>}
        <span className="col-span-3 text-black/40 line-clamp-1 ">
          Hey, how are you?
        </span>
      </div>
    </Link>
  );
};

export default UserCard;
