import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createUser = mutation({
  args: { userId: v.string(), passPhrase: v.string() },
  handler: async (ctx, args) => {
    await ctx.db.insert("userData", {
      id: args.userId,
      passPhrase: args.passPhrase,
    });
  },
});

export const getUserData = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("userData")
      .filter((user) => {
        return user.eq(user.field("id"), args.userId);
      })
      .first();

    return user;
  },
});
