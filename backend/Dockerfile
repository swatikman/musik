FROM node:8.16-alpine

WORKDIR /usr/src/app

COPY ./backend/package.json /usr/src/app

RUN npm install

COPY ./backend/src /usr/src/app/src

EXPOSE 3000

CMD [ "npm", "start"]
