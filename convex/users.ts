import {
    internalMutation,
    internalQuery, query } from "./_generated/server";
import { Id } from "./_generated/dataModel";

    import { v } from "convex/values";
export const create = internalMutation({
    args: {
        username : v.string(),
        imageUrl: v.string(),
        clrekId : v.string(),
        email: v.string()
    },
    handler: async(ctx, args) => {
        await ctx.db.insert("users", args)
    }
})

  

export const currentUser = query({
    args: {},
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new Error("Called currentUser without authenticated user");
        }
        console.log(identity)
        return await ctx.db
        .query("users")
        .withIndex("by_clrekId", (q) => q.eq("clrekId", identity.subject))
        .unique()
    }
});


export const getUser = internalQuery({
    args: { subject: v.string() },
    async handler(ctx, args) {
      return ctx.db
        .query('users')
        .withIndex('by_clrekId', (q) => q.eq('clrekId', args.subject))
        .unique()
    },
  })

  export const getUserById = query({
    args: { id: v.string() },
    async handler(ctx, args) {
        console.log("args", args)
      return ctx.db
        .query('users')
        .withIndex('by_clrekId', (q) => q.eq('clrekId', args.id))
        .unique()
    },
  })

  export const getUsers = query({
    handler: async(ctx) => {
        const identity = await ctx.auth.getUserIdentity()
        if (!identity) {
            throw new Error("Unauthenticated")
        }
        
        return ctx.db
        .query("users")
        .filter((q) => q.neq("clrekId", identity.subject))
        .collect()
    }
  })

  export const seaerchUsers = query({
    args: { username: v.string() },
    handler: async(ctx, args) => {
        return ctx.db
        .query("users")
        .withSearchIndex("search_username", (q) =>
            q.search("username", args.username),
          )
        .take(10)
    }
  })