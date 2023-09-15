import type { RequestHandler } from './$types';

const analyze = (paragraphs: string[]): string[][] => {
  // TODO: ヒューリスティクスを使って段落を分割しているが、高精度のモデルに差し替える
  const passages: string[][] = [];
  let currentPassage: string[] = [];
  paragraphs.forEach((p) => {
    if (p.trim() === '') {
      currentPassage.push(p);
      passages.push(currentPassage);
      currentPassage = [];
    } else {
      currentPassage.push(p);
    }
  });
  if (currentPassage.length > 0) {
    passages.push(currentPassage);
  }
  return passages;
};

export const POST: RequestHandler = async ({ request }: { request: Request }) => {
  const { lines }: { lines: string[] } = await request.json();

  const passages = analyze(lines);

  const res = JSON.stringify({ passages: passages });
  return new Response(res);
};
