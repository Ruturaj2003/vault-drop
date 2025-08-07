"use client";

import { LoadingSpinner } from "@/components/loading-spinner";
import PdfJs from "@/components/pdfjs";
import { Button } from "@/components/ui/button";
import useFileDataStore from "@/store/fileDataStore";
import useMousePosition from "@/utils/useMousePosition";
import { useEffect, useState } from "react";
import { toast } from "sonner";

// If the timer stuff is making issue , do big brain , make one more  elenebt and use && operator to set render when Key activated ie no movemnt

const ViewFilePage = () => {
  const { x, y } = useMousePosition();
  const getCurrentFile = useFileDataStore((state) => state.getCurrentFile);

  const [fileData, setFileData] = useState(() => getCurrentFile());
  const [isLoading, setIsLoading] = useState(true);
  const [unlocked, setUnlocked] = useState(false);

  // // Run Only once when  mounted
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     return toast.info("Its 3seconds now");
  //   });

  //   return () => clearTimeout(timer);
  // }, []);

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
          <Button variant={"outline"} onClick={() => window.history.back()}>
            Back
          </Button>
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
