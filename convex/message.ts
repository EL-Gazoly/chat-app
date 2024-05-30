import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { v4 as uuidv4 } from 'uuid';
import { Id } from "./_generated/dataModel";

export const sendMessage = mutation({
   args: {
    chatId : v.string(),
    content: v.string(),
   },
    handler: async (ctx, args) => {
        const created_at = new Date();
        const id = uuidv4();
        const identity =  await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new Error("Unauthenticated");
        }
        console.log(args.content);
        const senderId = identity.subject as Id<"users">;
        const message = await ctx.db.insert("messages", { messageId: id, chatId: args.chatId, senderId: senderId, content: args.content, createdAt: created_at.getTime() })
        const members = await ctx.db.query("chatMembers").withIndex("by_chatId", (q) => q.eq("chatId", args.chatId)).collect();
        members.forEach(async (member) => {
            if(member.userId === senderId) return;
            await ctx.db.insert("messageStatus", { messageId: id, userId: member.userId as Id<"users">, status: "sent", updatedAt: created_at.getTime() })
        });
        return message;
    }
  });

export const getMessages = query({
    args: { chatId: v.string() },
    handler: async (ctx, args) => {
        return ctx.db
            .query("messages")
            .withIndex("by_chatId", (q) => q.eq("chatId", args.chatId))
            .collect();
    }
});

export const getMessageStatus = query({
    args: { messageId: v.id("messages") },
    handler: async (ctx, args) => {
        return ctx.db
            .query("messageStatus")
            .withIndex("by_messageId", (q) => q.eq("messageId", args.messageId))
            .unique();
    }
});

export const updateMessageStatus = mutation({
    args: { messageId: v.id("messageStatus"), status: v.string(), updatedAt: v.number() },
    handler: async (ctx, args) => {
        ctx.db.patch(args.messageId , { status: args.status, updatedAt: args.updatedAt })
    }
});