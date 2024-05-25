import React, { useState, useEffect } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

import { cn } from "@/lib/utils";

type UserCardProps = {
  width: number;
};
const UserCard = ({ width }: UserCardProps) => {


  return (
    <div
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
      { width > 256 &&
      <div className="flex-1 grid grid-cols-3 text-sm font-semibold">
        <span className="col-span-2 text-black">
            { width > 365?   "Elmer Laverty" : width > 260 ? "Elmer Laverty".substring(0, 5) + '...' : ""}
        </span>
        
        { width > 338 && <span className="justify-self-end text-xs text-[#B2B2B2]">12 min</span>}
        <span className={("col-span-3 text-black/40")}>
         { width > 350?   "Hey, how are you?" : 
            width > 311 ?     "Hey, how are you?".substring(0, 10) + '...'
            :  "Hey, how are you?".substring(0, 5) 
         
         }
        </span>
      </div>}
    </div>
  );
};

export default UserCard;
