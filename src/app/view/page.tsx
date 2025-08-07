"use client";

import { LoadingSpinner } from "@/components/loading-spinner";
import PdfJs from "@/components/pdfjs";
import useFileDataStore from "@/store/fileDataStore";
import useMousePosition from "@/utils/useMousePosition";
import { useEffect, useState } from "react";

const ViewFilePage = () => {
  const { x, y } = useMousePosition();
  const getCurrentFile = useFileDataStore((state) => state.getCurrentFile);

  const [fileData, setFileData] = useState(() => getCurrentFile());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const file = getCurrentFile();
    setFileData(file);
    setIsLoading(false);
  }, [getCurrentFile]);

  if (isLoading) return <LoadingSpinner />;
  if (!fileData) return <p>No file selected.</p>;

  return (
    <div className="flex flex-col gap-y-4">
      <h1 className="text-md">This is your Mouse.</h1>
      <h1 className="text-md">
        X: {x} Y: {y}
        <div className="bg-amber-200 w-full h-[85vh]">
          <div className="mx-auto max-w-3xl w-full h-full">
            <PdfJs src={fileData.dummyFileUrl}></PdfJs>
          </div>
        </div>
      </h1>
    </div>
  );
};

export default ViewFilePage;
