"use client";
import UserCard from './UserCard';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import ChatInfo from "@/app/(chat)/_components/ChatInfo";
import { chat } from '@/types/chat.types';

const EnhancedUserCard = ChatInfo(UserCard);

const ChatsView = ({ width }: { width: number }) => {
    const chats = useQuery(api.chat.getChats, {}) as chat[] | [];

    return (
        <div>
            {chats?.length > 0 ?
                chats?.map((chat) => (
                    <div key={chat?._id}>
                        <EnhancedUserCard chatId={chat?.chatId || ""} width={width} chat={chat} />
                    </div>
                ))
                :
                <div className="flex flex-col items-center justify-center w-full h-full mt-4">
                    <span className="text-lg font-semibold text-muted-foreground line-clamp-1">No chats available</span>
                    <span className="text-sm font-medium text-muted-foreground line-clamp-1">
                        Add a friend to get started
                    </span>
                </div>
            }
        </div>
    );
};

export default ChatsView;
