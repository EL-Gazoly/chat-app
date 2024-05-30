"use client";
import UserCard from './UserCard';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useUser } from '@clerk/clerk-react';
import { Id } from '@/convex/_generated/dataModel';

const ChatsView = ({width} : {width : number}) => {
    const chats = useQuery(api.chat.getChats, {});
    console.log(chats);

  return (
    <div>
    {
        chats?.map((chat) => {
            return <UserCard key={chat.chatId} width={width} userId={chat.userId} />
        })
    }
      
    </div>
  );
};

export default ChatsView;
