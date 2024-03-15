# This file should be executed from the `trackAndTrace` directory.

ARG RUST_IMAGE=rust:1.74

# Build indexer
FROM ${RUST_IMAGE}
COPY ./smart-contract ./smart-contract
WORKDIR /indexer
COPY ./indexer/Cargo.toml ./Cargo.toml
COPY ./indexer/Cargo.lock ./Cargo.lock
COPY ./indexer/src ./src
COPY ./indexer/resources ./resources
RUN cargo build --release

# Run indexer
CMD ["cargo", "run", "--release", "--bin", "indexer"]
