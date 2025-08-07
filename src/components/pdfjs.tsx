import * as PDFJS from "pdfjs-dist";
import type {
  PDFDocumentProxy,
  RenderParameters,
} from "pdfjs-dist/types/src/display/api";
import { useCallback, useRef, useState, useEffect } from "react";

// Set this once outside the component
PDFJS.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

interface PdfProps {
  src: string;
}

export default function PdfJs({ src }: PdfProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const renderTaskRef = useRef<PDFJS.RenderTask | null>(null);

  const [pdfDoc, setPdfDoc] = useState<PDFDocumentProxy>();
  const [currentPage, setCurrentPage] = useState(1);

  const renderPage = useCallback(
    async (pageNum: number) => {
      if (!pdfDoc || !canvasRef.current) return;

      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      if (!context) return;

      try {
        const page = await pdfDoc.getPage(pageNum);
        const viewport = page.getViewport({ scale: 1.5 });

        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderContext: RenderParameters = {
          canvasContext: context,
          viewport,
          canvas,
        };

        // Cancel previous render if running
        if (renderTaskRef.current) {
          renderTaskRef.current.cancel();
        }

        const task = page.render(renderContext);
        renderTaskRef.current = task;

        await task.promise;
      } catch (err) {
        console.error("Render error:", err);
      }
    },
    [pdfDoc]
  );

  useEffect(() => {
    if (pdfDoc) renderPage(currentPage);
  }, [pdfDoc, currentPage, renderPage]);

  useEffect(() => {
    const loadingTask = PDFJS.getDocument(src);
    loadingTask.promise.then(
      (loadedDoc) => setPdfDoc(loadedDoc),
      (err) => console.error("PDF load error:", err)
    );
  }, [src]);

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
    <div>
      <button onClick={prevPage} disabled={currentPage <= 1}>
        Previous
      </button>
      <button
        onClick={nextPage}
        disabled={currentPage >= (pdfDoc?.numPages ?? 0)}
      >
        Next
      </button>
      <canvas ref={canvasRef} />
    </div>
  );
}
