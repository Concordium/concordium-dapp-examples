ARG node_base_image=node:18-slim
ARG rust_base_image=rust:1.73

FROM ${node_base_image} AS front_end

WORKDIR /app
COPY ./sponsoredTransactionsAuction/frontend/package.json ./package.json
COPY ./sponsoredTransactionsAuction/frontend/tsconfig.node.json ./tsconfig.node.json
COPY ./sponsoredTransactionsAuction/frontend/tsconfig.json ./tsconfig.json
COPY ./sponsoredTransactionsAuction/frontend/vite.config.ts ./vite.config.ts
COPY ./sponsoredTransactionsAuction/frontend/src ./src
COPY ./sponsoredTransactionsAuction/frontend/index.html ./index.html
COPY ./sponsoredTransactionsAuction/frontend/generated ./generated

RUN yarn
RUN yarn build

FROM ${rust_base_image} AS back_end

WORKDIR /backend/app
COPY ./deps/concordium-rust-sdk /deps/concordium-rust-sdk
COPY ./sponsoredTransactionsAuction/backend ./

RUN cargo build --release

FROM ubuntu:22.04
WORKDIR /build

COPY --from=back_end ./backend/app/target/release/sponsored-transaction-backend ./sponsored-transaction-backend
COPY --from=front_end ./app/dist ./public
RUN apt-get update && apt-get install -y  ca-certificates

CMD ./sponsored-transaction-backend --frontend public
