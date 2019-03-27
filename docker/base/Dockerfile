FROM node:alpine
WORKDIR /app
COPY ./package.json .
COPY ./yarn.lock .
RUN npm install -g yarn && \
    yarn --network-timeout 100000 install

