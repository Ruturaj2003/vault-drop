"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useAuth } from "@clerk/nextjs";

const FilesPage = () => {
  const clerkUser = useAuth();
  const fileData = useQuery(api.userData.getFiles, {
    userId: clerkUser.userId!,
  });

  return (
    <>
      {fileData?.length === 0 ? (
        <>
          <h1>No files Uploaded</h1>
        </>
      ) : (
        <>
          THere are your files
          {fileData?.map((file) => {
            return <h2 key={file.id}>{file.fileName}</h2>;
          })}
        </>
      )}
    </>
  );
};

export default FilesPage;
