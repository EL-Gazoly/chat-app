import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { v4 as uuidv4 } from 'uuid';


export const addFriend = mutation({
    args : {
        friendRequest : v.id("friends"),
        userId: v.id("users"),
        friendId: v.id("users"),
        status: v.string(),
    },
    handler: async (ctx, args) => {
      const id = uuidv4() as any;
      await ctx.db.insert('friends', {
        friendRequest: id,
        userId: args.userId,
        friendId: args.friendId,
        status: args.status,
      }  );
    }
  });

export const accpetFriendRequest = mutation({
    args : {
        friendRequest : v.id("friends"),
        userId: v.id("users"),
        friendId: v.id("users"),
        status: v.string(),
    },

    handler: async (ctx, args) => {
        const  chatId = uuidv4() as any;
        
      await ctx.db.patch(args.friendRequest, { status: "accepted" });
      await ctx.db.insert('chat', { chatId: chatId, type: "one-to-one" });
      await ctx.db.insert('chatMembers', { chatId: chatId, userId: args.userId, JoinedAt: Date.now() });
      await ctx.db.insert('chatMembers', { chatId: chatId, userId: args.friendId, JoinedAt: Date.now() });
    
    }
});

export const rejectFriendRequest = mutation({
    args : {
        friendRequest : v.id("friends"),
        userId: v.id("users"),
        friendId: v.id("users"),
        status: v.string(),
    },
    handler: async (ctx, args) => {
      await ctx.db.patch(args.friendRequest, { status: "rejected" });
    }
  });

export const blockFriend = mutation({
    args : {
        friendRequest : v.id("friends"),
        userId: v.id("users"),
        friendId: v.id("users"),
        status: v.string(),
    },
    handler: async (ctx, args) => {
      await ctx.db.patch(args.friendRequest, { status: "blocked" });
    }
});



  export const getFriends = query({
    args : { userId : v.id("users") },
    handler: async (ctx, args) => {
      return ctx.db
      .query("friends")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .filter((q) => q.eq("status", "accepted"))
      .collect();
    }
  });