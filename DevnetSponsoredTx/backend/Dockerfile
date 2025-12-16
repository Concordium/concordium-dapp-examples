FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .
RUN rm -rf dist && npx tsc --incremental false

EXPOSE 3002

CMD ["npm", "run", "start:prod"]
