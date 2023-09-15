import prisma from '$lib/prisma';
import { json } from '@sveltejs/kit';

import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }: { request: Request }) => {
  const { passages }: { passages: string[][] } = await request.json();
  const createdDoc = await prisma.document.create({
    data: {
      type: 'document',
      passages: {
        create: passages.map((passage, index) => ({
          order: index,
          lines: {
            create: passage.map((line, index) => ({
              order: index,
              text: line
            }))
          }
        }))
      }
    }
  });

  return json(createdDoc);
};
