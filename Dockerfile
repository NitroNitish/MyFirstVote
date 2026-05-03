# Stage 1: Build
FROM node:22-slim AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Production
FROM node:22-slim
WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev
COPY --from=builder /app/dist ./dist
COPY prod-server.mjs .

ENV PORT=8080
ENV NODE_ENV=production

EXPOSE 8080

CMD ["node", "prod-server.mjs"]
