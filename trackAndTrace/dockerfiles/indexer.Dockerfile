# This file should be executed from the `root` directory of the repo.

ARG RUST_IMAGE=rust:1.85-bookworm

# Build indexer
FROM ${RUST_IMAGE} as build
WORKDIR /indexer
COPY . .
RUN cargo build --locked -p indexer --release

FROM debian:bookworm

# In order to use TLS when connecting to the node we need certificates.
RUN apt-get update && apt-get install -y ca-certificates

COPY --from=build ./indexer/target/release/indexer /indexer

# Run indexer
CMD ["./indexer"]
