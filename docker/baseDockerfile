FROM nginx:latest

WORKDIR /app

RUN apt-get update
RUN apt-get install -y curl gnupg gnupg1 gnupg2
RUN curl -sL https://deb.nodesource.com/setup_7.x | bash
RUN apt-get install -y nodejs npm

COPY package.json .
RUN npm install --build-from-source --registry=https://registry.npm.taobao.org \
                --disturl=https://npm.taobao.org/mirrors/node && \
    npm cache clean && rm package.json
