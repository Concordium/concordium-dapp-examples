# This file should be executed from the `trackAndTrace` directory.
#
# Expects the following environment variables to be set:
# - TRACK_AND_TRACE_CONTRACT_ADDRESS
# - TRACK_AND_TRACE_BACKEND_BASE_URL

ARG RUST_IMAGE=rust:1.74-bookworm
ARG NODE_IMAGE=node:18-slim

# Build frontend
FROM ${NODE_IMAGE} AS frontend
WORKDIR /frontend
COPY ./frontend/package.json ./package.json
COPY ./frontend/tsconfig.json ./tsconfig.json
COPY ./frontend/tsconfig.node.json ./tsconfig.node.json
COPY ./frontend/vite.config.ts ./vite.config.ts
COPY ./frontend/global.d.ts ./global.d.ts
COPY ./frontend/yarn.lock ./yarn.lock
COPY ./frontend/index.html ./index.html
COPY ./frontend/generated ./generated
COPY ./frontend/src ./src
RUN yarn
RUN yarn build

# Build server
FROM ${RUST_IMAGE} AS server
COPY ./smart-contract ./smart-contract
WORKDIR /server
COPY ./indexer/Cargo.toml ./Cargo.toml
COPY ./indexer/Cargo.lock ./Cargo.lock
COPY ./indexer/src ./src
COPY ./indexer/resources ./resources
RUN cargo build --release

FROM debian:bookworm

# In order to use TLS when connecting to the node we need certificates.
RUN apt-get update && apt-get install -y ca-certificates

COPY --from=frontend ./frontend/dist ./frontend/dist
COPY --from=server ./server/target/release/server ./server

# Run server
CMD ["./server"]
