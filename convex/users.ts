import {
    internalMutation,
    internalQuery, } from "./_generated/server";

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

  
  




export const getUser = internalQuery({
    args: { subject: v.string() },
    async handler(ctx, args) {
      return ctx.db
        .query('users')
        .withIndex('by_clrekId', (q) => q.eq('clrekId', args.subject))
        .unique()
    },
  })