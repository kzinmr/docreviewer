import { PrismaClient } from '@prisma/client';
import playbookData from '../src/lib/data.json' assert { type: 'json' };

const prisma = new PrismaClient();

async function main() {
  console.log(`Start seeding ...`);

  for (const p of playbookData) {
    console.log(p);
    const user = await prisma.user.upsert({
      where: {
        email: p.author.email
      },
      update: {},
      create: {
        name: p.author.name,
        email: p.author.email
      }
    });

    console.log(`Created or updated user with id: ${user.id}`);

    const playbook = await prisma.playbook.create({
      data: {
        name: p.name,
        description: p.description,
        authorId: user.id,
        reviewPoints: {
          create: p.reviewPoints.map((r) => ({
            name: r.name,
            description: r.description,
            level: r.level,
            logic: {
              create: {
                pattern: r.logic.pattern,
                type: r.logic.type
              }
            }
          }))
        },
        knowledges: {
          create: p.knowledges.map((k) => ({
            name: k.name,
            description: k.description,
            type: k.type,
            reference: k.reference,
            document: {
              create: {
                type: k.document.type,
                passages: {
                  create: k.document.passages.map((passage) => ({
                    order: passage.order,
                    lines: {
                      create: passage.lines.map((line) => ({
                        text: line.text,
                        order: line.order
                      }))
                    }
                  }))
                }
              }
            }
          }))
        }
      }
    });

    console.log(`Created playbook with id: ${playbook.id}`);
  }

  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
