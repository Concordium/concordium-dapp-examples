# syntax=docker/dockerfile:1
ARG build_image="node:18-slim"
FROM ${build_image} AS build
ARG build_image
WORKDIR /build

# Accept build arguments
ARG TOKEN_ID
ARG BACKEND_URL

# Set as environment variables for Vite to use during build
ENV TOKEN_ID=${TOKEN_ID}
ENV BACKEND_URL=${BACKEND_URL}

# Copy package files first for better caching
COPY package.json package-lock.json* ./
RUN npm ci

# Copy TypeScript and build config files
COPY tsconfig.json tsconfig.node.json vite.config.ts ./
COPY constants.ts ./
COPY index.html ./

# Copy source code
COPY src/ ./src/
COPY public/ ./public/

# Build the application (now with environment variables available)
RUN npm run build
LABEL build_image=${build_image}

# Use Node.js to serve static files
FROM node:24-slim AS runtime
WORKDIR /app

# Install serve package globally
RUN npm install -g serve

# Copy built application
COPY --from=build /build/dist ./

EXPOSE 3000
CMD ["serve", "-s", ".", "-l", "3000"]
