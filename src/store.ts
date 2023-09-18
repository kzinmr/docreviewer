import { writable } from 'svelte/store';
import type { PDFDocumentProxy } from 'pdfjs-dist';
import { Dequeue } from '$lib/utils/dequeue';
import type { Operation, Review } from '$lib/types';

export const paragraphs = writable<Array<string>>([]);
export const previousParagraphs = writable<Array<string>>([]);
export const operationDequeue = writable<Dequeue<Operation>>(new Dequeue<Operation>());
export const operationUndoDequeue = writable<Dequeue<Operation>>(new Dequeue<Operation>());
export const docxBlob = writable<Blob | null>(null);
export const pdfDoc = writable<PDFDocumentProxy | null>(null);
export const selectedPlaybookId = writable<number | null>(null);
export const selectedDocumentId = writable<number | null>(null);
export const reviews = writable<Array<Review>>([]);

export const clearAll = () => {
  paragraphs.set([]);
  previousParagraphs.set([]);
  operationDequeue.set(new Dequeue<Operation>());
  operationUndoDequeue.set(new Dequeue<Operation>());
  docxBlob.set(null);
  pdfDoc.set(null);
  selectedPlaybookId.set(null);
  selectedDocumentId.set(null);
  reviews.set([]);
};
