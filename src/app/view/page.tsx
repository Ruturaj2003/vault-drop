"use client";
import { LoadingSpinner } from "@/components/loading-spinner";
import useFileDataStore from "@/store/fileDataStore";
import useMousePosition from "@/utils/useMousePosition";
import { useEffect, useState } from "react";

const ViewFilePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const getCurrentFile = useFileDataStore((state) => state.getCurrentFile);

  const [fileData, setFileData] = useState(() => getCurrentFile());
  const [pdfData, setPdfData] = useState<string | null>(null);

  const [dummyPdfData, setDummyPdfData] = useState<string | null>(null);

  const [realPdfData, setRealPdfData] = useState<string | null>(null);
  // API Call To get File
  const { x, y } = useMousePosition();
  useEffect(() => {
    const file = getCurrentFile();
    setFileData(file);
    fetch("/api/downloadFile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        dummyUrl: fileData?.dummyFileUrl,
        realUrl: fileData?.realFileUrl,
      }),
    })
      .then((res) => res.json())
      .then(({ dummyBuffer, realBuffer }) => {
        setDummyPdfData(dummyBuffer);
        setRealPdfData(realBuffer);
        setPdfData(dummyBuffer);
      });

    setIsLoading(false);
  }, [getCurrentFile, fileData]);

  if (isLoading) return <LoadingSpinner />;
  if (!fileData) return <p>No file selected.</p>;

  return (
    <div className="flex flex-col gap-y4">
      <h1 className="text-md ">This is your Mouse . </h1>
      <h1 className="text-md ">
        X:{x} y:{y}
      </h1>
    </div>
  );
};

export default ViewFilePage;
