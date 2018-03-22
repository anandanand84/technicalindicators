FROM node:latest
RUN mkdir /src
RUN cd /src
COPY package.json /src
WORKDIR /src
RUN npm install -g typescript@2.7.2
RUN cd /src && npm install
COPY . /src
CMD ["sh", "./develop.sh"]