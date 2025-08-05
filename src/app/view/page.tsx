"use client";
import { LoadingSpinner } from "@/components/loading-spinner";
import useFileDataStore from "@/store/fileDataStore";
import { useEffect, useState } from "react";

const ViewFilePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const getCurrentFile = useFileDataStore((state) => state.getCurrentFile);

  const [fileData, setFileData] = useState(() => getCurrentFile());

  useEffect(() => {
    const file = getCurrentFile();
    setFileData(file);
    setIsLoading(false);
  }, [getCurrentFile]);

  if (isLoading) return <LoadingSpinner />;
  if (!fileData) return <p>No file selected.</p>;

  return <h1>This is your File: {fileData.fileName}</h1>;
};

export default ViewFilePage;
