FROM node:18-alpine

ENV NPM_CONFIG_LOGLEVEL error

RUN apk add --update bash

WORKDIR /code

COPY package*.json ./
RUN npm install
