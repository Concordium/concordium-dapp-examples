# syntax=docker/dockerfile:1
ARG build_image="node:18-slim"
FROM ${build_image} AS build
ARG build_image
WORKDIR /build

# Copy package files first for better caching
COPY package.json package-lock.json* ./
RUN npm ci

# Copy TypeScript config files
COPY tsconfig.json tsconfig.build.json nest-cli.json ./

# Copy source code
COPY src/ ./src/

# Build the application
RUN npm run build
LABEL build_image=${build_image}

FROM ${build_image} AS runtime
WORKDIR /app

# Copy package files and install production dependencies
COPY package.json package-lock.json* ./
RUN npm ci --only=production && npm cache clean --force

# Copy built application
COPY --from=build /build/dist ./dist

EXPOSE 3001
CMD ["node", "dist/main.js"]
