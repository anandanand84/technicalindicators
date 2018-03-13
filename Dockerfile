FROM node:latest
RUN mkdir /src
RUN cd /src
COPY package.json /src
RUN cd /src && npm install
WORKDIR /src