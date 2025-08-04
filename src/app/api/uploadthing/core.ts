import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { auth } from "@clerk/nextjs/server";

const f = createUploadthing();

export const ourFileRouter = {
  fileUploader: f({
    pdf: {
      maxFileCount: 1,
      minFileCount: 1,
      maxFileSize: "16MB",
    },
  })
    .middleware(async () => {
      const user = await auth().catch(() => null);

      if (!user) throw new UploadThingError("Unauthorized");

      return { userId: user.userId }; // Passed as `metadata`
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);
      console.log("File URL 1:", file.url); // NOT `ufsUrl`
      console.log("File URL 1:", file.ufsUrl);
      return { uploadedBy: metadata.userId, fileUrl: file.ufsUrl };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
