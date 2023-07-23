FROM node:20.4.0-slim

WORKDIR /app

COPY . .

RUN yarn

RUN yarn build

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.8.0/wait /wait
RUN chmod +x /wait

EXPOSE 3001

CMD /wait && yarn start

