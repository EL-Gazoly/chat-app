import React from 'react'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Id } from '@/convex/_generated/dataModel';
import Link from 'next/link';
import { api } from '@/convex/_generated/api';
import { useQuery } from 'convex/react';
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
  const user = useQuery(api.users.getUserById, { id: friend.userId });
  const getMutualChat = useQuery(api.chat.getMutualChat, { friendId: friend.userId });
  return (
    <Link href={`/conversations/${getMutualChat}`} className=' flex items-center gap-x-3 px-2'>
    <Avatar className=' w-12 h-12 rounded-xl'>
        <AvatarImage className=' w-12 h-12 rounded-xl' src={user?.imageUrl} />
        <AvatarFallback className=' w-12 h-12 rounded-xl bg-red-100'>{user?.username[0]}</AvatarFallback>
    </Avatar>

    <span className=' text-black line-clamp-1 text-sm font-semibold uppercase'>{user?.username}</span>
</Link>
  )
}