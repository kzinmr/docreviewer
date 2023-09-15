import prisma from '$lib/prisma';
import type { LayoutServerLoad } from './$types';

export const load = (async () => {
  return {
    playbooks: await prisma.playbook.findMany({
      include: { reviewPoints: { include: { logic: true } } }
    })
  };
}) satisfies LayoutServerLoad;
