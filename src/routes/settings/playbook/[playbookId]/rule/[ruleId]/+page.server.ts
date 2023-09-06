import prisma from '$lib/prisma';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load = (async ({ params: { playbookId, ruleId } }) => {
  const rule = await prisma.rule.findUnique({
    where: { id: Number(ruleId) },
    include: { logic: true }
  });

  return { rule, playbookId };
}) satisfies PageServerLoad;

export const actions = {
  updateRule: async ({ request, params: { playbookId, ruleId } }) => {
    const data = await request.formData();
    const name = data.get('name');
    const description = data.get('description');
    const pattern = data.get('pattern');
    const type = data.get('type');
    if (!name || !description || !pattern || !type) {
      return fail(400, { name, description, pattern, type, missing: true });
    }
    if (
      typeof name != 'string' ||
      typeof description != 'string' ||
      typeof pattern != 'string' ||
      typeof type != 'string'
    ) {
      return fail(400, { incorrect: true });
    }

    await prisma.rule.update({
      where: { id: Number(ruleId) },
      data: {
        name: name,
        description: description,
        logic: {
          update: {
            pattern: pattern,
            type: type
          }
        }
      }
    });

    throw redirect(303, `/settings/?playbookId=${playbookId}`);
  },
  deleteRule: async ({ params: { playbookId, ruleId } }) => {
    await prisma.rule.delete({
      where: { id: Number(ruleId) }
    });

    throw redirect(303, `/settings/?playbookId=${playbookId}`);
  }
} satisfies Actions;
