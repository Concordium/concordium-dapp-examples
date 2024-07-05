# This file should be executed from the `trackAndTrace` directory.

ARG RUST_IMAGE=rust:1.74-bookworm

# Build indexer
FROM ${RUST_IMAGE} as build
COPY ./trackAndTrace/smart-contract ./smart-contract
WORKDIR /indexer
COPY ./trackAndTrace/indexer ./
RUN cargo build --release

FROM debian:bookworm

# In order to use TLS when connecting to the node we need certificates.
RUN apt-get update && apt-get install -y ca-certificates

COPY --from=build ./indexer/target/release/indexer /indexer

# Run indexer
CMD ["./indexer"]
