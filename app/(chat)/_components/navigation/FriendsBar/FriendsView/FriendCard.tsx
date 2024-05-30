import React from 'react'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Id } from '@/convex/_generated/dataModel';
import Link from 'next/link';
type FriednsCardProps = {
    friend: Friend
}
type Friend = {
    _id: Id<"friends">;
    _creationTime: number;
    friendRequest: string;
    userId: string;
    friendId: string;
    status: string;
}


export const FriendCard = ({friend}: FriednsCardProps) => {
  return (
    <Link href={`conversations/${friend.userId}`} className=' flex items-center gap-x-3 px-2'>
    <Avatar className=' w-12 h-12 rounded-xl'>
        <AvatarImage className=' w-12 h-12 rounded-xl' src='https://randomuser.me/api/portraits' />
        <AvatarFallback className=' w-12 h-12 rounded-xl bg-red-100'>CN</AvatarFallback>
    </Avatar>

    <span className=' text-black line-clamp-1 text-sm font-semibold'>John Doe</span>
</Link>
  )
}