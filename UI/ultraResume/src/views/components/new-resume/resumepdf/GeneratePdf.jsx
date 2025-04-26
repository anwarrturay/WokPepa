// src/components/GeneratePDF.jsx
import React from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import MyDocument from './MyDocument';

function GeneratePdf() {
  return (
    <div className="font-montserrat flex flex-col items-center justify-center relative top-36">
      <MyDocument name={"Anwarr"} />
      <PDFDownloadLink
        document={<MyDocument name="Anwarr" />}
        fileName="profile.pdf"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        {({ blob, url, loading, error }) =>
          loading ? 'Generating PDF...' : 'Download PDF'
        }
      </PDFDownloadLink>
    </div>
  );
}

export default GeneratePdf;
