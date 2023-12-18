ARG node_base_image=node:16-slim
ARG rust_base_image=rust:1.65

FROM ${node_base_image} AS frontend

WORKDIR /app
COPY ./sponsoredTransactionsAuction/frontend ./

RUN yarn
RUN yarn build

FROM ${rust_base_image} AS backend

WORKDIR /backend/app
COPY ./deps/concordium-rust-sdk /deps/concordium-rust-sdk
COPY ./sponsoredTransactionsAuction/backend ./

RUN cargo build --release

FROM ubuntu:22.04
WORKDIR /build

COPY --from=backend ./backend/app/target/release/sponsored-transaction-backend ./sponsored-transaction-backend
COPY --from=frontend ./app/dist ./public

CMD ./sponsored-transaction-backend --public-folder public