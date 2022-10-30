FROM node:17

WORKDIR /app

RUN apt-get update -yq

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

CMD ["yarn", "dev"]