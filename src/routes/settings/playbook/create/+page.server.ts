import prisma from '$lib/prisma';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions = {
  default: async ({ request }) => {
    const data = await request.formData();
    const name = data.get('name');
    const description = data.get('description');

    if (!name || !description) {
      return fail(400, { name, description, missing: true });
    }

    if (typeof name != 'string' || typeof description != 'string') {
      return fail(400, { incorrect: true });
    }

    await prisma.playbook.create({
      data: {
        name,
        description
      }
    });
    // TODO: redirect to the page to add reviewPoints
    throw redirect(303, '/settings');
  }
} satisfies Actions;
