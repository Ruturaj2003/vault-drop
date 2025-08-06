"use client";
import { LoadingSpinner } from "@/components/loading-spinner";
import useFileDataStore from "@/store/fileDataStore";
import { useEffect, useState } from "react";

const ViewFilePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const getCurrentFile = useFileDataStore((state) => state.getCurrentFile);
  const [fileData, setFileData] = useState(() => getCurrentFile());

  // API Call To get File

  useEffect(() => {
    const file = getCurrentFile();
    setFileData(file);

    setIsLoading(false);
  }, [getCurrentFile]);

  if (isLoading) return <LoadingSpinner />;
  if (!fileData) return <p>No file selected.</p>;

  return (
    <div className="w-full h-[90vh] flex items-center justify-center px-4 sm:px-8">
      <div className="w-full max-w-4xl h-full shadow-xl rounded-2xl overflow-hidden border border-gray-200">
        <iframe
          src={fileData.dummyFileUrl}
          title="PDF Viewer"
          className="w-full h-full"
          loading="lazy"
          allowFullScreen
        />
      </div>
    </div>
  );
};

export default ViewFilePage;
