import prisma from '$lib/prisma';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load = (async ({ params: { playbookId, reviewPointId } }) => {
  const reviewPoint = await prisma.reviewPoint.findUnique({
    where: { id: Number(reviewPointId) },
    include: { logic: true }
  });

  return { reviewPoint, playbookId };
}) satisfies PageServerLoad;

export const actions = {
  updateReviewPoint: async ({ request, params: { playbookId, reviewPointId } }) => {
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

    await prisma.reviewPoint.update({
      where: { id: Number(reviewPointId) },
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
  deleteReviewPoint: async ({ params: { playbookId, reviewPointId } }) => {
    await prisma.reviewPoint.delete({
      where: { id: Number(reviewPointId) }
    });

    throw redirect(303, `/settings/?playbookId=${playbookId}`);
  }
} satisfies Actions;
