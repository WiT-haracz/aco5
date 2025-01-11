# Build stage
FROM node:18-alpine AS builder
WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

FROM node:18-alpine
WORKDIR /app

# Create non-root user
RUN addgroup -g 1001 nodejs && \
    adduser -S -u 1001 -G nodejs nodeuser

COPY --from=builder --chown=nodeuser:nodejs /app/package*.json ./
COPY --from=builder --chown=nodeuser:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nodeuser:nodejs /app/index.js .

ENV NODE_ENV=production

USER nodeuser

EXPOSE 8080

# Start the application
ENTRYPOINT ["node", "index.js"]