FROM node:19-alpine

ENV NPM_CONFIG_LOGLEVEL error

RUN apk add --update bash

WORKDIR /code

COPY package*.json ./
RUN npm install
