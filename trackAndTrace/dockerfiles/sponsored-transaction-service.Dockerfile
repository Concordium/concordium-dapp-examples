# This file should be executed from the `root` directory of the repo.

ARG RUST_IMAGE=rust:1.85-bookworm

# Build service
FROM ${RUST_IMAGE} as build
WORKDIR /sponsored-transaction-service
COPY . .
RUN cargo build --locked -p sponsored-transaction-service --release

FROM debian:bookworm

# In order to use TLS when connecting to the node we need certificates.
RUN apt-get update && apt-get install -y ca-certificates

COPY --from=build ./sponsored-transaction-service/target/release/sponsored-transaction-service ./sponsored-transaction-service

# Run service
CMD ["./sponsored-transaction-service"]
