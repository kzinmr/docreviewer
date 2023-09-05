import prisma from '$lib/prisma';
import type { PageServerLoad } from './$types';

export const load = (async () => {
  const response = await prisma.playbook.findMany({
    include: { rules: true },
  });

  return { playbooks: response };
}) satisfies PageServerLoad;