declare module 'pdfjs-dist/legacy/build/pdf' {
  import * as pdfjs from 'pdfjs-dist';
  export = pdfjs;
}

declare module 'pdfjs-dist/build/pdf.worker?url' {
  const workerUrl: string;
  export default workerUrl;
}
