import prisma from '$lib/prisma';
import { json } from '@sveltejs/kit';

import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params: { id } }: { params: { id: string } }) => {
  const document = await prisma.document.findUnique({
    where: { id: Number(id) },
    include: { passages: { include: { lines: true } } }
  });

  return json(document);
};

export const DELETE: RequestHandler = async ({ params: { id } }: { params: { id: string } }) => {
  const document = await prisma.document.delete({
    where: { id: Number(id) }
  });

  return json(document);
};
