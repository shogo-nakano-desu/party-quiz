FROM node:16.19.0

WORKDIR /app

ENV NODE_ENV=production

COPY . .

RUN yarn workspace backend workspaces focus
RUN yarn workspace backend build

CMD yarn workspace backend start:prod