import { useEffect, useRef } from 'react';
import { pdf } from '@react-pdf/renderer';
import * as pdfjsLib from 'pdfjs-dist';
import MyDocument from './MyDocument';

// Optionally, if you encounter worker errors, set the worker source.
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/5.0.375/pdf.worker.min.mjs';


const PDFPreview = ({ formData }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    let isCanceled = false; 
    let renderTask = null; 

    const generateAndRenderPDF = async () => {
      try {
        const blob = await pdf(<MyDocument formData={formData} />).toBlob();
        if (isCanceled) return; 
        const url = URL.createObjectURL(blob);

        // Load the PDF via pdf.js
        const loadingTask = pdfjsLib.getDocument(url);
        const pdfDoc = await loadingTask.promise;
        if (isCanceled) return;

        // Get the first page of the document
        const page = await pdfDoc.getPage(1);
        if (isCanceled) return;

        // Adjust the scale for a good preview size
        const scale = 1.5;
        const viewport = page.getViewport({ scale });
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        // Set canvas dimensions based on the page
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        // Render the page into the canvas context
        const renderContext = { canvasContext: context, viewport };
        renderTask = page.render(renderContext);

        // When rendering is complete, revoke the blob URL
        await renderTask.promise;
        URL.revokeObjectURL(url);
      } catch (error) {
        if (!isCanceled) {
          console.error('Error during PDF rendering:', error);
        }
      }
    };

    generateAndRenderPDF();

    // Cleanup function ensures that if the component re-renders or unmounts,
    // the ongoing render task is cancelled to avoid conflicts.
    return () => {
      isCanceled = true;
      if (renderTask) {
        renderTask.cancel();
      }
    };
  }, [formData]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full border-none"
      style={{
        maxHeight: "100%",
        maxWidth: "100%",
        height: "auto",
        WebkitOverflowScrolling: "touch",
        overflow: "hidden"
      }}
    />
  );
};

export default PDFPreview;
