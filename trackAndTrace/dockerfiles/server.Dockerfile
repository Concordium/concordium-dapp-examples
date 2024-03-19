# This file should be executed from the `trackAndTrace` directory.

ARG RUST_IMAGE=rust:1.74
ARG NODE_IMAGE=node:18-slim

# Build frontend
FROM ${NODE_IMAGE} AS frontend
WORKDIR /frontend
COPY ./frontend/package.json ./package.json
COPY ./frontend/tsconfig.json ./tsconfig.json
COPY ./frontend/tsconfig.node.json ./tsconfig.node.json
COPY ./frontend/vite.config.ts ./vite.config.ts
COPY ./frontend/constants.ts ./constants.ts
COPY ./frontend/yarn.lock ./yarn.lock
COPY ./frontend/index.html ./index.html
COPY ./frontend/generated ./generated
COPY ./frontend/src ./src
RUN yarn
ARG TRACK_AND_TRACE_CONTRACT_INDEX=8219
ARG SPONSORED_TRANSACTION_BACKEND_BASE_URL="http://localhost:8000"
# Forward the build args to `yarn build` via environment variables.
# We do not use the docker `ENV` as those are only used for the final `CMD`.
RUN TRACK_AND_TRACE_CONTRACT_INDEX=${TRACK_AND_TRACE_CONTRACT_INDEX} \
SPONSORED_TRANSACTION_BACKEND_BASE_URL=${SPONSORED_TRANSACTION_BACKEND_BASE_URL} \
yarn build

# Build server
FROM ${RUST_IMAGE} AS server
COPY --from=frontend ./frontend/dist ./frontend/dist
COPY ./smart-contract ./smart-contract
WORKDIR /server
COPY ./indexer/Cargo.toml ./Cargo.toml
COPY ./indexer/Cargo.lock ./Cargo.lock
COPY ./indexer/src ./src
COPY ./indexer/resources ./resources
RUN cargo build --release

# Run server
CMD ["cargo", "run", "--release", "--bin", "server"]
