import { Id } from "@/convex/_generated/dataModel"
declare type chat =  {
    _id: Id<"chat">;
    _creationTime: number;
    name?: string | undefined;
    type: string;
    chatId: string;
}  | undefined

declare type chatMembers =  {
    _id: Id<"chatMembers">;
    _creationTime: number;
    chatId: string;
    userId: string;
    JoinedAt: number;
}[] | undefined


type reciever ={
    _id: Id<"users">;
    _creationTime: number;
    username: string;
    imageUrl: string;
    clrekId: string;
    email: string;
} | null | undefined