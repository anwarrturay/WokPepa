import React, { useEffect, useRef, useState } from 'react';
import { BlobProvider } from '@react-pdf/renderer';
import MyDocument from './resumepdf/MyDocument';
import * as pdfjsLib from 'pdfjs-dist/build/pdf';
import 'pdfjs-dist/build/pdf.worker.min.mjs';
import { Save, Download } from 'lucide-react';

pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';

const Review = ({ handleSubmit, setStep }) => {
  const canvasRef = useRef(null);
  const renderTaskRef = useRef(null);
  const [pdfBlob, setPdfBlob] = useState(null);

  const renderPdfToCanvas = async (blob) => {
    if (!blob) return;

    const url = URL.createObjectURL(blob);

    try {
      if (renderTaskRef.current) {
        await renderTaskRef.current.cancel();
        renderTaskRef.current = null;
      }

      const pdf = await pdfjsLib.getDocument(url).promise;
      const page = await pdf.getPage(1);
      const viewport = page.getViewport({ scale: 1.0 });

      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      const renderContext = {
        canvasContext: canvas.getContext('2d'),
        viewport: viewport,
      };

      renderTaskRef.current = page.render(renderContext);
      await renderTaskRef.current.promise;
    } catch (error) {
      if (error.name !== 'RenderingCancelledException') {
        console.error('PDF render error:', error);
      }
    } finally {
      URL.revokeObjectURL(url);
    }
  };

  // Use effect to react to changes in pdfBlob and call render
  useEffect(() => {
    if (pdfBlob) {
      renderPdfToCanvas(pdfBlob);
    }
  }, [pdfBlob]);

  useEffect(() => {
    return () => {
      if (renderTaskRef.current) {
        renderTaskRef.current.cancel();
        renderTaskRef.current = null;
      }
    };
  }, []);

  return (
    <section className="flex flex-col px-4 py-8 w-full max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold text-center mb-2">Review & Submit</h1>
      <p className="text-sm text-gray-600 text-center mb-6">
        Please review your details before submitting.
      </p>

      <div className="w-full flex justify-between items-center mb-6">
        <button
          type="button"
          className="bg-gray-300 text-black py-2 px-4 rounded hover:bg-gray-400 transition cursor-pointer"
          onClick={() => setStep(10)}
        >
          Back
        </button>
        <button
          type="button"
          className="bg-[#2A5D9E] text-white py-2 px-4 rounded hover:bg-[#2a5c9e8c] cursor-pointer transition"
          onClick={handleSubmit}
        >
          Create Resume
        </button>
      </div>

      {/* PDF Preview */}
      <div className="hidden w-full flex-col items-center justify-center">
        <h2 className="text-xl font-medium mb-4">Resume Preview</h2>

        <div className="w-full max-w-[100%] sm:max-w-[500px] h-[500px] bg-white shadow-md border border-gray-200 overflow-auto">
          <BlobProvider document={<MyDocument />}>
            {({ blob, loading }) => {
              useEffect(() => {
                if (blob && blob !== pdfBlob) {
                  setPdfBlob(blob);
                }
              }, [blob]);
              return (
                <canvas
                  ref={canvasRef}
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
              );
            }}
          </BlobProvider>
        </div>
      {/* Buttons BELOW the document preview */}
      {pdfBlob && (
        <div className="flex justify-end gap-4 mt-6">
          <a
            href={URL.createObjectURL(pdfBlob)}
            download="resume.pdf"
            className="bg-[#2A5D9E] text-white font-medium py-2 px-4 rounded transition text-base flex items-center cursor-pointer"
          >
			<Download size={20} className='mr-2'/>
            Download
          </a>
          <button
            onClick={() => {
              console.log('Save logic triggered!');
              // Add actual save logic here
            }}
            className="bg-[#2A5D9E] text-white font-medium py-2 px-4 rounded transition text-base flex items-center cursor-pointer"
          >
			<Save size={20} className='mr-2'/>
            Save
          </button>
        </div>
      )}
      </div>
    </section>
  );
};

export default Review;
