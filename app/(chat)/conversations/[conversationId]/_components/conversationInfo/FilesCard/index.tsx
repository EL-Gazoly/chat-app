"use client";
import Card from "./Card";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { useParams } from "next/navigation";

const FileCard = () => {
    const { conversationId } = useParams() as { conversationId: string };
    const files = useQuery(api.files.getFiles, { chatId: conversationId });
    return ( 
        <div className="flex flex-col gap-y-5 px-4 overflow-y-auto">
            <div className="flex items-center gap-x-2 text-sm font-semibold">
                <span>Files</span>
                <div className="flex items-center justify-center rounded-full py-1 px-2 bg-[#EDF2F7]">
                    <span>{files?.length}</span>
                </div>
            </div>
            {files?.map((file) => (
                <div key={file._id}>
                    <Card file={file} />
                </div>
            ))}
        </div>
     );
}
 
export default FileCard;
