import { mutation, query } from "./_generated/server"
import { v } from "convex/values"
export const createChat = mutation({
    args : {
        chatId: v.id("chat"),
        type: v.string(),
        name: v.optional(v.string())
    },
    handler: async(ctx, args) => {
        await ctx.db.insert("chat", args)
    }
    
})
export const createChatMember = mutation({
    args : {
        chatId: v.id("chat"),
        userId: v.id("users"),
        JoinedAt: v.number()
    },
    handler: async(ctx, args) => {
        await ctx.db.insert("chatMembers", args)
    }
    
})

export const getChat = query({
    args : { chatId : v.string() },
    handler: async(ctx, args) => {
        return ctx.db
        .query("chat")
        .withIndex("by_chatId", (q) => q.eq("chatId", args.chatId))
        .unique()
    }
})

export const getChats = query({
    args : { userId : v.id("users") },
    handler: async(ctx, args) => {
        return ctx.db
        .query("chatMembers")
        .withIndex("by_userId", (q) => q.eq("userId", args.userId))
        .collect()
    }

})

export const getChatMembers = query({
    args : { chatId : v.id("chat") },
    handler: async(ctx, args) => {
        return ctx.db
        .query("chatMembers")
        .withIndex("by_chatId", (q) => q.eq("chatId", args.chatId))
        
    }
})
