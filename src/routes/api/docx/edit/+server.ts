import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { tmpdir } from 'os';
import { join } from 'path';
import { promises as fsPromises } from 'fs';
import { Document } from 'docxyz';

function applyOperations(content: ArrayBuffer, operations: Array<Operation>, saveTo: string) {
  const document = new Document(content);
  let length = document.paragraphs.length;
  operations.forEach((operation) => {
    length = document.paragraphs.length;
    switch (operation.type) {
      case 'insert': {
        // document.insertLine(position);
        const position = operation.position;
        if (position < length) {
          const target_paragraph = document.paragraphs[position];
          const new_p = target_paragraph.insert_paragraph_before('');
          // TODO: copy style of previeous paragraph
        } else if (position === length) {
          document.add_paragraph('');
        }
        length = document.paragraphs.length;
        break;
      }
      case 'delete': {
        // document.deleteLine(position);
        const position = operation.position;
        const target_element = doc.paragraphs[position]._element;
        target_element.getparent().remove(paragraph);
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
            paragraph.text = newContent;
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
  console.log(saveTo); // TODO: should remove this?

  const form = await request.formData();
  console.log(form);
  const blob = await form.get('file');
  const content = await blob.arrayBuffer();
  const operationsStr = await form.get('operations');
  const operations = await JSON.parse(operationsStr);
  console.log(operations);

  if (!(content instanceof ArrayBuffer) || new Uint8Array(content).length === 0) {
    throw error(400, 'Invalid request body');
  }
  // logic to replace text
  applyOperations(content, operations, saveTo);

  const res = await fsPromises.readFile(saveTo);

  return new Response(res);
};
