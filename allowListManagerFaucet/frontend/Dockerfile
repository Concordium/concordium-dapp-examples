# syntax=docker/dockerfile:1
ARG build_image="node:18-slim"
FROM ${build_image} 
ARG build_image

WORKDIR /app

# Install serve package globally
RUN npm install -g serve

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

# Build the application 
RUN npm run build

# Copy the runtime configuration script
COPY build-and-serve.sh ./
RUN chmod +x build-and-serve.sh

EXPOSE 3000

# Use the script to inject runtime variables and serve
CMD ["./build-and-serve.sh"]

LABEL build_image=${build_image}