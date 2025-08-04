import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  userData: defineTable({
    id: v.string(),
    passPhrase: v.optional(v.string()),
    filesData: v.optional(
      v.array(
        v.object({
          id: v.string(), // or use v.string() if not referencing a document
          fileName: v.string(), // real visible name
          realFileUrl: v.string(),
          dummyFileUrl: v.string(),
          uploadedAt: v.number(), // Date.now()
          lastViewedAt: v.optional(v.number()),
          totalTimeViewed: v.optional(v.number()), // in seconds
        })
      )
    ),
  }),
});
