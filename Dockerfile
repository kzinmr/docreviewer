# Build stage
FROM node:18.15-slim as builder

WORKDIR /app

RUN apt-get update -y
RUN apt-get install -y openssl

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci

# Generate Prisma Client
COPY prisma ./prisma
RUN npx prisma generate

# Copy other necessary files and build
COPY tsconfig.json vite.config.ts svelte.config.js tailwind.config.ts postcss.config.js ./
COPY src ./src
COPY static ./static
RUN npm run build

EXPOSE 5174
CMD ["npm", "run", "start:dev"]

# # Production stage
# FROM node:18.15-slim

# WORKDIR /app

# # Copy only necessary files from builder stage
# COPY --from=builder /app/build ./build
# COPY --from=builder /app/package*.json ./
# COPY --from=builder /app/node_modules ./node_modules
# COPY --from=builder /app/prisma ./prisma

# EXPOSE 5174
# CMD ["npm", "run", "start:dev"]
