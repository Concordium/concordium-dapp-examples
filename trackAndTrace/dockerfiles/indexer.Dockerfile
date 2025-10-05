# This file should be executed from the `root` directory of the repo.

ARG RUST_IMAGE=rust:1.85-bookworm

# Build indexer
FROM ${RUST_IMAGE} AS build
COPY ./trackAndTrace/smart-contract ./smart-contract
COPY ./deps/concordium-rust-sdk /deps/concordium-rust-sdk
COPY ./trackAndTrace/indexer ./
RUN cargo build --release

FROM debian:bookworm

# In order to use TLS when connecting to the node we need certificates.
RUN apt-get update && apt-get install -y ca-certificates

COPY --from=build ./target/release/indexer /indexer

# Run indexer
CMD ["./indexer"]
