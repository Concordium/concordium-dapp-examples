FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .
RUN npm run build

FROM node:20-alpine

WORKDIR /app

RUN npm install -g serve

COPY --from=build /app/dist ./dist
COPY build-and-serve.sh ./

RUN chmod +x build-and-serve.sh

EXPOSE 3000

CMD ["./build-and-serve.sh"]
