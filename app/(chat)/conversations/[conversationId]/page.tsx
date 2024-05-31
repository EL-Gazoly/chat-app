"use client";
import RecievertHeader from "./_components/RecieverHeader";
import ChatPage from "./_components/Chat";
import SendMessage from "./_components/sendMessage";
import { useParams } from "next/navigation";
import { chat, reciever } from "@/types/chat.types";
import ChatInfo from "@/app/(chat)/_components/ChatInfo";
import { useRef, useEffect, useState } from "react";

type UserCardProps = {
  width?: number;
  chatId: string;
  reciever: reciever;
};

const ConversationPage = () => {
  const { conversationId } = useParams() as { conversationId: string };

  return (
    <div className=" flex-1 w-full h-full z-10">
      <EnhancedConversationPageElement chatId={conversationId} />
    </div>
  );
};

const ConversationPageElement = ({ reciever }: UserCardProps) => {
  const { conversationId } = useParams() as { conversationId: string };
  const messageRef = useRef<HTMLDivElement>(null);
  const [messages, setMessage] = useState<any>([]);

  const scrollToBottom = () => {
    messageRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    messageRef.current?.scrollIntoView();
  }, [messages]);

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <div className="border-r border-border flex flex-col h-full">
        <div className="flex-shrink-0">
          <RecievertHeader Reciever={reciever} />
        </div>
        <div className="flex-grow overflow-y-auto overflow-x-hidden scroll-smooth">
          <ChatPage chatId={conversationId} messageRef={messageRef} />
        </div>
        <div className="flex-shrink-0">
          <SendMessage
            chatId={conversationId}
            scrollToBottom={scrollToBottom}
            setMessage={setMessage}
          />
        </div>
      </div>
    </div>
  );
};

const EnhancedConversationPageElement = ChatInfo(ConversationPageElement);

export default ConversationPage;
