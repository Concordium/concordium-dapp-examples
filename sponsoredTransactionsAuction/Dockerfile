ARG node_base_image=node:20-slim
ARG rust_base_image=rust:1.85

FROM ${node_base_image} AS front_end

WORKDIR /app
COPY ./sponsoredTransactionsAuction/frontend ./

RUN yarn
RUN yarn build

FROM ${rust_base_image} AS back_end

WORKDIR /backend/app
COPY ../ ./

RUN cargo build --locked -p sponsored-transaction-auction-backend --release

FROM ubuntu:22.04
WORKDIR /build

COPY --from=back_end ./backend/app/target/release/sponsored-transaction-auction-backend ./sponsored-transaction-auction-backend
COPY --from=front_end ./app/dist ./public
RUN apt-get update && apt-get install -y  ca-certificates

CMD ./sponsored-transaction-auction-backend --frontend public
