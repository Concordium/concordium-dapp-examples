# syntax=docker/dockerfile:1

ARG build_image="node:18-slim"
FROM ${build_image} AS build
WORKDIR /build
COPY package.json yarn.lock ./

COPY .yarnrc.yml ./
RUN corepack enable

RUN yarn install
COPY . .
RUN yarn build

FROM httpd:2-alpine
COPY --from=build /build/build /usr/local/apache2/htdocs
