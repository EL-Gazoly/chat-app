import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"

import { api } from "@/convex/_generated/api"
import { useQuery } from "convex/react"
import Card from "./Card"
import { CircleEllipsis } from "lucide-react"
import { useParams } from "next/navigation"

export const FilesMenu = () => {
    const { conversationId } = useParams() as { conversationId: string }
    const files = useQuery(api.files.getFiles, { chatId: conversationId })

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
             <CircleEllipsis className=" w-5 h-5 text-text-primary" />
            </DropdownMenuTrigger>
            <DropdownMenuContent >
                {files?.map((file) => (
                    <DropdownMenuItem key={file._id}>
                        <Card file={file} />
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}