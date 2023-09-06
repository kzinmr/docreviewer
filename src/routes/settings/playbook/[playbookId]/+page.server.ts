import prisma from '$lib/prisma';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load = (async ({ params: { playbookId } }) => {
  const playbook = await prisma.playbook.findUnique({
    where: { id: Number(playbookId) },
    include: { rules: { include: { logic: true } } }
  });

  return { playbook };
}) satisfies PageServerLoad;

export const actions = {
  updatePlaybook: async ({ request, params: { playbookId } }) => {
    const data = await request.formData();
    const name = data.get('name');
    const description = data.get('description');
    if (!name || !description) {
      return fail(400, { name, description, missing: true });
    }
    if (typeof name != 'string' || typeof description != 'string') {
      return fail(400, { incorrect: true });
    }

    await prisma.playbook.update({
      where: { id: Number(playbookId) },
      data: {
        name: name,
        description: description
      }
    });

    throw redirect(303, `/settings/?playbookId=${playbookId}`);
  },
  deletePlaybook: async ({ params: { playbookId } }) => {
    await prisma.playbook.delete({
      where: { id: Number(playbookId) }
    });

    throw redirect(303, '/settings');
  }
} satisfies Actions;
