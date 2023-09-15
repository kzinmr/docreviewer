import { error, json } from '@sveltejs/kit';
import prisma from '$lib/prisma';
import type { RequestHandler } from './$types';

interface ReviewResponse {
  status: string;
  level: string;
  reviewPointId: number;
  targetPassageId: number;
}

const doReviews = async (documentId: number, playbookId: number): Promise<ReviewResponse[]> => {
  const document = await prisma.document.findUnique({
    where: { id: documentId },
    include: { passages: { include: { lines: true } } }
  });
  if (document === null) {
    throw error(404, 'Document not found');
  }
  const playbook = await prisma.playbook.findUnique({
    where: { id: playbookId },
    include: { reviewPoints: { include: { logic: true } } }
  });
  if (playbook === null) {
    throw error(404, 'Playbook not found');
  }

  const reviewResults: ReviewResponse[] = [];
  playbook.reviewPoints.forEach((rp) => {
    if (rp.logic !== null) {
      const pattern = rp.logic.pattern;
      switch (rp.logic.type) {
        case 'regex':
          // const regex = new RegExp(pat);
          // reviewResults.push(res);
          break;
        case 'string':
          document.passages.forEach((passage) => {
            const isMatch = passage.lines.some((line) => line.text.includes(pattern));
            if (isMatch) {
              reviewResults.push({
                status: 'todo',
                level: rp.level,
                reviewPointId: rp.id,
                targetPassageId: passage.id
              });
            }
          });
          break;
      }
    }
  });
  return reviewResults;
};

export const POST: RequestHandler = async ({ request }: { request: Request }) => {
  const { playbookId, documentId }: { playbookId: number; documentId: number } =
    await request.json();
  try {
    // const reviewsRes = await fetch('/api/analyze/reviews', {
    //   method: 'POST',
    //   body: JSON.stringify({ playbookId, documentId })
    // });
    // const reviews = await reviewsRes.json();

    const reviews = await doReviews(documentId, playbookId);

    const reviewSession = await prisma.reviewSession.create({
      data: {
        reviews: {
          create: reviews.map((review: ReviewResponse) => ({
            status: review.status,
            level: review.level,
            reviewPointId: review.reviewPointId,
            targetPassageId: review.targetPassageId
          }))
        }
      }
    });
    // 非効率そう
    const reviewSessionFull = await prisma.reviewSession.findUnique({
      where: { id: reviewSession.id },
      include: { reviews: { include: { reviewPoint: true } } }
    });
    if (reviewSessionFull === null) {
      throw error(500, 'Failed to get review session');
    }
    return json(reviewSessionFull);
  } catch (err) {
    throw error(500, 'Failed to create review session');
  }
};
