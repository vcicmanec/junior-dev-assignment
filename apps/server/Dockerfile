FROM node:22-alpine AS base
ARG APP=server

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN apk update
RUN apk add --no-cache libc6-compat

RUN corepack enable
RUN pnpm add turbo --global


FROM base AS pruner
ENV NODE_ENV=production
WORKDIR /app
COPY . .
RUN turbo prune --scope=${APP}

FROM base AS installer
WORKDIR /app

COPY --from=pruner /app/out/ .
COPY turbo.json turbo.json

RUN pnpm i

FROM installer AS builder
WORKDIR /app
RUN turbo build

FROM builder AS runner
WORKDIR /app/apps/server
COPY .env.docker .env
CMD ["node", "dist/src/main.js"]
