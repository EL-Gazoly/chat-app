"use client";
import UserCard from './UserCard';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useUser } from '@clerk/clerk-react';
import { Id } from '@/convex/_generated/dataModel';
import { UseSelector, useDispatch } from 'react-redux';
import { RootState , AppDispatch } from '@/store/store';
import ChatInfo from "@/app/(chat)/_components/ChatInfo";
import { chat } from '@/types/chat.types';

const EnhancedUserCard = ChatInfo(UserCard);

const ChatsView = ({width} : {width : number}) => {
    const chats = useQuery(api.chat.getChats, {}) as chat[] | [];

  return (
    <div>
        {chats?.map((chat) => (
          <div key={chat?._id}>
            <EnhancedUserCard chatId={chat?.chatId || ""} width={width} chat={chat} />
          </div>
        ))}
    </div>
 
  );
};

export default ChatsView;
