FROM node:20-alpine

WORKDIR /app

# Install dependencies first (for better caching)
COPY package*.json ./
RUN npm install

# Copy source files
COPY . .

# Build the application
RUN npm run build

# Environment variables (can be overridden by docker-compose)
ENV PORT=3000
ENV NODE_ENV=production

EXPOSE 3000

# Start the built Nitro server
CMD ["node", ".output/server/index.mjs"]
