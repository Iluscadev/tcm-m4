FROM node:16.16.0

RUN apt-get update

WORKDIR /app

COPY "package.json" .

RUN yarn

COPY . .

CMD ["yarn", "dev"]