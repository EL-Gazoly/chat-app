import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { v4 as uuidv4 } from 'uuid';
import { Id } from "./_generated/dataModel";


export const addFriend = mutation({
    args : {
       userEmail: v.string(),
    },
    handler: async (ctx, args) => {
      const id = uuidv4();
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new Error("Unauthenticated");
        }
      const userId = identity.subject as Id<"users">;
      const friend = await ctx.db
      .query("users")
        .withIndex("by_email", (q) => q.eq("email", args.userEmail))
        .unique();
        if (!friend) {
            throw new Error("User not found");
        }
        const friendId = friend.clrekId;
        if (userId === friendId) {
            throw new Error("You can't add yourself as a friend");
        }
      // check if friend request already exists
      const friendRequestExists = await ctx.db
        .query("friends")
        .withIndex("by_friendId", (q) => q.eq("friendId", friendId))
        .collect();

        friendRequestExists.forEach((element) => {
            if (element.userId === userId && element.status !== "rejected") {
                throw new Error("Friend request already exists");
            }
        });
       const userAlreadySentRequest = await ctx.db
        .query("friends")
        .withIndex("by_userId", (q) => q.eq("userId", friendId))
        .collect();
        userAlreadySentRequest.forEach((element) => {
          console.log("element", element)
            if (element.friendId === userId && element.status === "pending") {
                throw new Error("This user already sent you a friend request");
            }
        });

       
       
        const friendRequest = await ctx.db.insert('friends', {
          friendRequest: id,
          userId: userId,
          friendId: friendId,
          status: "pending",
        });
        return friendRequest;
    }
  });

  export const checkIfFriend = query({
    args : {
        friendId: v.string(),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new Error("Unauthenticated");
        }
        const userId = identity.subject as Id<"users">;
      return ctx.db
      .query("friends")
      .withIndex("by_friendId", (q) => q.eq("friendId", args.friendId))
      .filter((f : any) => f.userId === userId)
      .unique();
    }
  
  });

export const accpetFriendRequest = mutation({
    args : {
        friendRequest : v.string(),
        friendId: v.string(),
    },

    handler: async (ctx, args) => {
            const  chatId = uuidv4() as Id<"chat">;
            const identity = await ctx.auth.getUserIdentity();
            if (!identity) {
                    throw new Error("Unauthenticated");
            }
            const userId = identity.subject as Id<"users">;
            const friendRequest = args.friendRequest as Id<"friends">;
            const friendId = args.friendId as Id<"users">;
        await ctx.db.patch(friendRequest, { status: "accepted" });
        await ctx.db.insert('friends', { friendRequest: uuidv4(), userId: userId, friendId: friendId, status: "accepted" });
        await ctx.db.insert('chat', { chatId: chatId, type: "one-to-one" });
        await ctx.db.insert('chatMembers', { chatId: chatId, userId: userId, JoinedAt: Date.now() });
        await ctx.db.insert('chatMembers', { chatId: chatId, userId: friendId, JoinedAt: Date.now() });
    
    }
});

export const rejectFriendRequest = mutation({
    args : {
        friendRequest : v.string(),
     },
    handler: async (ctx, args) => {
      const friendRequest = args.friendRequest as Id<"friends">;
      await ctx.db.patch(friendRequest, { status: "rejected" });
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
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new Error("Unauthenticated");
        }
        const userId = identity.subject as Id<"users">;
      return ctx.db
      .query("friends")
      .withIndex("by_friendId", (q) => q.eq("friendId", userId))
      .collect();
    }
  });