ARG build_image="node:20-slim"
FROM ${build_image} AS build
WORKDIR /app
COPY package.json yarn.lock .yarnrc.yml ./
RUN corepack enable

RUN yarn install --immutable
COPY . .
RUN yarn build

FROM nginx
COPY --from=build ./app/dist ./usr/share/nginx/html
COPY ./image/favicon.svg ./usr/share/nginx/html/favicon.svg
COPY ./image/beer-logo.png ./usr/share/nginx/html/beer-logo.png
COPY ./scripts/nginx.conf /etc/nginx/conf.d/default.conf
