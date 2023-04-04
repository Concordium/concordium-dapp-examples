ARG node_base_image=node:16-slim
ARG rust_base_image=rust:1.62

FROM ${node_base_image} AS node_build

WORKDIR /app
COPY ./sponsoredTransactions/front-end/package.json ./package.json
COPY ./sponsoredTransactions/front-end/yarn.lock ./yarn.lock
COPY ./sponsoredTransactions/front-end/tsconfig.json ./tsconfig.json
COPY ./sponsoredTransactions/front-end/esbuild.config.ts ./
COPY ./sponsoredTransactions/front-end/types ./types
COPY ./sponsoredTransactions/front-end/src ./src

RUN yarn && yarn cache clean
RUN yarn build

FROM ${rust_base_image} AS rust_build

WORKDIR /back-end
COPY ./deps/concordium-rust-sdk /deps/concordium-rust-sdk
COPY ./sponsoredTransactions/back-end/src ./src
COPY ./sponsoredTransactions/back-end/Cargo.lock ./Cargo.lock
COPY ./sponsoredTransactions/back-end/Cargo.toml ./Cargo.toml

RUN cargo build --release

FROM ubuntu:22.04
WORKDIR /build

ENV PORT=8080
ENV NODE=http://node.testnet.concordium.com:20000
ENV LOG_LEVEL=info
ENV SMART_CONTRACT_INDEX=4184
ENV ACCOUNT=./3PXwJYYPf6fyVb4GJquxSZU8puxrHfzc4XogdMVot8MUQK53tW.export

COPY --from=rust_build ./back-end/target/release/sponsored-transaction-backend ./main
COPY --from=node_build ./app/dist ./public
COPY ./3PXwJYYPf6fyVb4GJquxSZU8puxrHfzc4XogdMVot8MUQK53tW.export ./
RUN chmod +x ./main

CMD ./main --node "${NODE}" --port "${PORT}" --account "${ACCOUNT}" --smart-contract-index "${SMART_CONTRACT_INDEX}" --log-level "${LOG_LEVEL}" --public-folder public
