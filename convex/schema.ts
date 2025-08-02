import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  userData: defineTable({
    id: v.string(),
    passPhrase: v.optional(v.string()),
    fileUrls: v.optional(
      v.array(v.object({ realFileUrl: v.string(), dummyFileUrl: v.string() }))
    ),
  }),
});
