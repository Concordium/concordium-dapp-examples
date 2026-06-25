# syntax=docker/dockerfile:1
ARG build_image="node:20-alpine"
FROM ${build_image} AS build
ARG build_image

WORKDIR /app

RUN corepack enable

COPY package.json yarn.lock .yarnrc.yml ./
RUN yarn install --immutable

COPY tsconfig.json tsconfig.node.json vite.config.ts ./
COPY index.html ./
COPY src/ ./src/
COPY public/ ./public/

RUN yarn build

FROM ${build_image}
ARG build_image

WORKDIR /app

RUN npm install -g serve

COPY --from=build /app/dist ./dist
COPY build-and-serve.sh ./
RUN chmod +x build-and-serve.sh

EXPOSE 3000

CMD ["./build-and-serve.sh"]

LABEL build_image=${build_image}
