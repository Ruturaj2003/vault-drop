"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useAuth } from "@clerk/nextjs";
import { FileCard } from "@/components/file-card";
import { useEffect, useState } from "react";
import { LoadingSpinner } from "@/components/loading-spinner";
import useFileDataStore from "@/store/fileDataStore";

const FilesPage = () => {
  const { userId } = useAuth();
  const fileData = useQuery(api.userData.getFiles, {
    userId: userId!,
  });

  const setFileData = useFileDataStore((state) => state.setFileData);

  useEffect(() => {
    if (fileData && fileData.length > 0) {
      setFileData(fileData);
    }
  }, [fileData, setFileData]);
  if (fileData === undefined) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">
      <div className="max-w-5xl mx-auto">
        {fileData?.length === 0 ? (
          <div className="text-center text-gray-600 text-lg">
            No files uploaded yet.
          </div>
        ) : (
          <>
            <h1 className="text-2xl font-semibold mb-6 text-gray-800">
              Your Files
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {fileData?.map((file) => (
                <FileCard fileData={file} key={file.id}></FileCard>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FilesPage;
