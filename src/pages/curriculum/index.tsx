import { useTranslations } from 'next-intl';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function Curriculum() {
  const t = useTranslations('Curriculum');
  const locale = useTranslations()('locale');

  const pdfFile = locale === 'pt' 
    ? '/lucas_da_fonseca_de_paula.pdf'
    : '/lucas_da_fonseca_de_paula-english_version.pdf';

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">{t('title')}</h1>
      <div className="flex justify-center">
        <div className="w-full max-w-4xl">
          <Document
            file={pdfFile}
            className="flex justify-center"
          >
            <Page 
              pageNumber={1} 
              renderTextLayer={false}
              renderAnnotationLayer={false}
              className="shadow-lg"
            />
          </Document>
        </div>
      </div>
    </div>
  );
} 