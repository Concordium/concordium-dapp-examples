# This file should be executed from the `root` directory of the repo.

ARG RUST_IMAGE=rust:1.85-bookworm

# Build service
FROM ${RUST_IMAGE} AS build
COPY ./trackAndTrace/sponsored-transaction-service ./
COPY ./deps/concordium-rust-sdk /deps/concordium-rust-sdk
RUN cargo build --release

FROM debian:bookworm

# In order to use TLS when connecting to the node we need certificates.
RUN apt-get update && apt-get install -y ca-certificates

COPY --from=build ./target/release/sponsored-transaction-service ./sponsored-transaction-service

# Run service
CMD ["./sponsored-transaction-service"]
