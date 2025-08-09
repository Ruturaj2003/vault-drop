"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

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
  const timerStarted = useRef(false);

  // Load file data
  useEffect(() => {
    const file = useFileDataStore.getState().getCurrentFile();
    setFileData(file);
    setIsLoading(false);
  }, []);

  // Unified activity handler
  const handleActivity = () => {
    if (!activityDetected.current && !unlocked) {
      activityDetected.current = true;
      console.log("[Activity] User interaction detected — keeping locked file");
      toast.info("User activity detected — dummy file stays visible");
      if (unlockTimer.current) clearTimeout(unlockTimer.current);
    }
  };

  // Monitor after delay
  useEffect(() => {
    if (!fileData) return;

    delayTimer.current = setTimeout(() => {
      console.log("[Monitor] Activity monitoring started");
      toast.info("Monitoring for user activity...");

      timerStarted.current = true;

      const events = [
        "mousemove",
        "scroll",
        "mousedown",
        "mouseup",
        "keydown",
        "touchstart",
        "wheel",
      ];

      events.forEach((event) =>
        window.addEventListener(event, handleActivity, { passive: true })
      );
      // #DemoDragon1
      // Unlock after inactivity
      unlockTimer.current = setTimeout(() => {
        if (!activityDetected.current) {
          console.log("[Unlock] No activity detected — showing real file");
          toast.success("Unlocked — no activity detected");
          setUnlocked(true);
        }
        events.forEach((event) =>
          window.removeEventListener(event, handleActivity)
        );
      }, 15 * 1000); // u choos the Time
    }, 5000); // 5-second delay before starting monitoring

    return () => {
      if (delayTimer.current) clearTimeout(delayTimer.current);
      if (unlockTimer.current) clearTimeout(unlockTimer.current);
      const events = [
        "mousemove",
        "scroll",
        "mousedown",
        "mouseup",
        "keydown",
        "touchstart",
        "wheel",
      ];
      events.forEach((event) =>
        window.removeEventListener(event, handleActivity)
      );
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fileData]);

  // Iframe-specific activity
  const handleActivityIframe = () => {
    if (!unlocked && timerStarted.current) {
      handleActivity();
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (!fileData) return <p>No file selected.</p>;

  return (
    <div className="h-screen w-screen bg-zinc-100 text-zinc-800 flex flex-col">
      {/* Top Toolbar */}
      <div className="flex items-center justify-between px-6 py-3 bg-white border-b shadow-sm z-10">
        <div className="text-sm font-medium text-zinc-700 truncate">
          Viewing: {fileData.fileName} &nbsp; | x:{x} y:{y}
        </div>
        <Button variant="outline" onClick={() => window.history.back()}>
          Back
        </Button>
      </div>

      {/* PDF Viewer Section */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full w-full bg-neutral-200 px-4 py-6">
          <div className="mx-auto max-w-5xl bg-white rounded-lg shadow overflow-hidden h-full">
            <iframe
              src={unlocked ? fileData.realFileUrl : fileData.dummyFileUrl}
              onWheel={handleActivityIframe}
              onMouseDown={handleActivityIframe}
              onMouseUp={handleActivityIframe}
              onScroll={handleActivityIframe}
              onMouseMove={handleActivityIframe}
              onLoad={() => console.log("[Iframe] PDF loaded")}
              className="w-full h-full border-0"
              title="PDF Viewer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewFilePage;
