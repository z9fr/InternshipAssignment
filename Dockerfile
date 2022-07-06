FROM node:16

RUN mkdir /app
WORKDIR /app

COPY . .

RUN yarn install
RUN yarn build

CMD ["yarn", "start"]
