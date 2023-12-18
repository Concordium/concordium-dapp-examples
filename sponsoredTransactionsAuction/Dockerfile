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

ENV PORT $PORT
ENV NODE $NODE
ENV LOG_LEVEL $LOG_LEVEL
ENV CIS2_TOKEN_CONTRACT_INDEX $CIS2_TOKEN_CONTRACT_INDEX
ENV AUCTION_CONTRACT_INDEX $AUCTION_CONTRACT_INDEX

ENV ACCOUNT_KEY_FILE=/KEY_FILE

COPY --from=backend ./backend/app/target/release/sponsored-transaction-backend ./sponsored-transaction-backend
COPY --from=frontend ./app/dist ./public

CMD ./sponsored-transaction-backend --node "${NODE}" --port "${PORT}" --account "${ACCOUNT_KEY_FILE}" --cis2-token-smart-contract-index "${CIS2_TOKEN_CONTRACT_INDEX}" --auction-smart-contract-index "${AUCTION_CONTRACT_INDEX}" --log-level "${LOG_LEVEL}" --public-folder public
