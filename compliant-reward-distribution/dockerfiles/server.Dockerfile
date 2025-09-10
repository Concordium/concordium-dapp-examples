# This file should be executed from the `compliant-reward-distribution` directory.

ARG RUST_IMAGE=rust:1.85-bookworm
ARG NODE_IMAGE=node:18-slim

# Build frontend
FROM ${NODE_IMAGE} AS frontend

WORKDIR /frontend
COPY ./compliant-reward-distribution/frontend ./
RUN yarn
RUN yarn build

# Build server
FROM ${RUST_IMAGE} AS server
WORKDIR /server
COPY ../ ./
RUN cargo build --locked -p crd_indexer --release

FROM debian:bookworm

# In order to use TLS when connecting to the node we need certificates.
RUN apt-get update && apt-get install -y ca-certificates

COPY --from=frontend ./frontend/dist ./frontend/dist
COPY --from=server ./server/target/release/crd_server ./server

# Run server
CMD ["./server"]
