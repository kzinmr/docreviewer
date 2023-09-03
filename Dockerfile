FROM node:18.12.1-slim as builder

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
COPY tsconfig.json ./
COPY vite.config.ts ./
COPY tailwind.config.js ./
COPY postcss.config.js ./
RUN npm ci --omit dev
COPY . .
RUN npm install vite
RUN npm run build

# Production
FROM node:18.12.1-slim

WORKDIR /app

COPY --from=builder /app/build ./build
COPY --from=builder /app/package.json .
COPY --from=builder /app/package.json .
COPY --from=builder /app/node_modules ./node_modules
# RUN mkdir -p /app/node_modules/pdfjs-dist/build/
# COPY --from=builder /app/node_modules/pdfjs-dist/build/pdf.worker.js /app/node_modules/pdfjs-dist/build/
EXPOSE 5173

# CMD ["npm", "run", "dev"]
CMD ["node", "build"]
