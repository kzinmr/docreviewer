# doc-reviewer

Document reviewer project with .docx file:

- File import & export
- Simple content edit & save
- Viewer as PDF

NOTE: PDF Uploader is provided to allow debugging without Docker.

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npm create svelte@latest

# create a new project in my-app
npm create svelte@latest my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

## Prisma

Setup

- Init: `npx prisma init --datasource-provider postgresql`
  - => `prisma/schema.prisma`
- Edit: `package.json` & `tsconfig.json`
- Create DB: `createdb {dbname}`
- Add to `.env`: `DATABASE_URL=postgresql://{username}:{passwd}@localhost:5432/{dbname}?schema=public`
- Create Initial Data: `prisma/seed.ts` & `lib/data.json`

Routine
- Seed: `npx prisma db seed`
- Reset DB: `prisma db push --force-reset`
- Migration: `npx prisma migrate dev --name init`
  - => `prisma/migrations`
- Studio: `npx prisma studio`
