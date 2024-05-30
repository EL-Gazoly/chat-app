import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
export default defineSchema({
    users: defineTable({
        username: v.string(),
        imageUrl: v.string(),
        clrekId: v.string(),
        email: v.string(),
    })
    .index("by_email", ["email"])
    .index("by_clrekId", ["clrekId"])
    .index("by_username", ["username"])
    .searchIndex("search_username", {
        searchField: "username",
    }),

    friends : defineTable({
        friendRequest : v.string(),
        userId: v.string(),
        friendId: v.string(),
        status: v.string(),
    })
    .index("by_userId", ["userId"])
    .index("by_friendId", ["friendId"]),

    chat : defineTable({
        chatId : v.string(),
        type: v.string(),
        name: v.optional(v.string()),
    })
    .index("by_chatId", ["chatId"])
    .index("by_type", ["type"])
    .index("by_name", ["name"]),
    

    chatMembers : defineTable({
        chatId : v.string(),
        userId: v.string(),
        JoinedAt: v.number()
    })
    .index("by_chatId", ["chatId"])
    .index("by_userId", ["userId"]),

    messages : defineTable({
        messageId : v.string(),
        chatId : v.string(),
        senderId: v.string(),
        content: v.string(),
        createdAt: v.number()
    })
    .index("by_messageId", ["messageId"])
    .index("by_chatId", ["chatId"])
    .index("by_senderId", ["senderId"])
    .index("by_createdAt", ["createdAt"]),

    messageStatus: defineTable({
        messageId: v.string(),
        userId: v.string(),
        status: v.string(),
        updatedAt : v.number()
    })
    .index("by_messageId", ["messageId"])
    .index("by_userId", ["userId"]),

    files : defineTable({
        fileId : v.string(),
        chatId : v.string(),
        senderId: v.string(),
        type: v.string(),
        url: v.string(),
        createdAt: v.number()
    })
    .index("by_fileId", ["fileId"])
    .index("by_chatId", ["chatId"])
    .index("by_senderId", ["senderId"]),

})

