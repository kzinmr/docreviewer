import { writable } from 'svelte/store';

export const paragraphs = writable<Array<string>>([]);