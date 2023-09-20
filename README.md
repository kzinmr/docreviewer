# doc-reviewer

Document reviewer project with .docx file:

- File import & export
- Simple content edit & save
- Viewer as PDF

NOTE: PDF Uploader is provided to allow debugging without Docker.

## Developing

Start a development server:

```bash
npm run dev
```

With DB and PDF converter:

```bash
docker-compose up
```

NOTE: Comment-out `adapter-node` in `svelte.config.ts`

NOTE: You need to access via `http://localhost:5174` not `https`. This is because [environment variable of adapter-node](https://kit.svelte.dev/docs/adapter-node#environment-variables-origin-protocolheader-and-hostheader) enables cross-origin request. See `package.json`.

## Building

To create a production version of your app:

```bash
npm run build
```

TODO: Prepare or switch Dockerfile for production.

## Prisma

Setup

- Init: `npx prisma init --datasource-provider postgresql`
  - => `prisma/schema.prisma`
- Edit: `package.json` & `tsconfig.json`
- Create DB: `createdb {dbname}`
- Add to `.env`: `DATABASE_URL=postgresql://{username}:{passwd}@localhost:5432/{dbname}?schema=public`
- Generate Client: `npx prisma generate`
- Initial Migration: `npx prisma migrate dev --name init`
- Create Initial Data: `prisma/seed.ts` & `lib/data.json`

Routine

- Seed: `npx prisma db seed`
- Reset DB: `npx prisma migrate reset --force`
- Migration: `npx prisma migrate dev --name some_name`
- Studio: `npx prisma studio`
