"use client";

import { FileImage, FilePdf, FileSpreadsheet, File } from "lucide-react";

export const attachmentTypes = {
  image: {
    icon: FileImage,
    label: 'Add Image',
    accept: '.jpg,.jpeg,.png,.gif,.webp',
    mimeTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
  },
  pdf: {
    icon: FilePdf,
    label: 'Add PDF',
    accept: '.pdf',
    mimeTypes: ['application/pdf']
  },
  spreadsheet: {
    icon: FileSpreadsheet,
    label: 'Add Spreadsheet',
    accept: '.xlsx,.xls,.csv',
    mimeTypes: [
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-excel',
      'text/csv'
    ]
  }
} as const;

export type AttachmentType = keyof typeof attachmentTypes;
