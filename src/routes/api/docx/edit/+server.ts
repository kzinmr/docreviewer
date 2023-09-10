import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { tmpdir } from 'os';
import { join } from 'path';
import { promises as fsPromises } from 'fs';
import {readableStreamToArrayBuffer} from '$lib/utils/convert';
import { Document } from 'docxyz';


// Simply write the received binary data to the file
export const POST: RequestHandler = async ({ request }) => {
  const saveTo = join(tmpdir(), 'testFile');
  console.log(saveTo); // TODO: should remove this?
  const content = await readableStreamToArrayBuffer(request.body);

  if (!(content instanceof ArrayBuffer) || new Uint8Array(content).length === 0) {
    throw error(400, 'Invalid request body');
  }
  // logic to replace text
  const document = new Document(content);
  document.paragraphs.forEach((paragraph) => {
    if (paragraph.text.includes('契約')) {
      paragraph.text = paragraph.text.replace('契約', 'agmt');
    }
  });
  document.save(saveTo);

  const res = await fsPromises.readFile(saveTo);

  return new Response(res);
};
