FROM node:lts-slim

MAINTAINER zerro "zerrozhao@gmail.com"

RUN apt-get update -y && rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src/app/

COPY package.json ./
COPY package-lock.json ./
RUN npm i -dd

COPY ./ ./

CMD ["node", "./bin/adarender.js", "startservice", "./cfg/service.yaml"]