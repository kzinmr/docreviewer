import { writable } from 'svelte/store';
import type { PDFDocumentProxy } from 'pdfjs-dist';
import { Dequeue } from '$lib/utils/dequeue';
import type { Operation } from '$/types';

export const paragraphs = writable<Array<string>>([]);
export const previousParagraphs = writable<Array<string>>([]);
export const operationDequeue = writable<Dequeue<Operation>>(new Dequeue<Operation>());
export const operationUndoDequeue = writable<Dequeue<Operation>>(new Dequeue<Operation>());
export const orgDocxContent = writable<ArrayBuffer | null>(null);
export const newDocxContent = writable<ArrayBuffer | null>(null);
export const pdfDoc = writable<PDFDocumentProxy | null>(null);
export const selectedPlaybookId = writable<number | null>(null);
