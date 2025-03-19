export type PdfConvertRequest = {
  html: string;
  filename: string;
};

export type PdfConvertResponse = {
  message: string;
  data: unknown
};