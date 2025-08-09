import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { nanoid } from "nanoid";

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

export const uploadFileData = mutation({
  args: {
    userId: v.string(),
    fileName: v.string(), // real visible name
    realFileUrl: v.string(),
    dummyFileUrl: v.string(),
    uploadedAt: v.number(), // Date.now()
    lastViewedAt: v.optional(v.number()),
    totalTimeViewed: v.optional(v.number()), // in s
  },
  handler: async (ctx, args) => {
    // Get The User
    const user = await ctx.db
      .query("userData")
      .filter((user) => {
        return user.eq(user.field("id"), args.userId);
      })
      .first();

    if (user === null) {
      throw new ConvexError("Unauthorized");
    }

    // Collect all the existing Url Array , as Push is not supported directly on a doc on covrx or everywheer idk

    const existingFileData = user.filesData ?? [];

    const alreadyExists = existingFileData.some(
      (file) => file.realFileUrl === args.realFileUrl
    );
    if (alreadyExists) {
      throw new ConvexError("This file already exists.");
    }
    const updatedFileData = [
      ...existingFileData,
      {
        id: nanoid(),
        fileName: args.fileName,
        realFileUrl: args.realFileUrl,
        dummyFileUrl: args.dummyFileUrl,
        uploadedAt: args.uploadedAt,
        lastViewedAt: args.lastViewedAt,
        totalTimeViewed: args.totalTimeViewed,
      },
    ];

    // Update the document

    const updatedFileDataSorted = updatedFileData.sort(
      (a, b) => b.uploadedAt - a.uploadedAt
    );

    await ctx.db.patch(user._id, {
      filesData: updatedFileDataSorted,
    });

    return "Successfully Uploaded File Data";
  },
});

export const updateFileTimeInfo = mutation({
  args: {
    userId: v.string(),
    fileId: v.string(),
    lastViewedAt: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("userData")
      .filter((user) => {
        return user.eq(user.field("id"), args.userId);
      })
      .first();
    if (user === null) {
      throw new ConvexError("Unauthorized");
    }
    if (!user.filesData) {
      throw new ConvexError("No file data exists for this user.");
    }

    const existingFileData = user.filesData;

    const updatedFileData = existingFileData?.map((fileObj) => {
      if (fileObj.id === args.fileId) {
        const newObj = {
          ...fileObj,
          lastViewedAt: args.lastViewedAt ?? fileObj.lastViewedAt,
        };

        return newObj;
      }
      return fileObj;
    });

    await ctx.db.patch(user._id, {
      filesData: updatedFileData,
    });
    return "Successfully Updated File Data";
  },
});

export const getFiles = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("userData")
      .filter((user) => {
        return user.eq(user.field("id"), args.userId);
      })
      .first();

    if (user === null) {
      throw new ConvexError("Unauthorized");
    }
    if (!user.filesData) {
      return [];
    }
    return user.filesData;
  },
});

export const deleteFile = mutation({
  args: { userId: v.string(), fileId: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("userData")
      .filter((user) => {
        return user.eq(user.field("id"), args.userId);
      })
      .first();

    if (user === null) {
      throw new ConvexError("Unauthorized");
    }
    const existingFileData = user.filesData;
    const newFilesData = existingFileData?.filter(
      (file) => file.id !== args.fileId
    );

    await ctx.db.patch(user._id, {
      filesData: newFilesData,
    });
    return "Successfully Deleted File";
  },
});
