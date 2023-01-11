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

EXPOSE 3010

CMD ["yarn workspace backend start:prod"]