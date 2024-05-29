import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
export default defineSchema({
    users: defineTable({
        username: v.string(),
        imageUrl: v.string(),
        clrekId: v.string(),
        email: v.string()
    })
    .index("by_email", ["email"])
    .index("by_clrekId", ["clrekId"])
    .index("by_username", ["username"]),

    friends : defineTable({
        friendRequest : v.id("friends"),
        userId: v.id("users"),
        friendId: v.id("users"),
        status: v.string(),
    })
    .index("by_userId", ["userId"]),

    chat : defineTable({
        chatId : v.string(),
        type: v.string(),
        name: v.optional(v.string()),
    })
    .index("by_chatId", ["chatId"])
    .index("by_type", ["type"])
    .index("by_name", ["name"]),
    

    chatMembers : defineTable({
        chatId : v.id("chat"),
        userId: v.id("users"),
        JoinedAt: v.number()
    })
    .index("by_chatId", ["chatId"])
    .index("by_userId", ["userId"]),

    messages : defineTable({
        messageId : v.string(),
        chatId : v.id("chat"),
        senderId: v.id("users"),
        content: v.string(),
        createdAt: v.number()
    })
    .index("by_messageId", ["messageId"])
    .index("by_chatId", ["chatId"])
    .index("by_senderId", ["senderId"])
    .index("by_createdAt", ["createdAt"]),

    messageStatus: defineTable({
        messageId: v.string(),
        userId: v.id("users"),
        status: v.string(),
        updatedAt : v.number()
    })
    .index("by_messageId", ["messageId"])
    .index("by_userId", ["userId"])

})

