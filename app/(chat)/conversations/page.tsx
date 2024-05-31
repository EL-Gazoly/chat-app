import MobileNavigation from "../_components/MobileNavigation";
const ConversationsPage = () => {
    return ( 
        <div className=" flex  w-full h-full p-6 ">
            <div className=" md:hidden">
                <MobileNavigation />
            </div>
            <div className="  flex-1  flex items-center justify-center text-muted-foreground">

                <div className=" flex flex-col items-center gap-y-4">
                    <div className=" text-3xl font-semibold">No Conversations</div>
                    <div className=" text-sm text-center">Start a conversation with your team members to get started</div>
                </div>
                
            </div>
        </div>
     );
}
 
export default ConversationsPage;