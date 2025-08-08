"use client";

import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
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
  const [unlocked, setUnlocked] = useState(false);
  const initialX = useRef(0);
  const initialY = useRef(0);

  useEffect(() => {
    const file = useFileDataStore.getState().getCurrentFile();
    setFileData(file);
    setIsLoading(false);
  }, []);

  const [startCountdown, setStartCountdown] = useState(false);
  const [isFirstLoop, setIsFirstLoop] = useState(true);
  const [userFailed, setUserFailed] = useState(false);
  useEffect(() => {
    // Wait Before Starting Counter
    if (isFirstLoop) {
      setTimeout(() => {
        toast.info("Timer Start");
        setStartCountdown(true);
      }, 3000);
    }
  }, [isFirstLoop]);

  useEffect(() => {
    if (isFirstLoop) {
      if (startCountdown) {
        initialX.current = x;
        initialY.current = y;

        const movementChecker = setInterval(() => {
          const moved =
            Math.abs(x - initialX.current) > 2 ||
            Math.abs(y - initialY.current) > 2;

          if (moved) {
            toast.error("GG Access Locked ");
            setIsFirstLoop(false);
            clearInterval(movementChecker);
            clearTimeout(idleCheck);
            setUserFailed(true);
          }
        }, 500);

        // Idle Check :
        const idleCheck = setTimeout(() => {
          if (!userFailed) {
            setUnlocked(true);
            toast.success("GG  Access Granted");
            setIsFirstLoop(false);
          }
        }, 9000);
      }

      // Movement Check
    }
  }, [isFirstLoop, startCountdown, x, y, userFailed]);

  // useEffect(() => {
  //   const delayBeforeValidation = setTimeout(() => {
  //     toast.info("It's been 3 seconds. Starting idle validation...");
  //     if (isFirstLoop) {
  //       initialX.current = x;
  //       initialY.current = y;
  //       setIsFirstLoop(false);
  //     }

  //     timerStarted.current = true;

  //     const idleTimeout = setTimeout(() => {
  //       if (!failed) {
  //         setUnlocked(true);
  //         toast.success("Access unlocked after 20s of no movement.");
  //       }
  //     }, 20000);

  //     const movementChecker = setInterval(() => {
  //       const moved =
  //         Math.abs(x - initialX.current) > 2 ||
  //         Math.abs(y - initialY.current) > 2;
  //       if (moved) {
  //         setFailed(true);
  //         clearInterval(movementChecker);
  //         clearTimeout(idleTimeout);
  //         toast.error("Mouse moved. Access blocked.");
  //       }
  //     }, 1000);

  //     return () => {
  //       clearInterval(movementChecker);
  //       clearTimeout(idleTimeout);
  //     };
  //   }, 3000);

  //   return () => clearTimeout(delayBeforeValidation);
  // }, [x, y, failed, isFirstLoop]);

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
