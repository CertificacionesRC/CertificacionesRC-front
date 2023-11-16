
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { pdfjs } from 'react-pdf';

interface PDFViewerProps {
  pdfUrl: string;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ pdfUrl }) => {
  return (
    <div style={{ width: '100%', height: '500px' }}>
      <Worker workerUrl={`https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`}>
        <Viewer fileUrl={pdfUrl} />
      </Worker>
    </div>
  );
};

export default PDFViewer;
