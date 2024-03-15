# This file should be executed from the `trackAndTrace` directory.

ARG RUST_IMAGE=rust:1.74

# Build service
FROM ${RUST_IMAGE}
COPY ./sponsored-transaction-service/Cargo.toml ./Cargo.toml
COPY ./sponsored-transaction-service/Cargo.lock ./Cargo.lock
COPY ./sponsored-transaction-service/src ./src
RUN cargo build --release

# Run service
CMD ["cargo", "run", "--release"]
