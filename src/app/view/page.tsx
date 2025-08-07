"use client";

import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

// src/app/view/page.tsx
import dynamic from "next/dynamic";

const PdfJs = dynamic(() => import("@/components/pdfjs"), { ssr: false });

import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/loading-spinner";

import useFileDataStore from "@/store/fileDataStore";
import useMousePosition from "@/utils/useMousePosition";

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
  const [unlocked, isUnlocked] = useState(false);
  const [startCountdown, setStartCountdown] = useState(false);
  const [currentX, setCurrentX] = useState(0);
  const [currenty, setCurrentY] = useState(0);

  const useTimedLoop = (conditionFn: () => boolean) => {
    useEffect(() => {
      if (startCountdown) {
        const interValId = setInterval(() => {
          if (conditionFn()) {
            clearInterval(interValId);
            clearTimeout(timeoutId);

            return;
          }
        }, 1000);

        const timeoutId = setTimeout(() => {
          clearInterval(interValId);
          isUnlocked(true);
        }, 20000);
        return () => {
          clearInterval(interValId);
          clearTimeout(timeoutId);
        };
      }
    }, [conditionFn]);
  };

  const checkMovement = () => {
    if (currentX - x === 0 && currenty - y === 0) {
      return false;
    }
    return true;
  };

  useEffect(() => {
    const file = useFileDataStore.getState().getCurrentFile();
    setFileData(file);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      toast.info("It's been 3 seconds. 1");
      setTimeout(() => {
        setStartCountdown(true);
      }, 500); // small gap
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (startCountdown === true) {
      toast.success("Timer starts");
    }
  }, [startCountdown]);

  if (startCountdown) {
    const inittX = x;
    const initY = y;

    setCurrentX(inittX);
    setCurrentY(initY);
  }
  useTimedLoop(checkMovement);

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
            {unlocked ? (
              <PdfJs src={fileData.realFileUrl} />
            ) : (
              <PdfJs src={fileData.dummyFileUrl} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewFilePage;
