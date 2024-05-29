import RecievertHeader from "./_components/RecieverHeader";
import ChatPage from "./_components/Chat";
import SendMessage from "./_components/sendMessage";
const ConversationPage = () => {
    return ( 
        <div className=" flex-1 z-10 h-full border-r border-border
            flex flex-col pb-6 justify-between items-center
        ">
            <div className=" w-full flex flex-col gap-y-6">
                <RecievertHeader />
                <ChatPage />
            </div>
            <SendMessage />
        </div>
           
     );
}
 
export default ConversationPage;