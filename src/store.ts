import { writable } from 'svelte/store';
import type { PDFDocumentProxy } from 'pdfjs-dist';

export const paragraphs = writable<Array<string>>([]);
export const pdfDoc = writable<PDFDocumentProxy | null>(null);
export const selectedPlaybookId = writable<number | null>(null);
