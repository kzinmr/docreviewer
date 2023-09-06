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
        rules: {
          create: p.rules.map((r) => ({
            name: r.name,
            description: r.description,
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
            source: k.source
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
