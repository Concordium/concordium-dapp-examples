ARG node_base_image=node:16-slim
ARG rust_base_image=rust:1.62

FROM ${node_base_image} AS node_build

WORKDIR /app
COPY ./sponsoredTransactions/frontend ./

RUN yarn && yarn cache clean
RUN yarn build

FROM ${rust_base_image} AS rust_build

WORKDIR /backend
COPY ./deps/concordium-rust-sdk /deps/concordium-rust-sdk
COPY ./sponsoredTransactions/backend ./

RUN cargo build --release

FROM ubuntu:22.04
WORKDIR /build

ENV PORT=8080
ENV NODE=http://node.testnet.concordium.com:20000
ENV LOG_LEVEL=info
ENV SMART_CONTRACT_INDEX=4376

ARG ACCOUNT_KEY_FILE
ENV ACCOUNT_KEY_FILE=$ACCOUNT_KEY_FILE

COPY --from=rust_build ./backend/target/release/sponsored-transaction-backend ./main
COPY --from=node_build ./app/dist ./public
COPY ./$ACCOUNT_KEY_FILE ./

RUN chmod +x ./main

CMD ./main --node "${NODE}" --port "${PORT}" --account "./${ACCOUNT_KEY_FILE}" --smart-contract-index "${SMART_CONTRACT_INDEX}" --log-level "${LOG_LEVEL}" --public-folder public
