FROM node:16-alpine

WORKDIR /server

COPY . .

RUN npm install

EXPOSE 3001

CMD ["node", "index.js"]

