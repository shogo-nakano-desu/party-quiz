# ==================================================
# Build Layer
# Build apps/backend
FROM node:16.19.0 as build
WORKDIR /build

RUN mkdir -p /build/apps/backend

# Copy required files for build
COPY package.json ./
COPY tsconfig.json ./
COPY yarn.lock ./
COPY .yarnrc.yml ./
COPY .yarn/plugins ./.yarn/plugins
COPY .yarn/releases ./.yarn/releases
COPY ./apps/backend/package.json ./apps/backend/.

RUN yarn install

COPY ./apps/backend ./apps/backend

ENV NODE_ENV=production
RUN yarn workspace backend prisma generate
RUN yarn workspace backend build

# ==================================================
# Modules install Layer
# Install required modules for running NestJS
FROM node:16.19.0 AS modules
WORKDIR /modules

RUN mkdir -p /modules/apps/backend

# Copy required files for running
COPY package.json ./
COPY yarn.lock ./
COPY .yarnrc.yml ./
COPY .yarn/plugins ./.yarn/plugins
COPY .yarn/releases ./.yarn/releases
COPY ./apps/backend/package.json ./apps/backend/.

# https://yarnpkg.com/cli/workspaces/focus#details
# Only install regular dependencies by omitting dev dependencies
RUN yarn workspaces focus backend --production

# ==================================================
# Production Run Layer
# NestJSを実行する
FROM node:16.19.0
ENV NODE_ENV=production
ENV PORT=3010
WORKDIR /app

RUN apt-get update \
    && apt-get install -y wget gnupg vim \
    && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update

# Copy runtime modules
COPY --from=modules modules/apps/backend/node_modules ./node_modules
COPY --from=build /build/apps/backend/node_modules/@prisma ./node_modules/@prisma
COPY --from=build /build/apps/backend/node_modules/.prisma ./node_modules/.prisma

# Copy build artifact
COPY --from=build /build/apps/backend/dist ./dist

EXPOSE 3010

CMD ["yarn", "start:prod"]