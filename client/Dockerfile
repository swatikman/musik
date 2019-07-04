FROM node:lts-alpine

WORKDIR /app

COPY ./client/package*.json /app/

RUN npm install

COPY ./client /app

EXPOSE 8080

CMD [ "npm", "run", "dev"]
