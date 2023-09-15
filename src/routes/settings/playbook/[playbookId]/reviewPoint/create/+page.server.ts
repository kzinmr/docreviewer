import prisma from '$lib/prisma';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load = (async ({ params }) => {
  return { playbookId: params.playbookId };
}) satisfies PageServerLoad;

export const actions = {
  default: async ({ request, params: { playbookId } }) => {
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

    await prisma.reviewPoint.create({
      data: {
        name,
        description,
        logic: {
          create: {
            pattern,
            type
          }
        },
        playbookId: Number(playbookId)
      }
    });

    throw redirect(303, `/settings?playbookId=${playbookId}`);
  }
} satisfies Actions;
