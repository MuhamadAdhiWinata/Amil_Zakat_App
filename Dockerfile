# Build stage
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Production stage
FROM node:20-alpine

WORKDIR /app

# Install production dependencies (mysql2, drizzle-orm, bcryptjs)
COPY package*.json ./
RUN npm install --omit=dev

# Copy built app
COPY --from=build /app/.output ./.output

# Copy startup files
COPY scripts/startup.mjs ./scripts/startup.mjs
COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# Environment variables
ENV PORT=3000
ENV NODE_ENV=production

EXPOSE 3000

ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["node", ".output/server/index.mjs"]
