"use client";
import { Avatar, AvatarImage, AvatarFallback} from "@radix-ui/react-avatar";
const TeamMembers = () => {
    return ( 
        <div className=" flex flex-col gap-y-2 h-[502px] overflow-y-auto px-4 border-b border-border">
            <div className=" flex items-center gap-x-2 text-sm font-semibold">
                <span>Team Members</span>
                <div className=" flex items-center justify-center rounded-full py-1 px-2 bg-[#EDF2F7]">
                    <span>4</span>
                </div>
            </div>
            <MemberCard />
            <MemberCard />
            <MemberCard />
            <MemberCard />
            <MemberCard />
            <MemberCard />
            <MemberCard />


        </div>
     );
}
 
export default TeamMembers;

const MemberCard = () => {
    return ( 
      <div className=" flex items-center gap-x-4 p-3 text-sm font-semibold">
               <Avatar className=" w-12 h-12 rounded-xl">
                    <AvatarImage className=" rounded-xl" src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback className=" w-12 h-12 rounded-xl bg-red-400 flex items-center justify-center">CN</AvatarFallback>
                </Avatar>
                <span>
                    Florencio Dorrance
                </span>
      </div>
     );
}