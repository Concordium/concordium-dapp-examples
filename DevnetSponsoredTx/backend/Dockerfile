# syntax=docker/dockerfile:1
ARG build_image="node:20-alpine"
FROM ${build_image} AS build
ARG build_image

WORKDIR /build

RUN corepack enable

COPY package.json yarn.lock .yarnrc.yml ./
RUN yarn install --immutable

COPY tsconfig.json ./
COPY src/ ./src/

RUN yarn build

LABEL build_image=${build_image}

FROM ${build_image} AS runtime

WORKDIR /app

RUN corepack enable

COPY package.json yarn.lock .yarnrc.yml ./
RUN yarn install --immutable

COPY --from=build /build/dist ./dist

EXPOSE 3002

CMD ["node", "dist/main.js"]
