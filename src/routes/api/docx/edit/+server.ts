import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { tmpdir } from 'os';
import { join } from 'path';
import { promises as fsPromises } from 'fs';
import { Document } from 'docxyz';
import type { Operation } from '$/lib/types';

function applyOperations(content: ArrayBuffer, operations: Array<Operation>, saveTo: string) {
  const document = new Document(content);
  let length = document.paragraphs.length;
  operations.forEach((operation) => {
    length = document.paragraphs.length;
    switch (operation.type) {
      case 'insert': {
        // document.insertLine(position);
        const position = operation.position;
        if (position === undefined) {
          break;
        }
        if (position < length) {
          const target_paragraph = document.paragraphs[position];
          target_paragraph.insert_paragraph_before('');
        } else if (position === length) {
          document.add_paragraph('');
        }
        length = document.paragraphs.length;
        break;
      }
      case 'delete': {
        // document.deleteLine(position);
        const position = operation.position;
        if (position === undefined) {
          break;
        }
        const target_element = document.paragraphs[position]._element;
        target_element.getparent().remove(target_element);
        length = document.paragraphs.length;
        break;
      }
      case 'modify': {
        // document.modifyLine(position, operation.content!);
        const position = operation.position;
        const newContent = operation.newContent;
        // const oldContent = operation.oldContent;
        document.paragraphs.forEach((paragraph, index) => {
          if (index === position) {
            paragraph.text = newContent ?? '';
          }
        });
        break;
      }
    }
  });
  document.save(saveTo);
}

// Simply write the received binary data to the file
export const POST: RequestHandler = async ({ request }) => {
  const saveTo = join(tmpdir(), 'testFile');

  const form = await request.formData();
  const blob = form.get('file') as Blob | null;
  const content = await blob?.arrayBuffer();
  const operationsStr = form.get('operations') as string;
  const operations = await JSON.parse(operationsStr);

  if (!(content instanceof ArrayBuffer) || new Uint8Array(content).length === 0) {
    throw error(400, 'Invalid request body');
  }
  // logic to replace text
  applyOperations(content, operations, saveTo);

  const res = await fsPromises.readFile(saveTo);

  return new Response(res);
};
