export type PdfConvertRequest = {
  html: string;
  filename: string;
};

export type PdfConvertResponse = {
  message: String;
  data: unknown
};