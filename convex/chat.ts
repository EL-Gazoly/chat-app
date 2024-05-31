import { mutation, query } from "./_generated/server"
import { v } from "convex/values"
import { Id } from "./_generated/dataModel"
import { ExpressionOrValue } from "convex/server"
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
    handler: async(ctx, args) => {
        const identity = await ctx.auth.getUserIdentity()
        if (!identity) {
            throw new Error("Unauthenticated")
        }
        const userId = identity.subject as Id<"users">
        return ctx.db
        .query("chatMembers")
        .withIndex("by_userId", (q) => q.eq("userId", userId))
        .collect()
    }

})

export const getChatMembers = query({
    args : { chatId : v.string() },
    handler: async(ctx, args) => {
        const identity = await ctx.auth.getUserIdentity()
        if (!identity) {
            throw new Error("Unauthenticated")
        }
        const userId = identity.subject
        console.log("userId", userId)
        const members = ctx.db
        .query("chatMembers")
        .withIndex("by_chatId", (q) => q.eq("chatId", args.chatId))
        .filter((q) => q.neq("userId", userId))
        .collect()
        return members
    }
})

export const getMutualChat = query({
    args: { friendId: v.string() },
    handler: async (ctx, args) => {
        // Authenticate the user
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new Error("Unauthenticated");
        }
        
        const userId = identity.subject;
        const friendId = args.friendId;
        
        // Fetch chat memberships for both user and friend
        const userChats = await ctx.db
            .query("chatMembers")
            .withIndex("by_userId", q => q.eq("userId", userId))
            .collect();

        const friendChats = await ctx.db
            .query("chatMembers")
            .withIndex("by_userId", q => q.eq("userId", friendId))
            .collect();

        // Extract chat IDs
        const userChatIds = userChats.map(chat => chat.chatId);
        const friendChatIds = friendChats.map(chat => chat.chatId);

        // Find mutual chat IDs
        const mutualChatId = userChatIds.find(chatId => friendChatIds.includes(chatId));

        // Return the mutual chat ID or a message if not found
        if (mutualChatId) {
            return mutualChatId;
        } else {
            return "No mutual chat found";
        }
    }
});
