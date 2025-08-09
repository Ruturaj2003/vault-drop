"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

const PdfJs = dynamic(() => import("@/components/pdfjs"), { ssr: false });

import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/loading-spinner";
import useFileDataStore from "@/store/fileDataStore";
import useMousePosition from "@/utils/useMousePosition";
import { toast } from "sonner";

interface FileData {
  id: string;
  fileName: string;
  realFileUrl: string;
  dummyFileUrl: string;
  uploadedAt: number;
  lastViewedAt?: number;
  totalTimeViewed?: number;
}

const ViewFilePage = () => {
  const { x, y } = useMousePosition();
  const [fileData, setFileData] = useState<FileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [unlocked, setUnlocked] = useState(false);

  // Refs
  const activityDetected = useRef(false);
  const delayTimer = useRef<NodeJS.Timeout | null>(null);
  const unlockTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const file = useFileDataStore.getState().getCurrentFile();
    setFileData(file);
    setIsLoading(false);
  }, []);

  // Main logic by gpt - Quite a Lot better than my thought and very simple also and does not need exxtra stuff that i put eie check mouse position
  useEffect(() => {
    if (!fileData) return;

    // Wait 5 secs or X amt of time
    delayTimer.current = setTimeout(() => {
      console.log(" [Aplha] : Mointioring Started... ");
      toast.info("[Aplha] : Mointioring Started... ");
      // For the line below i tried atleast 5 hrs using states and fancy techniques , multiple intervals and what not
      window.addEventListener("mousemove", handleActivity);

      // Start  3 min Unlock Timer
      unlockTimer.current = setTimeout(() => {
        if (!activityDetected.current) {
          console.log("[Charlie] : Unlocked - No Activity Detected");
          window.removeEventListener("mousemove", handleActivity);
          setUnlocked(true);
        }
        toast.info("[Charlie] : Unlocked - No Activity Detected");
      }, 15 * 1000);
    }, 5000);

    // Clean up
    return () => {
      if (delayTimer.current) clearTimeout(delayTimer.current);
      if (unlockTimer.current) clearTimeout(unlockTimer.current);
      window.removeEventListener("mousemove", handleActivity);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fileData]);

  // Actitvy Handler
  const handleActivity = () => {
    if (!activityDetected.current && !unlocked) {
      console.log("[Delta] : Actibity Detected , Lock Stays");
      toast.info("[Delta] : Actibity Detected , Lock Stays");
      activityDetected.current = true;
      if (unlockTimer.current) clearTimeout(unlockTimer.current);
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (!fileData) return <p>No file selected.</p>;

  return (
    <div className="h-screen w-screen bg-zinc-100 text-zinc-800 flex flex-col">
      {/* Top Toolbar */}
      <div className="flex items-center justify-between px-6 py-3 bg-white border-b shadow-sm z-10">
        <div className="text-sm font-medium text-zinc-700">
          Viewing: {fileData.fileName} &nbsp; x:{x} y:{y}
        </div>
        <Button variant="outline" onClick={() => window.history.back()}>
          Back
        </Button>
      </div>

      {/* PDF Viewer Section */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full w-full overflow-auto bg-neutral-200 px-4 py-6">
          <div className="mx-auto max-w-4xl bg-white rounded shadow">
            <PdfJs
              src={unlocked ? fileData.realFileUrl : fileData.dummyFileUrl}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewFilePage;
