# syntax=docker/dockerfile:1

FROM node:16-slim AS build
WORKDIR /build
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build

FROM httpd:2-alpine
COPY --from=build /build/build /usr/local/apache2/htdocs
