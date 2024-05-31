import FileCard from "./FilesCard";

const ConversationInfo = () => {
    return ( 
        <div className=" w-[362px] hidden xl:flex flex-col gap-y-6">
            <div className=" px-6 py-[34px] flex items-center justify-center border-b font-semibold border-border
                text-sm md:text-base lg:text-lg xl:text-xl
            ">
                    Directory
            </div>
            <FileCard />

        </div>
     );
}
 
export default ConversationInfo;