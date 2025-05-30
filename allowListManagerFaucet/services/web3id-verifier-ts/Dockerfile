# syntax=docker/dockerfile:1
ARG build_image="node:18-slim"
FROM ${build_image} AS build
ARG build_image
WORKDIR /build

# Copy package files first for better caching
COPY package.json yarn.lock* ./
COPY .yarnrc.yml ./

# Copy the .yarn directory containing the yarn release
COPY .yarn/ ./.yarn/

# Install dependencies
RUN yarn install --immutable

# Copy TypeScript config files
COPY tsconfig.json tsconfig.node.json ./

# Copy linting and formatting config
COPY .eslintrc.cjs .prettierignore .prettierrc.json ./

# Copy source code
COPY src/ ./src/
COPY README.md ./

# Build the application
RUN yarn build
LABEL build_image=${build_image}

FROM ${build_image} AS runtime
ARG build_image
WORKDIR /app

# Copy package files and yarn configuration
COPY package.json yarn.lock* ./
COPY .yarnrc.yml ./

# Copy the .yarn directory containing the yarn release from build stage
COPY --from=build /build/.yarn ./.yarn

# Install all dependencies (Yarn Berry doesn't have simple production-only install)
RUN yarn install --immutable && yarn cache clean

# Copy source files (since we don't know where build output goes)
COPY --from=build /build/src ./src
COPY --from=build /build/package.json ./
COPY --from=build /build/tsconfig.json ./

EXPOSE 8080

# Use yarn start with endpoint argument
CMD ["yarn", "start", "--endpoint", "devnet-address-and-port"]