# This file should be executed from the `trackAndTrace` directory.

ARG RUST_IMAGE=rust:1.74-bookworm
ARG NODE_IMAGE=node:18-slim

# Build frontend
FROM ${NODE_IMAGE} AS frontend
WORKDIR /frontend
COPY ./trackAndTrace/frontend ./
RUN yarn
RUN yarn build

# Build server
FROM ${RUST_IMAGE} AS server
COPY ./trackAndTrace/smart-contract ./smart-contract
WORKDIR /server
COPY ./trackAndTrace/indexer ./
RUN cargo build --release

FROM debian:bookworm

# In order to use TLS when connecting to the node we need certificates.
RUN apt-get update && apt-get install -y ca-certificates

COPY --from=frontend ./frontend/dist ./frontend/dist
COPY --from=server ./server/target/release/server ./server

# Run server
CMD ["./server"]
