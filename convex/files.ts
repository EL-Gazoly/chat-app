import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { v4 as uuid } from "uuid";

export const createFile = mutation({
    args: {
        chatId : v.string(),
        type: v.string(),
        url: v.string(),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        const createdAt = Date.now();
        if (!identity) {
            throw new Error("Unauthenticated");
        }
        const userId = identity.subject;
        await ctx.db.insert("files", {
            fileId: uuid(),
            chatId: args.chatId,
            senderId: userId,
            type: args.type,
            url: args.url,
            createdAt: createdAt
        });
    },
});

export const getFiles = query({
    args: { chatId: v.string() },
    handler: async (ctx, args) => {
        return ctx.db
            .query("files")
            .withIndex("by_chatId", (q) => q.eq("chatId", args.chatId))
            .collect();
    },
});