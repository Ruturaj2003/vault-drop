"use client";

import { LoadingSpinner } from "@/components/loading-spinner";
import PdfJs from "@/components/pdfjs";
import useFileDataStore from "@/store/fileDataStore";
import useMousePosition from "@/utils/useMousePosition";
import { useEffect, useState } from "react";

// If the timer stuff is making issue , do big brain , make one more  elenebt and use && operator to set render when Key activated ie no movemnt

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
    <div className="h-screen w-screen bg-zinc-100 text-zinc-800 flex flex-col">
      {/* Top Toolbar */}
      <div className="flex items-center justify-between px-6 py-3 bg-white border-b shadow-sm z-10">
        <div className="text-sm font-medium text-zinc-700">
          Viewing: {fileData.fileName ?? "Document"}
          x:{x} y:{y}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => window.history.back()}
            className="px-3 py-1 text-sm rounded bg-zinc-200 hover:bg-zinc-300 transition"
          >
            Back
          </button>
        </div>
      </div>

      {/* PDF Viewer Section */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full w-full overflow-auto bg-neutral-200 px-4 py-6">
          <div className="mx-auto max-w-4xl bg-white rounded shadow">
            <PdfJs src={fileData.dummyFileUrl} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewFilePage;
