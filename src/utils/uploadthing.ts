import type { OurFileRouter } from "@/app/api/uploadthing/core";
import {
  generateUploadButton,
  generateUploadDropzone,
} from "@uploadthing/react";

export const UploadFileButton = generateUploadButton<OurFileRouter>();
export const UploadFileDropzone = generateUploadDropzone<OurFileRouter>();
