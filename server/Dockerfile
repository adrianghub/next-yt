FROM node:16.15.0-buster-slim

WORKDIR /app

RUN apt-get update -yq && apt-get install netcat -yq

COPY package.json yarn.lock ./

RUN yarn install

COPY . .
COPY ./scripts/wait-for-db.sh /wait-for-db.sh

RUN chmod +x /wait-for-db.sh


ENTRYPOINT ["/wait-for-db.sh"]
CMD ["yarn", "dev"]