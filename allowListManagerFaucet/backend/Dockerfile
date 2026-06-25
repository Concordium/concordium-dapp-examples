# syntax=docker/dockerfile:1
ARG build_image="node:18-slim"
FROM ${build_image} AS build
ARG build_image
WORKDIR /build

RUN corepack enable

# Copy package files first for better caching
COPY package.json yarn.lock .yarnrc.yml ./
RUN yarn install --immutable

# Copy TypeScript config files
COPY tsconfig.json tsconfig.build.json nest-cli.json ./

# Copy source code
COPY src/ ./src/

# Build the application
RUN yarn build
LABEL build_image=${build_image}

FROM ${build_image} AS runtime
WORKDIR /app

RUN corepack enable

# Copy package files and install dependencies
COPY package.json yarn.lock .yarnrc.yml ./
RUN yarn install --immutable

# Copy built application
COPY --from=build /build/dist ./dist

EXPOSE 3001
CMD ["node", "dist/main.js"]
