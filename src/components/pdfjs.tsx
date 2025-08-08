import * as PDFJS from "pdfjs-dist";
import type {
  PDFDocumentProxy,
  RenderParameters,
} from "pdfjs-dist/types/src/display/api";
import { useCallback, useRef, useState, useEffect } from "react";
import { Button } from "./ui/button";
import { LoadingSpinner } from "@/components/loading-spinner";

PDFJS.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

interface PdfProps {
  src: string;
}

export default function PdfJs({ src }: PdfProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const renderTaskRef = useRef<PDFJS.RenderTask | null>(null);

  const [pdfDoc, setPdfDoc] = useState<PDFDocumentProxy>();
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true); // for both load + render

  const renderPage = useCallback(
    async (pageNum: number) => {
      if (!pdfDoc || !canvasRef.current) return;

      setLoading(true);

      // Cancel any ongoing render task
      if (renderTaskRef.current) {
        try {
          await renderTaskRef.current.cancel();
        } catch (e: unknown) {
          if (e instanceof Error) {
            console.warn("Render task cancel warning:", e.message);
          }
        }
        renderTaskRef.current = null;
      }

      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      if (!context) return;

      try {
        const page = await pdfDoc.getPage(pageNum);
        const viewport = page.getViewport({ scale: 1.5 });

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        const renderContext: RenderParameters = {
          canvasContext: context,
          viewport,
          canvas,
        };

        const task = page.render(renderContext);
        renderTaskRef.current = task;

        await task.promise;
      } catch (err: unknown) {
        if (
          err instanceof Error &&
          err.name !== "RenderingCancelledException"
        ) {
          console.error("Render error:", err.message);
        }
      } finally {
        setLoading(false);
      }
    },
    [pdfDoc]
  );

  useEffect(() => {
    setLoading(true);
    const loadingTask = PDFJS.getDocument({ url: src, disableStream: true });

    loadingTask.promise.then(
      (loadedDoc) => {
        setPdfDoc(loadedDoc);
        setLoading(false);
      },
      (err) => {
        console.error("PDF load error:", err);
        setLoading(false);
      }
    );
  }, [src]);

  useEffect(() => {
    if (pdfDoc) renderPage(currentPage);
  }, [pdfDoc, currentPage, renderPage]);

  const nextPage = () => {
    if (pdfDoc && currentPage < pdfDoc.numPages) {
      setCurrentPage((p) => p + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((p) => p - 1);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      {/* Toolbar */}
      <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-md border shadow-sm px-4 py-2 rounded flex items-center justify-between w-full max-w-4xl">
        <Button
          onClick={prevPage}
          disabled={currentPage <= 1}
          variant="secondary"
        >
          Previous
        </Button>

        <span className="text-sm font-medium text-zinc-700">
          Page {currentPage} of {pdfDoc?.numPages ?? "?"}
        </span>

        <Button
          onClick={nextPage}
          disabled={currentPage >= (pdfDoc?.numPages ?? 0)}
          variant="secondary"
        >
          Next
        </Button>
      </div>

      {/* PDF Viewer */}
      <div className="bg-white rounded shadow-md border overflow-auto max-w-4xl w-full min-h-[300px] flex items-center justify-center">
        {loading ? (
          <LoadingSpinner />
        ) : (
          <canvas
            ref={canvasRef}
            className="mx-auto block w-full h-auto max-w-full"
          />
        )}
      </div>
    </div>
  );
}
