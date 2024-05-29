import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { v4 as uuidv4 } from 'uuid';

export const sendMessage = mutation({
   args: {
    messageId : v.string(),
    chatId : v.id("chat"),
    senderId: v.id("users"),
    content: v.string(),
    createdAt: v.number()
   },
    handler: async (ctx, args) => {
        const created_at = new Date();
        const id = uuidv4();
        const message = await ctx.db.insert("messages", { messageId: id, chatId: args.chatId, senderId: args.senderId, content: args.content, createdAt: created_at.getTime() })
        const members = await ctx.db.query("chatMembers").withIndex("by_chatId", (q) => q.eq("chatId", args.chatId)).collect();
        members.forEach(async (member) => {
            await ctx.db.insert("messageStatus", { messageId: id, userId: member.userId, status: "sent", updatedAt: created_at.getTime() })
        });
    }
  });

export const getMessages = query({
    args: { chatId: v.id("chat") },
    handler: async (ctx, args) => {
        return ctx.db
            .query("messages")
            .withIndex("by_chatId", (q) => q.eq("chatId", args.chatId))
            .collect();
    }
});

export const getMessageStatus = query({
    args: { messageId: v.id("messages"), userId: v.id("users") },
    handler: async (ctx, args) => {
        return ctx.db
            .query("messageStatus")
            .withIndex("by_messageId", (q) => q.eq("messageId", args.messageId))
            .unique();
    }
});

export const updateMessageStatus = mutation({
    args: { messageId: v.id("messageStatus"), userId: v.id("users"), status: v.string(), updatedAt: v.number() },
    handler: async (ctx, args) => {
        ctx.db.patch(args.messageId , { status: args.status, updatedAt: args.updatedAt })
    }
});