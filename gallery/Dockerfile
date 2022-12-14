FROM ubuntu:22.04
WORKDIR /build

ENV PORT=8100
ENV NODE=http://172.17.0.1:20000
ENV LOG_LEVEL=info
ENV STATEMENT='[{"type":"AttributeInSet","attributeTag":"countryOfResidence","set":["AT","BE","BG","CY","CZ","DK","EE","FI","FR","DE","GR","HU","IE","IT","LV","LT","LU","MT","NL","PL","PT","RO","SK","SI","ES","SE","HR"]},{"type":"AttributeInRange","attributeTag":"dob","lower":"18000101","upper":"20091212"}]'
ENV NAMES='["I Scream", "Starry Night", "Tranquility", "Quiet", "Storm", "Timeless", "Endless Rain"]'

COPY ./verifier/target/release/gallery-verifier ./main
COPY ./dist ./public
RUN chmod +x ./main

CMD ./main --node "${NODE}" --port "${PORT}" --log-level "${LOG_LEVEL}" --statement "${STATEMENT}" --names "${NAMES}"
