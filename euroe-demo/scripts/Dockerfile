ARG build_image="node:20-slim"
FROM ${build_image} AS build
WORKDIR /app
COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn/releases/*.cjs ./.yarn/releases/
RUN corepack yarn install
COPY . .
RUN corepack yarn build

FROM nginx
COPY --from=build ./app/dist ./usr/share/nginx/html
COPY ./image/favicon.svg ./usr/share/nginx/html/favicon.svg
COPY ./image/beer-logo.png ./usr/share/nginx/html/beer-logo.png
COPY ./scripts/nginx.conf /etc/nginx/conf.d/default.conf
