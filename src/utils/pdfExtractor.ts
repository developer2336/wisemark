import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf';

// Load worker (required for browser environment)
import pdfjsWorker from 'pdfjs-dist/legacy/build/pdf.worker.entry';
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

export const extractTextFromPDF = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = async (e) => {
      try {
        const typedArray = new Uint8Array(e.target?.result as ArrayBuffer);
        const pdf = await pdfjsLib.getDocument({ data: typedArray }).promise;

        let fullText = '';

        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
          const page = await pdf.getPage(pageNum);
          const content = await page.getTextContent();
          const pageText = content.items.map(item => ('str' in item ? item.str : '')).join(' ');
          fullText += pageText + '\n\n';
        }

        resolve(fullText.trim());
      } catch (err) {
        reject(new Error('Failed to extract PDF content'));
      }
    };

    reader.onerror = () => reject(new Error('Failed to read PDF file'));
    reader.readAsArrayBuffer(file);
  });
};

export const isValidPDF = (file: File): boolean => {
  return file.type === 'application/pdf' && file.size <= 10 * 1024 * 1024; // 10MB
};

export const extractTextFromMultiplePDFs = async (files: File[]): Promise<string[]> => {
  const results: string[] = [];

  for (const file of files) {
    if (isValidPDF(file)) {
      try {
        const text = await extractTextFromPDF(file);
        results.push(text);
      } catch (error) {
        results.push(`Error extracting from ${file.name}: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    } else {
      results.push(`Invalid PDF file: ${file.name}`);
    }
  }

  return results;
};
