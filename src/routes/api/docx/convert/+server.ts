import type { RequestHandler } from './$types';
import { generateUUID } from '$/lib/utils/uuid';

const gotenberg_domain = process.env['GOTENBERG_URL'];

// Simply write the received binary data to the file
export const POST: RequestHandler = async ({ request }: { request: Request }) => {
  const form = await request.formData();
  const blob = form.get('file') as Blob;
  const formData = new FormData();
  // gotenberg(libreoffice)の制約で、ファイル名はascii文字列にする必要がある
  const uuid = generateUUID();
  const uuidFileName = `${uuid}.docx`;
  formData.append('file', blob, uuidFileName);

  return await fetch(`${gotenberg_domain}/forms/libreoffice/convert`, {
    method: 'POST',
    body: formData
  });
};
