ARG base_image=node:18-slim

FROM ${base_image} AS build

WORKDIR /app
COPY ./package.json ./package.json
COPY ./tsconfig.json ./tsconfig.json
COPY ./index.html ./
COPY ./vite.config.ts ./
COPY ./public ./public
COPY ./src ./src

RUN yarn && yarn cache clean
RUN yarn build

FROM nginx
LABEL build_image="${build_image}"
COPY --from=build ./app/dist ./usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
