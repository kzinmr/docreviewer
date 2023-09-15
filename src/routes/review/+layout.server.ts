import prisma from '$lib/prisma';
import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ url }) => {
  const playbookIdStr = url.searchParams.get('playbookId') ?? '';

  if (!isNaN(Number(playbookIdStr))) {
    const selectedPlaybookId = Number(playbookIdStr);
    return {
      playbook: await prisma.playbook.findUnique({
        where: { id: Number(selectedPlaybookId) },
        include: { reviewPoints: { include: { logic: true } } }
      }),
      playbooks: await prisma.playbook.findMany({})
    };
  } else {
    throw error(404, 'PlaybookId Not Found');
  }
}) satisfies LayoutServerLoad;
